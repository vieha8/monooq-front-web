// @flow

import React, { Component } from 'react';
import Path from 'config/path';
import { Redirect } from 'react-router-dom';

import { uiActions } from 'redux/modules/ui';

import EditSpaceTemplate from 'components/atomic/templates/EditSpaceTemplate';
import Header from 'components/atomic/containers/Header';
import EditSpaceBaggage from 'components/atomic/organisms/EditSpace/Baggage';
import EditStatus from 'components/atomic/organisms/EditSpace/Status';

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

class EditSpaceInformationContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    checkLogin(this.props);

    const { space } = this.props;

    this.state = {
      about: space.about || '',
      isFurniture: space.isFurniture || false,
      error: {},
    };
  }

  onClickNext: Function;
  onClickNext = () => {
    this.validate(() => {
      if ((this.state.error.baggage || []).length === 0) {
        const { dispatch, history, space } = this.props;
        const { about, isFurniture } = this.state;

        dispatch(
          uiActions.setUiState({
            space: Object.assign(space, {
              about,
              isFurniture,
            }),
          }),
        );

        const nextPath = space.ID ? Path.editSpaceReceive(space.ID) : Path.createSpaceReceive();
        history.push(nextPath);
      }
    });
  };

  onClickBack: Function;
  onClickBack = () => {
    const { dispatch, history, space } = this.props;
    const { about, isFurniture } = this.state;

    dispatch(
      uiActions.setUiState({
        space: Object.assign(space, {
          about,
          isFurniture,
        }),
      }),
    );

    const nextPath = space.ID ? Path.editSpaceInfo(space.ID) : Path.createSpaceInfo();
    history.push(nextPath);
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
    const { about, error } = this.state;

    const aboutErrors = [];
    if (about.length === 0) {
      aboutErrors.push(ErrorMessage.PleaseInput);
    }
    error.about = aboutErrors;

    this.setState({ error }, valid);
  };

  render() {
    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

    const { space } = this.props;
    const { about, isFurniture, error } = this.state;

    if (!space.title) {
      return <Redirect to={Path.createSpaceInfo()} />;
    }

    return (
      <EditSpaceTemplate
        header={<Header />}
        leftContent={
          <EditSpaceBaggage
            baggage={about}
            baggageErrors={error.about}
            onChangeBaggage={v => this.handleChangeUI('about', v)}
            checkedFurniture={isFurniture}
            onClickFurniture={() => this.handleChangeUI('isFurniture', !isFurniture)}
            onClickBack={this.onClickBack}
            onClickNext={this.onClickNext}
          />
        }
        rightContent={
          <EditStatus
            edit={space.ID}
            step={1}
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
