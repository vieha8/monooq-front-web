// @flow

import React, { Component } from 'react';
import Path from 'config/path';

import { uiActions } from 'redux/modules/ui';

import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import Header from 'components/atomic/containers/Header';
import EditSpaceReceive from 'components/atomic/LV3/EditSpace/Receive';

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
      ReceiptType: space.ReceiptType || 0,
      ReceiptAbout: space.ReceiptAbout || '',
      error: {},
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onClickNext: Function;
  onClickNext = () => {
    this.validate(() => {
      if (
        (this.state.error.receiptType || []).length === 0 &&
        (this.state.error.receiptAbout || []).length === 0
      ) {
        const { dispatch, history, space } = this.props;
        const { ReceiptType, ReceiptAbout } = this.state;

        dispatch(
          uiActions.setUiState({
            space: Object.assign(space, {
              ReceiptType: parseInt(ReceiptType, 10),
              ReceiptAbout,
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
    const { ReceiptType, ReceiptAbout } = this.state;

    dispatch(
      uiActions.setUiState({
        space: Object.assign(space, {
          ReceiptType,
          ReceiptAbout,
        }),
      }),
    );

    const nextPath = space.ID ? Path.editSpaceBaggage(space.ID) : Path.createSpaceBaggage();
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
    const { ReceiptType, ReceiptAbout, error } = this.state;

    const receiptTypeErrors = [];
    if (`${ReceiptType}` === '0') {
      receiptTypeErrors.push(ErrorMessage.PleaseSelect);
    }
    error.receiptType = receiptTypeErrors;

    const receiptAboutErrors = [];
    if (ReceiptAbout.length === 0) {
      receiptAboutErrors.push(ErrorMessage.PleaseInput);
    }
    if (receiptAboutErrors.length > 5000) {
      receiptAboutErrors.push(ErrorMessage.LengthMax('説明', 5000));
    }
    error.receiptAbout = receiptAboutErrors;

    this.setState({ error }, valid);
  };

  render() {
    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

    const { ReceiptType, ReceiptAbout, error } = this.state;

    return (
      <MenuPageTemplate
        header={<Header />}
        headline="荷物の受け取りについて"
        leftContent={
          <EditSpaceReceive
            receive={ReceiptType}
            receiveErrors={error.receiptType}
            onChangeReceive={v => this.handleChangeUI('ReceiptType', v)}
            receiveAbout={ReceiptAbout}
            receiveAboutErrors={error.receiptAbout}
            onChangeReceiveAbout={v => this.handleChangeUI('ReceiptAbout', v)}
            onClickBack={this.onClickBack}
            onClickNext={this.onClickNext}
          />
        }
        rightContent={<ServiceMenu />}
      />
    );
  }
}

const mapStateToProps = state =>
  mergeAuthProps(state, {
    space: state.ui.space || {},
  });

export default connect(
  EditSpaceReceiveContainer,
  mapStateToProps,
);
