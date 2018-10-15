// @flow

import React, { Component } from 'react';
import Path from 'config/path';

import { uiActions } from 'redux/modules/ui';
import { spaceActions } from 'redux/modules/space';

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

    const { dispatch, match, space, history } = this.props;

    dispatch(spaceActions.prepareUpdateSpace());

    this.state = {
      Images: space.Images || [],
      Title: space.Title || '',
      Type: space.Type || 0,
      Introduction: space.Introduction || '',
      Address: space.Address || '',
      error: {},
    };

    if (match.path === Path.createSpaceInfo()) {
      sessionStorage.removeItem('editSpace');
    } else if (Object.keys(space).length === 0) {
      // リロードされた場合
      const saveSpace = JSON.parse(sessionStorage.getItem('editSpace'));

      dispatch(spaceActions.setSpace({ saveSpace }));
      dispatch(uiActions.setUiState({ saveSpace }));
      history.push(Path.editSpaceInfo(saveSpace.ID));

      this.state = {
        Images: saveSpace.Images || [],
        Title: saveSpace.Title || '',
        Type: saveSpace.Type || 0,
        Introduction: saveSpace.Introduction || '',
        Address: saveSpace.Address || '',
        error: {},
      };
    } else {
      // 通常更新の場合
      sessionStorage.removeItem('editSpace');
      sessionStorage.setItem('editSpace', JSON.stringify(space));
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleChangeImage: Function;
  handleChangeImage = (pickedImages: Array<File>) => {
    const images = this.state.Images || [];
    const nextImages = [].concat(images, pickedImages);
    this.setState({ Images: nextImages });
  };

  handleDeleteImage: Function;
  handleDeleteImage = (deleteTargetIndex: number) => {
    const nextImages = Object.assign([], this.state.Images);
    nextImages.splice(deleteTargetIndex, 1);
    this.setState({ Images: nextImages });
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
        const { Images, Title, Type, Introduction, Address } = this.state;

        var tmpSpace = {};
        if (Object.keys(space).length === 0 && sessionStorage['editSpace']) {
          tmpSpace = JSON.parse(sessionStorage.getItem('editSpace'));
        } else {
          tmpSpace = space;
        }

        dispatch(
          uiActions.setUiState({
            space: Object.assign(tmpSpace, {
              Images,
              Title,
              Type: parseInt(Type, 10),
              Introduction,
              Address,
            }),
          }),
        );

        const nextPath = tmpSpace.ID
          ? Path.editSpaceBaggage(tmpSpace.ID)
          : Path.createSpaceBaggage();
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
    const { Title, Type, Introduction, Address, error } = this.state;

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

    this.setState({ error }, valid);
  };

  render() {
    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

    const { space } = this.props;
    const { Images, Title, Type, Introduction, Address, error } = this.state;

    console.log(space);

    return (
      <EditSpaceTemplate
        header={<Header />}
        leftContent={
          <EditSpaceInformation
            edit={space.ID}
            images={Images.map(image => ({
              url: image.ImageUrl || image.preview,
            }))}
            onChangeImage={this.handleChangeImage}
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

export default connect(
  EditSpaceInformationContainer,
  mapStateToProps,
);
