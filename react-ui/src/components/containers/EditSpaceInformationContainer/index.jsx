// @flow

import React, { Component, Fragment } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import Path from 'config/path';

import { uiActions } from 'redux/modules/ui';
import { spaceActions } from 'redux/modules/space';

import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import Header from 'components/containers/Header';
import EditSpaceInformation from 'components/LV3/EditSpace/Information';

import { ErrorMessages } from 'variables';

import { uploadImage } from 'redux/helpers/firebase';
import fileType from 'helpers/file-type';
import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';
import { iskeyDownEnter } from 'helpers/keydown';

type PropTypes = {
  dispatch: Function,
  history: {
    push: Function,
  },
  space: {
    ID: number,
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

class EditSpaceInformationContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    const { dispatch, space } = this.props;

    const spaceId = props.match.params.space_id;

    this.state = {
      Images: space.Images || [],
      Title: space.Title || '',
      Type: space.Type || 3,
      Introduction: space.Introduction || '',
      Address: space.Address || '',
      error: {},
      isImageUploading: false,
      errorModal: false,
      isNoProfile: false,
      isUpdate: false,
    };

    if (spaceId) {
      dispatch(spaceActions.prepareUpdateSpace(spaceId));
      this.state.isUpdate = true;
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

    if (user.Name === '') {
      this.setState({ errorModal: true, isNoProfile: true });
    } else if (!isUpdate) {
      const { Title, Introduction, Address, Images } = this.state;
      this.handleChangeUI('Title', Title);
      this.handleChangeUI('Introduction', Introduction);
      this.handleChangeUI('Address', Address);
      this.handleChangeUI('Images', Images);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { space } = nextProps;
    if (space.ID && !prevState.ID) {
      const { Title, Type, Introduction, Address, Images, ID } = space;
      return { Title, Type, Introduction, Address, Images, ID };
    }
    return null;
  }

  onClickEditProfile = () => {
    const { history, dispatch, location } = this.props;
    dispatch(uiActions.setUiState({ redirectPath: location.pathname }));
    history.push(Path.editProfile());
  };

  onKeyDownButtonNext: Function;

  onKeyDownButtonNext = e => {
    if (iskeyDownEnter(e) && this.validate()) {
      this.onClickNext();
    }
  };

  onClickRemove: Function;

  onClickRemove = space => {
    const { dispatch } = this.props;
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
    dispatch(spaceActions.deleteSpace({ space }));
  };

  handleChangeImage: Function;

  handleChangeImage = async (pickedImages: Array<File>) => {
    this.setState({ isImageUploading: true });

    const { Images: ImagesTmp } = this.state;
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
    this.setState({ Images: setImage, isImageUploading: false });
    this.handleChangeUI('Images', setImage);
  };

  handleDeleteImage: Function;

  handleDeleteImage = (deleteTargetIndex: number) => {
    const { Images } = this.state;
    const nextImages = Object.assign([], Images);
    nextImages.splice(deleteTargetIndex, 1);
    this.setState({ Images: nextImages });
    this.handleChangeUI('Images', nextImages);
  };

  onClickNext: Function;

  onClickNext = () => {
    const { state } = this;
    const { dispatch, history, space } = this.props;
    const { Images, Title, Type, Introduction, Address } = state;

    dispatch(
      uiActions.setUiState({
        space: Object.assign(space, {
          Images,
          Title,
          Type: parseInt(Type, 10),
          Introduction,
          Address,
        }),
      }),
    );

    const nextPath = space.ID ? Path.editSpaceBaggage(space.ID) : Path.createSpaceBaggage();
    history.push(nextPath);
  };

  close = () => this.setState({ errorModal: false });

  handleChangeUI: Function;

  handleChangeUI = (propName: string, value: any) => {
    const { state } = this;
    const { error } = state;
    const errors = [];

    switch (propName) {
      case 'Title':
        if (value === undefined ? true : value.trim().length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        } else if (value.length > Validate.Title.Max) {
          errors.push(ErrorMessages.LengthMax('タイトル', Validate.Title.Max));
        }
        break;
      case 'Introduction':
        if (value === undefined ? true : value.trim().length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        } else if (value.length > Validate.Introduction.Max) {
          errors.push(ErrorMessages.LengthMax('紹介文', Validate.Introduction.Max));
        }
        break;
      case 'Address':
        if (value === undefined ? true : value.trim().length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        } else {
          const match = value.match(Validate.Address);
          if (!match || (match && match[4] === '')) {
            errors.push(ErrorMessages.InvalidAddress);
          }
        }
        break;
      case 'Images':
        if (value === undefined ? true : value.length === 0) {
          errors.push(ErrorMessages.MustSpaceImage);
        } else if (value.length === 1) {
          if (value[0].ImageUrl && value[0].ImageUrl.includes('data:image/png;base64,')) {
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

  validate: Function;

  validate = () => {
    const { Title, Introduction, Address, Images } = this.state;
    const AddressMatch = Address.match(Validate.Address);

    return (
      Title &&
      (Title === undefined ? false : Title.trim().length > 0) &&
      Title.trim().length <= Validate.Title.Max &&
      Introduction &&
      (Introduction === undefined ? false : Introduction.trim().length > 0) &&
      Introduction.trim().length <= Validate.Introduction.Max &&
      Address &&
      (Address === undefined ? false : Address.trim().length > 0) &&
      (AddressMatch ? AddressMatch[4] !== '' : false) &&
      Images &&
      Images.length > 0 &&
      !(Images[0].ImageUrl && Images[0].ImageUrl.includes('data:image/png;base64,'))
    );
  };

  render() {
    const { space } = this.props;
    const {
      Images,
      Title,
      Type,
      Introduction,
      Address,
      error,
      isImageUploading,
      errorModal,
      isNoProfile,
    } = this.state;

    return (
      <MenuPageTemplate
        header={<Header />}
        headline={`スペースの${space.ID ? '編集' : '登録'}`}
        leftContent={
          <Fragment>
            <EditSpaceInformation
              edit={space.ID}
              images={Images.map(image => ({
                url: image.ImageUrl || image.preview,
              }))}
              onChangeImage={this.handleChangeImage}
              imageErrors={error.Images}
              isImageUploading={isImageUploading}
              onClickDeleteImage={this.handleDeleteImage}
              title={Title}
              titleErrors={error.Title}
              onChangeTitle={v => this.handleChangeUI('Title', v)}
              type={Type}
              typeErrors={error.type}
              onChangeType={v => this.handleChangeUI('Type', v)}
              introduction={Introduction}
              introductionErrors={error.Introduction}
              onChangeIntroduction={v => this.handleChangeUI('Introduction', v)}
              address={Address}
              addressErrors={error.Address}
              onChangeAddress={v => this.handleChangeUI('Address', v)}
              onClickNext={this.onClickNext}
              buttonNextDisabled={isNoProfile || !this.validate()}
              OnClickRemove={() => this.onClickRemove(space)}
              onKeyDownButtonNext={this.onKeyDownButtonNext}
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
                <Button className="brandPrimary" onClick={this.onClickEditProfile}>
                  登録画面へ進む
                </Button>
              </Modal.Actions>
            </Modal>
          </Fragment>
        }
        rightContent={<ServiceMenu />}
      />
    );
  }
}

const mapStateToProps = state => ({
  space: state.ui.space || {},
  user: state.auth.user,
});

export default authRequired(connect(mapStateToProps)(EditSpaceInformationContainer));
