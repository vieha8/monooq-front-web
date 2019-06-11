// @flow

import React, { Component } from 'react';
import Path from 'config/path';
import { Redirect } from 'react-router-dom';
import handleBeforeUnload from 'components/hocs/handleBeforeUnload';

import { uiActions } from 'redux/modules/ui';

import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import Header from 'components/containers/Header';
import EditSpaceReceive from 'components/LV3/EditSpace/Receive';

import { ErrorMessages } from 'variables';

import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';
import { iskeyDownEnter } from 'helpers/keydown';
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

const Validate = {
  ReceiptAbout: {
    Max: 5000,
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

  static getDerivedStateFromProps(nextProps, prevState) {
    const { space } = nextProps;
    if (space.ID && !prevState.ID) {
      const { ReceiptType, ReceiptAbout, ID } = space;
      return { ReceiptType, ReceiptAbout, ID };
    }
    return null;
  }

  onKeyDownButtonNext: Function;

  onKeyDownButtonNext = e => {
    if (iskeyDownEnter(e) && this.validate()) {
      this.onClickNext();
    }
  };

  onKeyDownButtonBack: Function;

  onKeyDownButtonBack = e => {
    if (iskeyDownEnter(e)) {
      this.onClickBack();
    }
  };

  onClickNext: Function;

  onClickNext = () => {
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
    const { state } = this;
    const { error } = state;
    const errors = [];

    switch (propName) {
      case 'ReceiptAbout':
        if (value === undefined ? true : value.trim().length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        } else if (value.length > Validate.ReceiptAbout.Max) {
          errors.push(ErrorMessages.LengthMax('説明', Validate.ReceiptAbout.Max));
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
    const { ReceiptAbout } = this.state;
    return (
      ReceiptAbout &&
      (ReceiptAbout === undefined ? false : ReceiptAbout.trim().length > 0) &&
      ReceiptAbout.trim().length <= Validate.ReceiptAbout.Max
    );
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
            receiveErrors={error.ReceiptType}
            onChangeReceive={v => this.handleChangeUI('ReceiptType', v)}
            receiveAbout={ReceiptAbout}
            receiveAboutErrors={error.ReceiptAbout}
            onChangeReceiveAbout={v => this.handleChangeUI('ReceiptAbout', v)}
            onClickBack={this.onClickBack}
            onClickNext={this.onClickNext}
            onKeyDownButtonBack={this.onKeyDownButtonBack}
            onKeyDownButtonNext={this.onKeyDownButtonNext}
            buttonNextDisabled={!this.validate()}
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

export default authRequired(
  handleBeforeUnload(connect(mapStateToProps)(EditSpaceReceiveContainer)),
);
