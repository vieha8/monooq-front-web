// @flow

import React, { Component } from 'react';
import Path from 'config/path';

import EditSpaceTemplate from 'components/atomic/templates/EditSpaceTemplate';
import Header from 'components/atomic/containers/Header';
import EditSpaceInformation from 'components/atomic/organisms/EditSpace/Information';
import EditStatus from 'components/atomic/organisms/EditSpace/Status';

import { ErrorMessage } from 'strings';

import { checkLogin, checkAuthState, mergeAuthProps } from '../AuthRequired';
import connect from '../connect';

type PropTypes = {
  dispatch: Function,
  match: {
    pathname: string,
  },
};

const Validate = {
  Address: `(...??[都道府県])((?:旭川|伊達|石狩|盛岡|奥州|田村|南相馬|那須塩原|東村山|武蔵村山|羽村|十日町|上越|富山|野々市|大町|蒲郡|四日市|姫路|大和郡山|廿日市|下松|岩国|田川|大村)市|.+?郡(?:玉村|大町|.+?)[町村]|.+?市.+?区|.+?[市区町村])(\\D+)(.*)`,
};

class EditSpaceInformationContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    checkLogin(this.props);

    this.state = {
      title: '',
      type: '',
      introduction: '',
      address: '',
      error: {},
    };
  }

  imageDelete = (deleteTargetIndex: number) => {
    // const { ui, dispatch } = this.props;
    // const { space } = ui;
    // const nextImages = Object.assign([], space.images);
    // nextImages.splice(deleteTargetIndex, 1);
    // Object.assign(space, { images: nextImages });
    // dispatch(uiActions.setUiState({ space }));
  };

  onClickNext = () => {
    // const { history, ui } = this.props;
    // if (ui.isEdit) {
    //   history.push(Path.editSpaceBaggage(ui.spaceId));
    // } else {
    //   history.push(Path.createSpaceBaggage());
    // }
  };

  handleChangeUI = (propName: string, value: any) => {
    const state = this.state;
    const error = state.error;
    const errors = [];

    // TODO validation
    // or ボタン押下時にvalidationの方が良い??

    state[propName] = value;
    error[propName] = errors;
    this.setState({ ...state, error });
    // const prop = 'title';
    // const errors = this.props.error[prop] || [];
    // if (value.length === 0) {
    //   errors.push(ErrorMessage.PleaseInput);
    // }
    // FormValidator.changeErrorState(prop, errors, this.props.error);
    // FormValidator.changeUiState(prop, value, this.props.ui);
  };

  // handleChangeSpaceType = value => {
  //   const prop = 'type';
  //   const errors = this.props.error[prop] || [];
  //   if (value === 0) {
  //     errors.push(ErrorMessage.PleaseSelect);
  //   }
  //   FormValidator.changeErrorState(prop, errors, this.props.error);
  //   FormValidator.changeUiState(prop, value, this.props.ui);
  // };

  // handleChangeIntroduction = value => {
  //   const prop = 'introduction';
  //   const errors = this.props.error[prop] || [];
  //   if (value.length === 0) {
  //     errors.push(ErrorMessage.PleaseInput);
  //   }
  //   FormValidator.changeErrorState(prop, errors, this.props.error);
  //   FormValidator.changeUiState(prop, value, this.props.ui);
  // };

  // handleChangePrefCode = value => {
  //   FormValidator.changeUiState('prefecture', value, this.props.ui);
  // };

  // handleChangeAddress = value => {
  //   const prop = 'address';
  //   const errors = this.props.error[prop] || [];
  //   if (value.length === 0) {
  //     errors.push(ErrorMessage.PleaseInput);
  //   }

  //   let reg = `(...??[都道府県])`;
  //   reg += `((?:旭川|伊達|石狩|盛岡|奥州|田村|南相馬|那須塩原|東村山|武蔵村山|羽村|十日町|上越|富山|野々市|大町|蒲郡|四日市|姫路|大和郡山|廿日市|下松|岩国|田川|大村)市|.+?郡(?:玉村|大町|.+?)[町村]|.+?市.+?区|.+?[市区町村])`;
  //   reg += `(\\D+)`;
  //   reg += `(.*)`;

  //   const match = value.match(reg);
  //   if (!match || (match && match[4] === '')) {
  //     errors.push(ErrorMessage.InvalidAddress);
  //   }

  //   FormValidator.changeErrorState(prop, errors, this.props.error);
  //   FormValidator.changeUiState(prop, value, this.props.ui);
  // };

  // handleChangeImage = accepted => {
  //   const { space } = this.props.ui;
  //   if ((space.images || []).length + accepted.length > 4) {
  //     return;
  //   }
  //   Object.assign(space, { images: [...(space.images || []), ...accepted] });
  //   this.props.dispatch(uiActions.setUiState({ space }));
  // };

  validate = () => {
    const state = this.state;
    return (
      state.title &&
      state.title.length > 0 &&
      state.type > 0 &&
      state.introduction &&
      state.introduction.length > 0 &&
      state.address &&
      state.address.length > 0
    );
  };

  render() {
    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

    const { match } = this.props;
    const { title, type, introduction, address } = this.state;

    return (
      <EditSpaceTemplate
        header={<Header />}
        leftContent={
          <EditSpaceInformation
            title={title}
            onChangeTitle={v => this.handleChangeUI('title', v)}
            type={type}
            onChangeType={v => this.handleChangeUI('type', v)}
            introduction={introduction}
            onChangeIntroduction={v => this.handleChangeUI('introduction', v)}
            address={address}
            onChangeAddress={v => this.handleChangeUI('address', v)}
          />
        }
        rightContent={
          <EditStatus
            edit={match.pathname === Path.editSpaceInfo()}
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

const mapStateToProps = state => mergeAuthProps(state, {});

export default connect(EditSpaceInformationContainer, mapStateToProps);
