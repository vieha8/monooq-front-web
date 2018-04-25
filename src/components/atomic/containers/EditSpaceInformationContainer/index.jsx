// @flow

import React, { Component } from 'react';
import Path from 'config/path';

import { uiActions } from 'redux/modules/ui';

import EditSpaceTemplate from 'components/atomic/templates/EditSpaceTemplate';
import Header from 'components/atomic/containers/Header';
import EditSpaceInformation from 'components/atomic/LV3/EditSpace/Information';
import EditStatus from 'components/atomic/LV3/EditSpace/Status';

import { ErrorMessage } from 'strings';

import { checkLogin, checkAuthState, mergeAuthProps } from '../AuthRequired';
import connect from '../connect';

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
  Address: `(...??[都道府県])((?:旭川|伊達|石狩|盛岡|奥州|田村|南相馬|那須塩原|東村山|武蔵村山|羽村|十日町|上越|富山|野々市|大町|蒲郡|四日市|姫路|大和郡山|廿日市|下松|岩国|田川|大村)市|.+?郡(?:玉村|大町|.+?)[町村]|.+?市.+?区|.+?[市区町村])(\\D+)(.*)`,
};

class EditSpaceInformationContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    checkLogin(this.props);

    const { space } = this.props;

    this.state = {
      images: space.images || [],
      title: space.title || '',
      type: space.type || 0,
      introduction: space.introduction || '',
      address: space.address || '',
      error: {},
    };
  }

  handleChangeImage: Function;
  handleChangeImage = (pickedImages: Array<File>) => {
    const images = this.state.images || [];
    const nextImages = [].concat(images, pickedImages);
    this.setState({ images: nextImages });
  };

  handleDeleteImage: Function;
  handleDeleteImage = (deleteTargetIndex: number) => {
    const nextImages = Object.assign([], this.state.images);
    nextImages.splice(deleteTargetIndex, 1);
    this.setState({ images: nextImages });
  };

  onClickNext: Function;
  onClickNext = () => {
    this.validate(() => {
      if (
        (this.state.error.title || []).length === 0 &&
        (this.state.error.type || []).length === 0 &&
        (this.state.error.introduction || []).length === 0 &&
        (this.state.error.address || []).length === 0
      ) {
        const { dispatch, history, space } = this.props;
        const { images, title, type, introduction, address } = this.state;

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
    const { title, type, introduction, address, error } = this.state;

    const titleErrors = [];
    if (title.length === 0) {
      titleErrors.push(ErrorMessage.PleaseInput);
    }
    error.title = titleErrors;

    const typeErrors = [];
    if (`${type}` === '0') {
      typeErrors.push(ErrorMessage.PleaseSelect);
    }
    error.type = typeErrors;

    const introductionErrors = [];
    if (introduction.length === 0) {
      introductionErrors.push(ErrorMessage.PleaseInput);
    }
    error.introduction = introductionErrors;

    const addressErrors = [];
    if (address.length === 0) {
      addressErrors.push(ErrorMessage.PleaseInput);
    }
    const match = address.match(Validate.Address);
    if (!match || (match && match[4] === '')) {
      addressErrors.push(ErrorMessage.InvalidAddress);
    }
    error.address = addressErrors;

    this.setState({ error }, valid);
  };

  render() {
    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

    const { space } = this.props;
    const { images, title, type, introduction, address, error } = this.state;

    return (
      <EditSpaceTemplate
        header={<Header />}
        leftContent={
          <EditSpaceInformation
            images={images.map(image => ({
              url: image.ImageUrl || image.preview,
            }))}
            onChangeImage={this.handleChangeImage}
            onClickDeleteImage={this.handleDeleteImage}
            title={title}
            titleErrors={error.title}
            onChangeTitle={v => this.handleChangeUI('title', v)}
            type={type}
            typeErrors={error.type}
            onChangeType={v => this.handleChangeUI('type', v)}
            introduction={introduction}
            introductionErrors={error.introduction}
            onChangeIntroduction={v => this.handleChangeUI('introduction', v)}
            address={address}
            addressErrors={error.address}
            onChangeAddress={v => this.handleChangeUI('address', v)}
            onClickNext={this.onClickNext}
          />
        }
        rightContent={
          <EditStatus
            edit={space.ID}
            step={0}
            hintTitle="ヒント"
            hintContent={[
              'ユーザーが自分の荷物が入るかイメージできるようにスペースの情報やアピールポイントを掲載しましょう！',
            ]}
          />
        }
      />
    );
  }
}

const mapStateToProps = state =>
  mergeAuthProps(state, {
    space: state.ui.space || {},
  });

export default connect(EditSpaceInformationContainer, mapStateToProps);
