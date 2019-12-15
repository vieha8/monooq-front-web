import React, { Component } from 'react';
import Path from 'config/path';
import { Redirect } from 'react-router-dom';
import ContentPageMenu from 'components/hocs/ContentPageMenu';
import handleBeforeUnload from 'components/hocs/HandleBeforeUnload';
import SpaceEdit2 from 'components/LV3/SpaceEdit/Step2';

import { uiActions } from 'redux/modules/ui';
import { ErrorMessages } from 'variables';
import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';
import { iskeyDownEnter } from 'helpers/keydown';
import { spaceActions } from '../../../redux/modules/space';

class SpaceEdit2Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postalCode: '',
      pref: '',
      town: '',
      line1: '',
      line2: '',
      receiptType: 0,
      error: {},
      isUpdate: !!props.match.params.space_id,
    };
  }

  componentDidMount() {
    const { match, dispatch, space } = this.props;
    const { isUpdate } = this.state;

    const spaceId = match.params.space_id;
    if (isUpdate && !space.id) {
      dispatch(spaceActions.prepareUpdateSpace(spaceId));
    }

    const { receiptType } = this.state;
    this.handleChangeUI('receiptType', receiptType);
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

  onKeyDownButtonGetAddress = e => {
    if (iskeyDownEnter(e)) {
      this.onClickGetAddress();
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { space } = nextProps;
    if (space.id && !prevState.id) {
      // TODO
      const { id, receiveType, zipCode, address, addressPref, addressCity, addressTown } = space;
      const line1 = address.replace(`${addressPref}${addressCity}${addressTown}`, '');
      console.log(line1);
      return {
        id,
        receiveType,
        pref: addressPref,
        zipCode,
        town: `${addressCity}${addressTown}`,
        line1,
      };
    }
    return null;
  }

  onClickNext = () => {
    const { dispatch, history, space } = this.props;
    const { receiptType, isUpdate } = this.state;

    // TODO: 【API連携】住所処理が組み込み終わったら差し替える。
    // （この値はスペース料金設定画面でMap座標取得処理で利用している)
    dispatch(
      uiActions.setUiState({
        space: Object.assign(space, {
          address: '東京都渋谷区東1-1',
          receiptType: parseInt(receiptType, 10) || 0,
        }),
      }),
    );

    const nextPath = isUpdate ? Path.spaceEdit3(space.id) : Path.spaceCreate3();
    history.push(nextPath);
  };

  onClickBack = () => {
    const { dispatch, history, space } = this.props;
    const { receiptType, isUpdate } = this.state;

    // TODO: 【API連携】住所処理が組み込み終わったら差し替える。
    // （この値はスペース料金設定画面でMap座標取得処理で利用している)
    dispatch(
      uiActions.setUiState({
        space: Object.assign(space, {
          address: '東京都渋谷区東1-1',
          receiptType: parseInt(receiptType, 10) || 0,
        }),
      }),
    );

    const nextPath = isUpdate ? Path.spaceEdit1(space.id) : Path.spaceCreate1();
    history.push(nextPath);
  };

  onClickGetAddress = () => {
    // TODO:【API連携】住所取得＆値セット
    console.log('onClickGetAddress');
  };

  handleChangeUI = (propName, value) => {
    const { state } = this;
    const { error } = state;
    const errors = [];

    switch (propName) {
      case 'postalCode':
        if (!value || value.trim().length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        } else {
          // TODO: 郵便番号のバリデートはあとで実装
          // const match = value ? value.match(Validate.Address) : '';
          // if (!match || (match && match[4] === '')) {
          //   errors.push(ErrorMessages.InvalidAddress);
          // }
        }
        break;
      case 'line1':
        if (!value || value.trim().value === 0) {
          errors.push(`番地を${ErrorMessages.PleaseInput}`);
        }
        break;
      case 'receiptType':
        if (!value || value === 0) {
          errors.push(ErrorMessages.PleaseSelect);
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
    const { receiptType } = this.state;
    // const AddressMatch = address ? address.match(Validate.Address) : '';
    return (
      // TODO: 住所のバリデートを実装する
      // address &&
      // (address === undefined ? false : address.trim().length > 0) &&
      // (AddressMatch ? AddressMatch[4] !== '' : false) &&
      receiptType && receiptType > 0
    );
  };

  validatePostCode = () => {
    // TODO: 郵便番号のバリデートはあとで実装
    return true;
    // const { postalCode } = this.state;
    // const AddressMatch = address ? address.match(Validate.Address) : '';
    // return (
    //   address &&
    //   (address === undefined ? false : address.trim().length > 0) &&
    //   (AddressMatch ? AddressMatch[4] !== '' : false) &&
    //   receiptType &&
    //   receiptType > 0
    // );
  };

  render() {
    const { space, isLoading } = this.props;
    const { isUpdate, receiptType, error, zipCode, pref, town, line1 } = this.state;

    if (isLoading) {
      return null;
    }

    if (!isUpdate && Object.keys(space).length === 0) {
      // 新規登録画面でリロードされた場合、登録TOP画面にリダイレクト
      return <Redirect to={Path.spaceCreate1()} />;
    }

    // TODO:【API連携】住所
    return (
      <SpaceEdit2
        edit={isUpdate}
        errors={error}
        formAddress={{
          postalCode: zipCode,
          pref,
          town,
          line1,
        }}
        onChangePostalCode={v => this.handleChangeUI('postalCode', v)}
        onChangePref={v => this.handleChangeUI('pref', v)}
        onChangeTown={v => this.handleChangeUI('town', v)}
        onChangeLine1={v => this.handleChangeUI('line1', v)}
        onChangeLine2={v => this.handleChangeUI('line2', v)}
        buttonDisabled={!this.validatePostCode()}
        buttonLoading={isLoading}
        onClickGetAddress={this.onClickGetAddress}
        onKeyDownButtonGetAddress={this.onKeyDownButtonGetAddress}
        receiptType={receiptType}
        onChangereceiptType={v => this.handleChangeUI('receiptType', v)}
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
  isLoading: state.space.isLoading,
});

export default authRequired(
  handleBeforeUnload(
    ContentPageMenu(connect(mapStateToProps)(SpaceEdit2Container), {
      noFooter: true,
      maxWidth: 540,
    }),
  ),
);
