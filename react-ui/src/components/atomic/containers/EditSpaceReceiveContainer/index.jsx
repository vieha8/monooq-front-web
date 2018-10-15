// @flow

import React, { Component } from 'react';
import Path from 'config/path';

import { uiActions } from 'redux/modules/ui';
import { spaceActions } from 'redux/modules/space';

import EditSpaceTemplate from 'components/atomic/templates/EditSpaceTemplate';
import Header from 'components/atomic/containers/Header';
import EditSpaceReceive from 'components/atomic/LV3/EditSpace/Receive';
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

class EditSpaceReceiveContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    checkLogin(this.props);

    const { dispatch, space, history } = this.props;

    this.state = {
      ReceiptType: space.ReceiptType || 0,
      ReceiptAbout: space.ReceiptAbout || '',
      error: {},
    };

    if (Object.keys(space).length === 0 && sessionStorage['editSpace']) {
      // リロードされた場合
      const saveSpace = JSON.parse(sessionStorage.getItem('editSpace'));

      dispatch(spaceActions.setSpace({ saveSpace }));
      dispatch(uiActions.setUiState({ saveSpace }));
      history.push(Path.createSpaceReceive(saveSpace.ID));

      this.state = {
        ReceiptType: saveSpace.ReceiptType || 0,
        ReceiptAbout: saveSpace.ReceiptAbout || '',
        error: {},
      };
    } else {
      // 通常更新の場合
      sessionStorage.setItem('editSpace', JSON.stringify(space));
    }
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

        var tmpSpace = {};
        if (Object.keys(space).length === 0 && sessionStorage['editSpace']) {
          tmpSpace = JSON.parse(sessionStorage.getItem('editSpace'));
        } else {
          tmpSpace = space;
        }

        dispatch(
          uiActions.setUiState({
            space: Object.assign(tmpSpace, {
              ReceiptType: parseInt(ReceiptType, 10),
              ReceiptAbout,
            }),
          }),
        );

        const nextPath = tmpSpace.ID
          ? Path.editSpaceAreaSize(tmpSpace.ID)
          : Path.createSpaceAreaSize();
        history.push(nextPath);
      }
    });
  };

  onClickBack: Function;
  onClickBack = () => {
    const { dispatch, history, space } = this.props;
    const { ReceiptType, ReceiptAbout } = this.state;

    var tmpSpace = {};
    if (Object.keys(space).length === 0 && sessionStorage['editSpace']) {
      tmpSpace = JSON.parse(sessionStorage.getItem('editSpace'));
    } else {
      tmpSpace = space;
    }

    dispatch(
      uiActions.setUiState({
        space: Object.assign(tmpSpace, {
          ReceiptType,
          ReceiptAbout,
        }),
      }),
    );

    const nextPath = tmpSpace.ID ? Path.editSpaceBaggage(tmpSpace.ID) : Path.createSpaceBaggage();
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

    const { space } = this.props;
    const { ReceiptType, ReceiptAbout, error } = this.state;

    return (
      <EditSpaceTemplate
        header={<Header />}
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

export default connect(
  EditSpaceReceiveContainer,
  mapStateToProps,
);
