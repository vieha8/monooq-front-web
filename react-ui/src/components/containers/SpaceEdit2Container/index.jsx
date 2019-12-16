import React, { Component } from 'react';
import Path from 'config/path';
import { Redirect } from 'react-router-dom';
import ContentPageMenu from 'components/hocs/ContentPageMenu';
import handleBeforeUnload from 'components/hocs/HandleBeforeUnload';
import SpaceEdit2 from 'components/LV3/SpaceEdit/Step2';

import { ErrorMessages } from 'variables';
import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';
import { iskeyDownEnter } from 'helpers/keydown';
import { spaceActions } from '../../../redux/modules/space';

const Validate = {
  PostalCode: {
    Match: /^\d{3}-?\d{4}$/, // 7桁の数字であるか(ハイフンは任意)
  },
};

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
      const { id, receiptType, postalCode, address, addressPref, addressCity, addressTown } = space;
      const line1 = address.replace(`${addressPref}${addressCity}${addressTown}`, '');
      return {
        id,
        receiptType,
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
    const { history, space } = this.props;
    const { isUpdate } = this.state;
    const nextPath = isUpdate ? Path.spaceEdit3(space.id) : Path.spaceCreate3();
    history.push(nextPath);
  };

  onClickBack = () => {
    const { history, space } = this.props;
    const { isUpdate } = this.state;
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
          errors.push(`郵便番号を${ErrorMessages.PleaseInput}`);
        } else if (!value.match(Validate.PostalCode.Match)) {
          errors.push(ErrorMessages.InvalidPostalCode);
        }
        break;
      case 'pref':
        if (!value || value.trim().length === 0) {
          errors.push(`住所の自動入力を${ErrorMessages.PleaseDo}`);
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
    const { postalCode, pref, town, line1, receiptType } = this.state;
    const PostalCodeMatch = postalCode ? postalCode.match(Validate.PostalCode.Match) : '';
    return (
      postalCode &&
      (postalCode === undefined ? false : postalCode.trim().length > 0) &&
      PostalCodeMatch &&
      pref &&
      (pref === undefined ? false : pref.trim().length > 0) &&
      town &&
      (town === undefined ? false : town.trim().length > 0) &&
      line1 &&
      (line1 === undefined ? false : line1.trim().length > 0) &&
      receiptType &&
      receiptType > 0
    );
  };

  validatePostCode = () => {
    // TODO: 郵便番号のバリデートはあとで実装
    const { postalCode } = this.state;
    const PostalCodeMatch = postalCode ? postalCode.match(Validate.PostalCode.Match) : '';
    return (
      postalCode &&
      (postalCode === undefined ? false : postalCode.trim().length > 0) &&
      PostalCodeMatch
    );
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
        onChangeLine2={v => this.handleChangeUI('line2', v)}
        buttonAddressDisabled={!this.validatePostCode()}
        buttonAddressLoading={isLoading}
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
