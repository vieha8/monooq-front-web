// @flow

import React, { Component } from 'react';
import Path from 'config/path';
import { Redirect } from 'react-router-dom';

import { uiActions } from 'redux/modules/ui';

import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import Header from 'components/containers/Header';
import EditSpaceReceive from 'components/LV3/EditSpace/Receive';

import { ErrorMessages } from 'variables';

import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';
import { spaceActions } from '../../../redux/modules/space';

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

    const { space, dispatch } = this.props;

    this.state = {
      ReceiptType: space.ReceiptType || 1,
      ReceiptAbout: space.ReceiptAbout || '',
      error: {},
      isUpdate: false,
    };

    const spaceId = props.match.params.space_id;
    if (spaceId) {
      dispatch(spaceActions.prepareUpdateSpace(spaceId));
      this.state.isUpdate = true;
    }
  }

  handleBeforeUnload(e) {
    e.preventDefault();
    e.returnValue = 'データが保存されませんが、よろしいですか?';
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { space } = nextProps;
    if (space.ID && !prevState.ID) {
      const { ReceiptType, ReceiptAbout, ID } = space;
      return { ReceiptType, ReceiptAbout, ID };
    }
    return null;
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

        const nextPath = space.ID
          ? Path.editSpacePrice(space.ID, 'about')
          : Path.createSpacePrice('about');
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
      receiptTypeErrors.push(ErrorMessages.PleaseSelect);
    }
    error.receiptType = receiptTypeErrors;

    const receiptAboutErrors = [];
    if (ReceiptAbout.length === 0) {
      receiptAboutErrors.push(ErrorMessages.PleaseInput);
    }
    if (receiptAboutErrors.length > 5000) {
      receiptAboutErrors.push(ErrorMessages.LengthMax('説明', 5000));
    }
    error.receiptAbout = receiptAboutErrors;

    this.setState({ error }, valid);
  };

  render() {
    const { space } = this.props;
    const { ReceiptType, ReceiptAbout, error, isUpdate } = this.state;

    if (!isUpdate) {
      if (Object.keys(space).length === 0) {
        // 新規登録画面でリロードされた場合、登録TOP画面にリダイレクト
        return <Redirect to={Path.createSpaceInfo()} />;
      }
    }

    return (
      <MenuPageTemplate
        header={<Header />}
        headline="荷物の受け取りについて"
        bottomButtonMargin={130}
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

const mapStateToProps = state => ({
  space: state.ui.space || {},
});

export default authRequired(connect(mapStateToProps)(EditSpaceReceiveContainer));
