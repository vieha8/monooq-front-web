// @flow

import React, { Component, Fragment } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import Path from 'config/path';

import { uiActions } from 'redux/modules/ui';
import { spaceActions } from 'redux/modules/space';

import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import Header from 'components/containers/Header';
import SpaceEditInformation from 'components/LV3/SpaceEdit/Information';

import { ErrorMessages, FormValues } from 'variables';

import { uploadImage } from 'redux/helpers/firebase';
import { iskeyDownEnter } from 'helpers/keydown';
import { isImageDefault } from 'helpers/images';
import fileType from 'helpers/file-type';
import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';

type PropTypes = {
  dispatch: Function,
  history: {
    push: Function,
  },
  space: {
    id: number,
  },
};

const Validate = {
  Address: `(...??[都道府県])((?:旭川|伊達|石狩|盛岡|奥州|田村|南相馬|那須塩原|東村山|武蔵村山|羽村|十日町|上越|富山|野々市|大町|蒲郡|四日市|姫路|大和郡山|廿日市|下松|岩国|田川|大村)市|.+?郡(?:玉村|大町|.+?)[町村]|.+?市.+?区|.+?[市区町村郡])(\\D+)(.*)`,
  Title: {
    Max: 40,
  },
  Introduction: {
    Max: 5000,
  },
};

class SpaceEditInformationContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    const { dispatch, space } = this.props;

    const spaceId = props.match.params.space_id;

    this.state = {
      images: space.images || [],
      title: space.title || '',
      type: space.type || `${FormValues.typeSpaceRoom}`,
      introduction: space.introduction || '',
      address: space.address || '',
      error: {},
      isImageUploading: false,
      errorModal: false,
      isNoProfile: false,
      isUpdate: false,
    };

    if (spaceId) {
      dispatch(spaceActions.prepareUpdateSpace(spaceId));
      this.state.isUpdate = true;

      if (space.images && space.images.length === 1 && isImageDefault(space.images[0].imageUrl)) {
        this.state.images = [];
      }
    } else {
      dispatch(spaceActions.clearSpace());
    }
  }

  handleBeforeUnload = e => {
    e.preventDefault();
    e.returnValue = 'データが保存されませんが、よろしいですか?';
  };

  componentDidMount() {
    window.addEventListener('beforeunload', this.handleBeforeUnload);

    const { user } = this.props;
    const { isUpdate } = this.state;

    if (user.name === '') {
      this.setState({ errorModal: true, isNoProfile: true });
    } else if (!isUpdate) {
      const { title, introduction, address, images } = this.state;
      this.handleChangeUI('title', title);
      this.handleChangeUI('introduction', introduction);
      this.handleChangeUI('address', address);
      this.handleChangeUI('images', images);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { space } = nextProps;
    if (space.id && !prevState.id) {
      const { title, type, introduction, address, images, id } = space;
      return { title, type, introduction, address, images, id };
    }
    return null;
  }

  onClickProfileEdit = () => {
    const { history, dispatch, location } = this.props;
    dispatch(uiActions.setUiState({ redirectPath: location.pathname }));
    history.push(Path.profileEdit());
  };

  onKeyDownButtonNext = e => {
    if (iskeyDownEnter(e) && this.validate()) {
      this.onClickNext();
    }
  };

  onClickRemove = space => {
    const { dispatch } = this.props;
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
    dispatch(spaceActions.deleteSpace({ space }));
  };

  handleChangeImage = async (pickedImages: Array<File>) => {
    this.setState({ isImageUploading: true });

    const { images: ImagesTmp } = this.state;
    const images = ImagesTmp || [];

    const nextImages = await Promise.all(
      pickedImages.map(async image => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(image);
        const ext = await new Promise(resolve => {
          fileReader.onload = () => {
            const imageType = fileType(fileReader.result);
            resolve(imageType.ext);
          };
        });
        const timeStamp = Date.now();
        const rand = Math.random()
          .toString(32)
          .substring(2);
        const imagePath = `/img/spaces/tmp/${rand}${timeStamp}.${ext}`;
        image.tmpUrl = await uploadImage(imagePath, image);
        return image;
      }),
    ).catch(error => ({ error }));

    const setImage = [].concat(images, nextImages);
    this.setState({ images: setImage, isImageUploading: false });
    this.handleChangeUI('images', setImage);
  };

  handleDeleteImage = (deleteTargetIndex: number) => {
    const { images } = this.state;
    const nextImages = Object.assign([], images);
    nextImages.splice(deleteTargetIndex, 1);
    this.setState({ images: nextImages });
    this.handleChangeUI('images', nextImages);
  };

  onClickNext = () => {
    const { state } = this;
    const { dispatch, history, space } = this.props;
    const { images, title, type, introduction, address, isUpdate } = state;

    if (isUpdate) {
      if (images && images.length > 0 && isImageDefault(images[0].ImageUrl)) {
        // デフォルト画像が先頭に含まれる場合は削除する
        images.shift();
      }
    }

    dispatch(
      uiActions.setUiState({
        space: Object.assign(space, {
          images,
          title,
          type: parseInt(type, 10),
          introduction,
          address,
        }),
      }),
    );

    const nextPath = isUpdate ? Path.spaceEditBaggage(space.id) : Path.createSpaceBaggage();
    history.push(nextPath);
  };

  close = () => this.setState({ errorModal: false });

  handleChangeUI = (propName: string, value: any) => {
    const { state } = this;
    const { error } = state;
    const errors = [];

    switch (propName) {
      case 'title':
        if (!value || value.trim().length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        } else if (value.length > Validate.Title.Max) {
          errors.push(ErrorMessages.LengthMax('タイトル', Validate.Title.Max));
        }
        break;
      case 'introduction':
        if (!value || value.trim().length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        } else if (value.length > Validate.Introduction.Max) {
          errors.push(ErrorMessages.LengthMax('紹介文', Validate.Introduction.Max));
        }
        break;
      case 'address':
        if (!value || value.trim().length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        } else {
          const match = value ? value.match(Validate.Address) : '';
          if (!match || (match && match[4] === '')) {
            errors.push(ErrorMessages.InvalidAddress);
          }
        }
        break;
      case 'images':
        if (!value || value.length === 0) {
          errors.push(ErrorMessages.MustSpaceImage);
        } else if (value.length === 1) {
          if (value[0].ImageUrl && isImageDefault(value[0].ImageUrl)) {
            errors.push(ErrorMessages.MustSpaceImage);
          }
        }
        break;
      default:
        break;
    }

    state[propName] = value;
    error[propName] = errors;
    this.setState({ ...state, error });
  };

  validate = () => {
    const { title, introduction, address, images } = this.state;
    const AddressMatch = address ? address.match(Validate.Address) : '';

    return (
      title &&
      (title === undefined ? false : title.trim().length > 0) &&
      title.trim().length <= Validate.Title.Max &&
      introduction &&
      (introduction === undefined ? false : introduction.trim().length > 0) &&
      introduction.trim().length <= Validate.Introduction.Max &&
      address &&
      (address === undefined ? false : address.trim().length > 0) &&
      (AddressMatch ? AddressMatch[4] !== '' : false) &&
      images &&
      images.length > 0 &&
      (isImageDefault(images[0].ImageUrl) ? images.length > 1 : true)
    );
  };

  leftContent = space => {
    const {
      images,
      title,
      type,
      introduction,
      address,
      error,
      isImageUploading,
      errorModal,
      isNoProfile,
      isUpdate,
    } = this.state;

    let ImagesRender = images;
    if (isUpdate) {
      if (images && images.length === 1 && isImageDefault(images[0].ImageUrl)) {
        ImagesRender = [];
      }
    }

    return (
      <Fragment>
        <SpaceEditInformation
          edit={isUpdate}
          errors={error}
          address={address}
          onChangeAddress={v => this.handleChangeUI('address', v)}
          type={type}
          onChangeType={v => this.handleChangeUI('type', v)}
          title={title}
          onChangeTitle={v => this.handleChangeUI('title', v)}
          images={ImagesRender.map(image => ({
            url: image.imageUrl || image.preview,
          }))}
          onChangeImage={this.handleChangeImage}
          onClickDeleteImage={this.handleDeleteImage}
          isImageUploading={isImageUploading}
          introduction={introduction}
          onChangeIntroduction={v => this.handleChangeUI('introduction', v)}
          OnClickRemove={() => this.onClickRemove(space)}
          onClickNext={this.onClickNext}
          onKeyDownButtonNext={this.onKeyDownButtonNext}
          buttonNextDisabled={isNoProfile || !this.validate()}
        />
        <Modal size="large" open={errorModal} onClose={this.close}>
          <Modal.Header>プロフィールをご登録ください</Modal.Header>
          <Modal.Content>
            <p>
              スペースを登録するにはプロフィールの登録が必要です。
              <br />
              <br />
              プロフィールをご登録いただくことで、取引時に荷物保管に関する保険が適用されます。
              <br />
              また、プロフィールの内容を充実させることで借り手に安心感を与えることができるため、成約率UPにも繋がります。
              <br />
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button className="brandPrimary" onClick={this.onClickProfileEdit}>
              登録画面へ進む
            </Button>
          </Modal.Actions>
        </Modal>
      </Fragment>
    );
  };

  render() {
    const { space } = this.props;
    const { isUpdate } = this.state;
    return (
      <MenuPageTemplate
        header={<Header />}
        headline={`スペースの${isUpdate ? '編集' : '登録'}`}
        leftContent={this.leftContent(space)}
        rightContent={<ServiceMenu />}
      />
    );
  }
}

const mapStateToProps = state => ({
  space: state.ui.space || {},
  user: state.auth.user,
});

export default authRequired(connect(mapStateToProps)(SpaceEditInformationContainer));
