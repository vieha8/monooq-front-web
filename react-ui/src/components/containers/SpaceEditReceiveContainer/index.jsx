import React, { Component } from 'react';
import Path from 'config/path';
import { Redirect } from 'react-router-dom';
import ContentPageMenu from 'components/hocs/ContentPageMenu';
import handleBeforeUnload from 'components/hocs/HandleBeforeUnload';
import SpaceEditReceive from 'components/LV3/SpaceEdit/Receive';

import { uiActions } from 'redux/modules/ui';
import { ErrorMessages } from 'variables';

import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';
import { iskeyDownEnter } from 'helpers/keydown';
import { spaceActions } from '../../../redux/modules/space';

const Validate = {
  ReceiptAbout: {
    Max: 5000,
  },
};

class SpaceEditReceiveContainer extends Component {
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
    const { receiptType, receiptAbout, isUpdate } = this.state;

    dispatch(
      uiActions.setUiState({
        space: Object.assign(space, {
          receiptType: parseInt(receiptType, 10),
          receiptAbout,
        }),
      }),
    );

    const nextPath = isUpdate
      ? Path.spaceEditPrice(space.id, 'about')
      : Path.createSpacePrice('about');
    history.push(nextPath);
  };

  onClickBack = () => {
    const { dispatch, history, space } = this.props;
    const { receiptType, receiptAbout, isUpdate } = this.state;

    dispatch(
      uiActions.setUiState({
        space: Object.assign(space, {
          receiptType,
          receiptAbout,
        }),
      }),
    );

    const nextPath = isUpdate
      ? Path.spaceEditAddressMethod(space.id)
      : Path.createSpaceAddressMethod();
    history.push(nextPath);
  };

  handleChangeUI = (propName, value) => {
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

  render() {
    const { space } = this.props;
    const { isUpdate, receiptType, receiptAbout, error } = this.state;

    if (!isUpdate) {
      if (Object.keys(space).length === 0) {
        // 新規登録画面でリロードされた場合、登録TOP画面にリダイレクト
        return <Redirect to={Path.createSpaceInfo()} />;
      }
    }

    return (
      <SpaceEditReceive
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
  }
}

const mapStateToProps = state => ({
  space: state.ui.space || {},
});

export default authRequired(
  handleBeforeUnload(
    ContentPageMenu(connect(mapStateToProps)(SpaceEditReceiveContainer), {
      headline: '荷物の受け取りについて',
      noFooter: true,
    }),
  ),
);
