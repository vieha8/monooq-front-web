import React, { Component } from 'react';
import Path from 'config/path';
import { Redirect } from 'react-router-dom';
import ContentPageMenu from 'components/hocs/ContentPageMenu';
import handleBeforeUnload from 'components/hocs/HandleBeforeUnload';
import SpaceEdit2 from 'components/LV3/SpaceEdit/Step2';

import { ErrorMessages } from 'variables';
import { connect } from 'react-redux';
import { iskeyDownEnter } from 'helpers/keydown';
import { spaceActions } from '../../../redux/modules/space';
import { uiActions } from '../../../redux/modules/ui';
import withAuthRequire from 'components/hooks/withAuthRequire';

const Validate = {
  PostalCode: {
    Match: /^\d{3}-?\d{4}$/, // 7桁の数字であるか(ハイフンは任意)
  },
};

const checkError = (name, value) => {
  const errors = [];
  switch (name) {
    case 'postalCode':
      if (!value || value.trim().length === 0) {
        errors.push(`郵便番号を${ErrorMessages.PleaseInput}`);
      } else if (!value.match(Validate.PostalCode.Match)) {
        errors.push(ErrorMessages.InvalidPostalCode);
      }
      break;
    case 'pref':
      if (!value || value.trim().length === 0) {
        errors.push(`都道府県を${ErrorMessages.PleaseInput}`);
      }
      break;
    case 'town':
      if (!value || value.trim().length === 0) {
        errors.push(`市区町村以降を${ErrorMessages.PleaseInput}`);
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
  return errors;
};

class SpaceEdit2Page extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    const { postalCode, addressPref, addressCity, addressTown, line1, receiptType } = props.space;
    dispatch(spaceActions.getAddressInit());
    this.state = {
      postalCode: postalCode || '',
      pref: addressPref || '',
      city: addressCity || '',
      town: addressTown || '',
      line1: line1 || '',
      receiptType: receiptType || 0,
      error: {},
      isUpdate: !!props.match.params.space_id,
    };
  }

  componentDidMount() {
    const { match, dispatch, space } = this.props;
    const { isUpdate, postalCode, pref, town, line1, receiptType } = this.state;

    const spaceId = match.params.space_id;
    if (isUpdate && !space.id) {
      dispatch(spaceActions.prepareUpdateSpace(spaceId));
    }

    if (!isUpdate) {
      this.handleChangeUI('postalCode', postalCode);
      this.handleChangeUI('pref', pref);
      this.handleChangeUI('town', town);
      this.handleChangeUI('line1', line1);
      this.handleChangeUI('receiptType', receiptType);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { postalCode } = this.state;
    if (this.validatePostCode() && postalCode !== prevState.postalCode) {
      this.onClickGetAddress();
    }
    if (prevProps.geo.postalCode !== this.props.geo.postalCode) {
      const { geo } = this.props;
      const { pref, city, town } = geo;
      // eslint-disable-next-line react/no-did-update-set-state
      const { error } = prevState;
      error.pref = checkError('pref', geo.pref);
      error.town = checkError('town', geo.town);
      this.setState({ pref, city, town, error });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { space } = nextProps;
    if (space.id && !prevState.id) {
      const { id, receiptType, postalCode, address, addressPref, addressCity, addressTown } = space;
      const line1 = address.replace(`${addressPref}${addressCity}${addressTown}`, '');

      const error = {};
      error.postalCode = checkError('postalCode', postalCode);

      return {
        id,
        receiptType,
        postalCode,
        pref: addressPref,
        city: addressCity,
        town: addressTown,
        line1,
        error,
      };
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

  onKeyDownButtonGetAddress = e => {
    if (iskeyDownEnter(e)) {
      this.onClickGetAddress();
    }
  };

  onClickNext = () => {
    const { history, space, dispatch } = this.props;
    const { isUpdate, receiptType, postalCode, pref, city, town, line1 } = this.state;
    const nextPath = isUpdate ? Path.spaceEdit3(space.id) : Path.spaceCreate3();

    dispatch(
      uiActions.setUiState({
        space: Object.assign(space, {
          receiptType: parseInt(receiptType, 10),
          postalCode,
          address: `${pref}${city}${town}${line1}`,
          addressPref: pref,
          addressCity: city,
          addressTown: town,
          line1,
        }),
      }),
    );

    history.push(nextPath);
  };

  onClickBack = () => {
    const { history, space, dispatch } = this.props;
    const { isUpdate, receiptType, postalCode, pref, city, town, line1 } = this.state;
    const nextPath = isUpdate ? Path.spaceEdit1(space.id) : Path.spaceCreate1();

    dispatch(
      uiActions.setUiState({
        space: Object.assign(space, {
          receiptType,
          postalCode,
          address: `${pref}${city}${town}${line1}`,
          addressPref: pref,
          addressCity: city,
          addressTown: town,
          line1,
        }),
      }),
    );

    history.push(nextPath);
  };

  onClickGetAddress = () => {
    const { dispatch, geo } = this.props;
    const { postalCode, pref, city } = this.state;
    dispatch(spaceActions.getAddress({ postalCode }));

    this.handleChangeUI('pref', geo.pref);
    this.handleChangeUI('town', geo.town);

    this.setState({
      pref: geo.pref || pref,
      city: geo.city || city,
      town: geo.town,
    });
  };

  handleChangeUI = (propName, value) => {
    const state = { ...this.state };
    const { error } = state;
    let targetValue = value;

    error[propName] = [];
    this.setState({ error });

    if (propName === 'town') {
      state.town = value ? value.replace(state.city, '') : '';
      targetValue = state.town;
    }

    state[propName] = targetValue;
    const errors = checkError(propName, targetValue);
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
    const { space, isLoading, isLoadingAddress, errMessage } = this.props;
    const { isUpdate, receiptType, error, postalCode, pref, city, town, line1 } = this.state;

    if (isLoading) {
      return null;
    }

    if (!isUpdate && Object.keys(space).length === 0) {
      // 新規登録画面でリロードされた場合、登録TOP画面にリダイレクト
      return <Redirect to={Path.spaceCreate1()} />;
    }

    error.address = [errMessage];

    return (
      <SpaceEdit2
        edit={isUpdate}
        errors={error}
        formAddress={{
          postalCode,
          pref,
          town: `${city || ''}${town || ''}`,
          line1,
        }}
        onChangePostalCode={v => this.handleChangeUI('postalCode', v)}
        onChangePref={v => this.handleChangeUI('pref', v)}
        onChangeTown={v => this.handleChangeUI('town', v)}
        onChangeLine1={v => this.handleChangeUI('line1', v)}
        buttonLoading={isLoading}
        onChangeLine2={v => this.handleChangeUI('line2', v)}
        buttonAddressDisabled={!this.validatePostCode()}
        buttonAddressLoading={isLoadingAddress}
        onClickGetAddress={this.onClickGetAddress}
        onKeyDownButtonGetAddress={this.onKeyDownButtonGetAddress}
        receiptType={receiptType}
        onChangeReceiptType={v => this.handleChangeUI('receiptType', v)}
        onClickBack={this.onClickBack}
        onKeyDownButtonBack={this.onKeyDownButtonBack}
        onClickNext={this.onClickNext}
        onKeyDownButtonNext={this.onKeyDownButtonNext}
        buttonNextDisabled={
          isLoadingAddress || errMessage === ErrorMessages.FailedGetAddress || !this.validate()
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  space: state.ui.space || {},
  isLoading: state.space.isLoading,
  geo: state.space.geo,
  isLoadingAddress: state.space.isLoadingAddress,
  errMessage: state.space.errMessage,
});

export default withAuthRequire(
  handleBeforeUnload(
    ContentPageMenu(connect(mapStateToProps)(SpaceEdit2Page), {
      noFooter: true,
      maxWidth: 540,
    }),
  ),
);
