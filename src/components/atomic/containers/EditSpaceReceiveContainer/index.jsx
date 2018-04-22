// @flow

import React, { Component } from 'react';
import Path from 'config/path';
import { Redirect } from 'react-router-dom';

import { uiActions } from 'redux/modules/ui';

import EditSpaceTemplate from 'components/atomic/templates/EditSpaceTemplate';
import Header from 'components/atomic/containers/Header';
import EditSpaceReceive from 'components/atomic/organisms/EditSpace/Receive';
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

class EditSpaceReceiveContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    checkLogin(this.props);

    const { space } = this.props;

    this.state = {
      receiptType: space.receiptType || 0,
      receiptAbout: space.receiptAbout || '',
      error: {},
    };
  }

  onClickNext: Function;
  onClickNext = () => {
    this.validate(() => {
      if (
        (this.state.error.receiptType || []).length === 0 &&
        (this.state.error.receiptAbout || []).length === 0
      ) {
        const { dispatch, history, space } = this.props;
        const { receiptType, receiptAbout } = this.state;

        dispatch(
          uiActions.setUiState({
            space: Object.assign(space, {
              receiptType,
              receiptAbout,
            }),
          }),
        );

        const nextPath = space.ID ? Path.editSpaceAreaSize(space.ID) : Path.createSpaceAreaSize();
        history.push(nextPath);
      }
    });
  };

  onClickBack: Function;
  onClickBack = () => {
    const { dispatch, history, space } = this.props;
    const { receiptType, receiptAbout } = this.state;

    dispatch(
      uiActions.setUiState({
        space: Object.assign(space, {
          receiptType,
          receiptAbout,
        }),
      }),
    );

    const nextPath = space.ID ? Path.editSpaceAreaSize(space.ID) : Path.createSpaceAreaSize();
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
    const { receiptType, receiptAbout, error } = this.state;

    const receiptTypeErrors = [];
    if (`${receiptType}` === '0') {
      receiptTypeErrors.push(ErrorMessage.PleaseSelect);
    }
    error.receiptType = receiptTypeErrors;

    const receiptAboutErrors = [];
    if (receiptAbout.length === 0) {
      receiptAboutErrors.push(ErrorMessage.PleaseInput);
    }
    error.receiptAbout = receiptAboutErrors;

    this.setState({ error }, valid);
  };

  render() {
    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

    const { space } = this.props;
    const { receiptType, receiptAbout, error } = this.state;

    if (!space.title) {
      return <Redirect to={Path.createSpaceInfo()} />;
    }

    return (
      <EditSpaceTemplate
        header={<Header />}
        leftContent={
          <EditSpaceReceive
            receive={receiptType}
            receiveErrors={error.receiptType}
            onChangeReceive={v => this.handleChangeUI('receiptType', v)}
            receiveAbout={receiptAbout}
            receiveAboutErrors={error.receiptAbout}
            onChangeReceiveAbout={v => this.handleChangeUI('receiptAbout', v)}
            onClickBack={this.onClickBack}
            onClickNext={this.onClickNext}
          />
        }
        rightContent={
          <EditStatus
            edit={space.ID}
            step={2}
            hintTitle="ヒント"
            hintContent={[
              'もし、あなたが車でお手伝いができるならアピールをしましょう。ユーザーに喜んでもらえますよ！',
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

export default connect(EditSpaceReceiveContainer, mapStateToProps);
