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
    const { space, geo } = nextProps;
    if (space.id && !prevState.id) {
      const { id, receiveType, postalCode, address, addressPref, addressCity, addressTown } = space;
      const line1 = address.replace(`${addressPref}${addressCity}${addressTown}`, '');
      return {
        id,
        receiveType,
        pref: addressPref,
        postalCode,
        town: `${addressCity}${addressTown}`,
        line1,
      };
    }

    if (geo.pref) {
      return {
        pref: geo.pref,
        town: `${geo.city}${geo.town}`,
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
    const { dispatch } = this.props;
    const { postalCode } = this.state;
    dispatch(spaceActions.getAddress({ postalCode }));
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
    const { isUpdate, receiptType, error, postalCode, pref, town, line1 } = this.state;

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
          postalCode,
          pref,
          town,
          line1,
        }}
        onChangePostalCode={v => this.handleChangeUI('postalCode', v)}
        onChangePref={v => this.handleChangeUI('pref', v)}
        onChangeTown={v => this.handleChangeUI('town', v)}
        onChangeLine1={v => this.handleChangeUI('line1', v)}
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
  geo: state.space.geo,
});

export default authRequired(
  handleBeforeUnload(
    ContentPageMenu(connect(mapStateToProps)(SpaceEdit2Container), {
      noFooter: true,
      maxWidth: 540,
    }),
  ),
);
