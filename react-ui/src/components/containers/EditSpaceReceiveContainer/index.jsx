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
    id: number,
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
      receiptType: space.receiptType || 1,
      receiptAbout: space.receiptAbout || '',
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
    if (space.id && !prevState.id) {
      const { receiptType, receiptAbout, id } = space;
      return { receiptType, receiptAbout, id };
    }
    return null;
  }

  onKeyDownButtonNext = e => {
    if (iskeyDownEnter(e) && this.validate()) {
      this.onClickNext();
    }
  };

  onKeyDownButtonBack = e => {
    if (iskeyDownEnter(e)) {
      this.onClickBack();
    }
  };

  onClickNext = () => {
    const { dispatch, history, space } = this.props;
    const { receiptType, receiptAbout } = this.state;

    dispatch(
      uiActions.setUiState({
        space: Object.assign(space, {
          receiptType: parseInt(receiptType, 10),
          receiptAbout,
        }),
      }),
    );

    const nextPath = space.id
      ? Path.editSpacePrice(space.id, 'about')
      : Path.createSpacePrice('about');
    history.push(nextPath);
  };

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

    const nextPath = space.id ? Path.editSpaceBaggage(space.id) : Path.createSpaceBaggage();
    history.push(nextPath);
  };

  handleChangeUI = (propName: string, value: any) => {
    const { state } = this;
    const { error } = state;
    const errors = [];

    switch (propName) {
      case 'receiptAbout':
        if (!value || value.trim().length === 0) {
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

  validate = () => {
    const { receiptAbout } = this.state;
    return (
      receiptAbout &&
      (receiptAbout === undefined ? false : receiptAbout.trim().length > 0) &&
      receiptAbout.trim().length <= Validate.ReceiptAbout.Max
    );
  };

  leftContent = () => {
    const { receiptType, receiptAbout, error } = this.state;
    return (
      <EditSpaceReceive
        errors={error}
        receive={receiptType}
        onChangeReceive={v => this.handleChangeUI('receiptType', v)}
        receiveAbout={receiptAbout}
        onChangeReceiveAbout={v => this.handleChangeUI('receiptAbout', v)}
        onClickBack={this.onClickBack}
        onKeyDownButtonBack={this.onKeyDownButtonBack}
        onClickNext={this.onClickNext}
        onKeyDownButtonNext={this.onKeyDownButtonNext}
        buttonNextDisabled={!this.validate()}
      />
    );
  };

  render() {
    const { space } = this.props;
    const { isUpdate } = this.state;

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
        leftContent={this.leftContent()}
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
