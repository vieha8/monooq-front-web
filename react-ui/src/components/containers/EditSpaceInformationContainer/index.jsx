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

import ErrorMessage from 'strings';

import { uploadImage } from 'redux/helpers/firebase';
import fileType from 'helpers/file-type';
import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';

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
};

class EditSpaceInformationContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    const { dispatch, space } = this.props;

    const spaceId = props.match.params.space_id;
    if (spaceId) {
      dispatch(spaceActions.prepareUpdateSpace(spaceId));
    } else {
      dispatch(spaceActions.clearSpace());
    }

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
    };
  }

  handleBeforeUnload(e) {
    e.preventDefault();
    e.returnValue = 'データが保存されませんが、よろしいですか?';
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    window.addEventListener('beforeunload', this.handleBeforeUnload);
    const { user } = this.props;
    if (user.Name === '') {
      this.setState({ errorModal: true, isNoProfile: true });
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

  close = () => this.setState({ errorModal: false });

  onClickEditProfile = () => {
    const { history, dispatch, location } = this.props;
    dispatch(uiActions.setUiState({ redirectPath: location.pathname }));
    history.push(Path.editProfile());
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

    const images = this.state.Images || [];

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

    this.setState({ Images: [].concat(images, nextImages), isImageUploading: false });
  };

  handleDeleteImage: Function;
  handleDeleteImage = (deleteTargetIndex: number) => {
    const nextImages = Object.assign([], this.state.Images);
    nextImages.splice(deleteTargetIndex, 1);
    this.setState({ Images: nextImages });
  };

  onClickNext: Function;
  onClickNext = () => {
    const { validate, state } = this;
    const { error } = state;
    validate(() => {
      if (
        (error.title || []).length === 0 &&
        (error.type || []).length === 0 &&
        (error.introduction || []).length === 0 &&
        (error.address || []).length === 0 &&
        (error.image || []).length === 0
      ) {
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
      }
    });
  };

  handleChangeUI: Function;
  handleChangeUI = (propName: string, value: any) => {
    const state = this.state;
    const error = state.error;
    const errors = [];

    state[propName] = value;
    error[propName] = errors;
    this.setState({ ...state, error });
  };

  validate: Function;
  validate = (valid: Function) => {
    const { Title, Type, Introduction, Address, Images, error } = this.state;

    const titleErrors = [];
    if (Title.length === 0) {
      titleErrors.push(ErrorMessage.PleaseInput);
    }
    error.title = titleErrors;

    const typeErrors = [];
    if (`${Type}` === '0') {
      typeErrors.push(ErrorMessage.PleaseSelect);
    }
    error.type = typeErrors;

    const introductionErrors = [];
    if (Introduction.length === 0) {
      introductionErrors.push(ErrorMessage.PleaseInput);
    }
    if (Introduction.length > 5000) {
      introductionErrors.push(ErrorMessage.LengthMax('紹介文', 5000));
    }
    error.introduction = introductionErrors;

    const addressErrors = [];
    if (Address.length === 0) {
      addressErrors.push(ErrorMessage.PleaseInput);
    }

    const match = Address.match(Validate.Address);
    if (!match || (match && match[4] === '')) {
      addressErrors.push(ErrorMessage.InvalidAddress);
    }
    error.address = addressErrors;

    const imageErrors = [];
    if (Images.length === 0) {
      imageErrors.push(ErrorMessage.MustSpaceImage);
    } else if (Images.length === 1) {
      if (Images[0].ImageUrl && Images[0].ImageUrl.includes('data:image/png;base64,')) {
        imageErrors.push(ErrorMessage.MustSpaceImage);
      }
    }

    error.image = imageErrors;

    this.setState({ error }, valid);
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
              imageErrors={error.image}
              isImageUploading={isImageUploading}
              onClickDeleteImage={this.handleDeleteImage}
              title={Title}
              titleErrors={error.title}
              onChangeTitle={v => this.handleChangeUI('Title', v)}
              type={Type}
              typeErrors={error.type}
              onChangeType={v => this.handleChangeUI('Type', v)}
              introduction={Introduction}
              introductionErrors={error.introduction}
              onChangeIntroduction={v => this.handleChangeUI('Introduction', v)}
              address={Address}
              addressErrors={error.address}
              onChangeAddress={v => this.handleChangeUI('Address', v)}
              onClickNext={this.onClickNext}
              onClickNextDsabled={isNoProfile}
              OnClickRemove={() => this.onClickRemove(space)}
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
                <Button color="red" small={1} onClick={this.onClickEditProfile}>
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
