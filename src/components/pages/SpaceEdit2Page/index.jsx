import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Path from 'config/path';
import { ErrorMessages } from 'variables';
import { iskeyDownEnter } from 'helpers/keydown';
import { spaceActions } from 'redux/modules/space';
import { uiActions } from 'redux/modules/ui';
import BaseTemplate from 'components/templates/BaseTemplate';
import { withAuthRequire, withHandleBeforeUnload } from 'components/hooks';
import SpaceEdit2 from 'components/LV3/SpaceEdit/Step2';
import { isTrimmedEmpty } from 'helpers/validations/string';

const Validate = {
  PostalCode: {
    Match: /^[0-9]{3}-[0-9]{4}$/,
  },
};

const checkTown = town => {
  let resultTown = town;
  const resultRegexp = RegExp('[0-9]').exec(town);
  if (resultRegexp) {
    resultTown = town.replace(town.slice(resultRegexp.index), '');
  }
  return resultTown;
};

const checkError = (name, value) => {
  const errors = [];
  switch (name) {
    case 'postalCode':
      if (isTrimmedEmpty(value)) {
        errors.push(`郵便番号を${ErrorMessages.PleaseInput}`);
      } else if (!value.match(Validate.PostalCode.Match)) {
        errors.push(ErrorMessages.InvalidPostalCode);
      }
      break;
    case 'pref':
      if (isTrimmedEmpty(value)) {
        errors.push(`都道府県を${ErrorMessages.PleaseInput}`);
      }
      break;
    case 'town':
      if (isTrimmedEmpty(value)) {
        errors.push(`市区町村以降を${ErrorMessages.PleaseInput}`);
      } else if (value !== checkTown(value)) {
        errors.push(ErrorMessages.InvalidAddressTown);
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

    const checkedTown = checkTown(geo.town);

    this.handleChangeUI('pref', geo.pref);
    this.handleChangeUI('town', checkedTown);

    this.setState({
      pref: geo.pref || pref,
      city: geo.city || city,
      town: checkedTown,
    });
  };

  handleChangeUI = (propName, value) => {
    const state = { ...this.state };
    const { error } = state;
    let targetValue = value;

    error[propName] = [];
    this.setState({ error });

    if (propName === 'town') {
      if (!state.city) {
        targetValue = value;
      } else if (!value || !value.startsWith(state.city)) {
        targetValue = '';
      } else {
        targetValue = value.replace(state.city, '');
      }
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
      !isTrimmedEmpty(postalCode) &&
      PostalCodeMatch &&
      !isTrimmedEmpty(pref) &&
      !isTrimmedEmpty(town) &&
      town === checkTown(town) &&
      !isTrimmedEmpty(line1) &&
      receiptType &&
      receiptType > 0
    );
  };

  validatePostCode = () => {
    // TODO: 郵便番号のバリデートはあとで実装
    const { postalCode } = this.state;
    const PostalCodeMatch = postalCode ? postalCode.match(Validate.PostalCode.Match) : '';
    return !isTrimmedEmpty(postalCode) && PostalCodeMatch;
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
      <BaseTemplate maxWidth={540} setMargin="20px auto 0">
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
      </BaseTemplate>
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

export default withAuthRequire(withHandleBeforeUnload(connect(mapStateToProps)(SpaceEdit2Page)));
