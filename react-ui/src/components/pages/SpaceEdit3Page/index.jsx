import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Path from 'config/path';
import { ErrorMessages } from 'variables';
import { iskeyDownEnter } from 'helpers/keydown';
import { formatAddComma, formatRemoveComma } from 'helpers/string';
import { uiActions } from 'redux/modules/ui';
import { spaceActions } from 'redux/modules/space';
import BaseTemplate from 'components/templates/BaseTemplate';
import { withAuthRequire, withHandleBeforeUnload } from 'components/hooks';
import SpaceEditStep3 from 'components/LV3/SpaceEdit/Step3';
import { isValidSpacePriceTokyo } from 'helpers/validations/spacePrice';

const Validate = {
  Price: {
    Max: 300000,
    Min: 3000,
    MinTokyo: 6000,
  },
};

const checkError = (value, addressPref) => {
  const errors = [];
  if (!value || value.length === 0) {
    errors.push(ErrorMessages.PleaseInput);
  } else {
    const { reason, result } = isValidSpacePriceTokyo(value, addressPref);
    if (!result) {
      errors.push(reason);
    }
  }
  return errors;
};

const calcPriceFull = (priceTatami, tatami) => {
  return Math.floor(formatRemoveComma(priceTatami) * formatRemoveComma(tatami));
};

class SpaceEdit3Page extends Component {
  constructor(props) {
    super(props);
    const { space } = this.props;
    let calculated;
    if (space.tatami) {
      calculated = calcPriceFull(space.priceTatami, space.tatami);
    }
    this.state = {
      isPriceTatami: space.sizeType === 1 || space.sizeType === 2 || space.sizeType === 3,
      priceFull: calculated || space.priceFull || 0,
      priceTatami: space.priceTatami || 0,
      error: {},
      isUpdate: !!props.match.params.space_id,
    };
  }

  componentDidMount() {
    const { match, dispatch, space } = this.props;
    const { isUpdate, priceFull, priceTatami } = this.state;

    const spaceId = match.params.space_id;
    if (isUpdate && !space.id) {
      dispatch(spaceActions.prepareUpdateSpace(spaceId));
    }

    const { sizeType } = space;
    const isPriceTatami = sizeType === 1 || sizeType === 2 || sizeType === 3;

    if (space.address) {
      dispatch(spaceActions.getGeocode({ address: space.address }));
    }
    this.handleChangePriceUI('priceFull', priceFull);
    if (isPriceTatami) {
      this.handleChangePriceUI('priceTatami', priceTatami);
    }
    this.setState({ isPriceTatami });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { space } = nextProps;
    if (space.id && !prevState.id) {
      const { tatami, priceFull, priceTatami, id, sizeType } = space;

      const isPriceTatami = sizeType === 1 || sizeType === 2 || sizeType === 3;

      let calculated;
      if (tatami) {
        calculated = calcPriceFull(priceTatami, tatami);
      }

      const error = {};
      error.priceFull = checkError(calculated || formatRemoveComma(priceFull), space.addressPref);
      error.priceTatami = checkError(formatRemoveComma(priceTatami), space.addressPref);

      return {
        priceFull: calculated || formatRemoveComma(priceFull),
        priceTatami,
        id,
        isPriceTatami,
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

  onClickNext = () => {
    const { dispatch, space, history } = this.props;
    const { priceFull, priceTatami, isPriceTatami, isUpdate } = this.state;

    if (space.address) {
      const { geocode } = this.props;
      const saveSpaceNew = Object.assign(space, {
        lat: (geocode || {}).lat,
        lng: (geocode || {}).lng,
      });
      dispatch(
        uiActions.setUiState({
          space: saveSpaceNew,
        }),
      );
    }

    const saveSpace = Object.assign(space, {
      priceFull: formatRemoveComma(priceFull),
      priceTatami: isPriceTatami ? formatRemoveComma(priceTatami) : '0',
    });
    dispatch(
      uiActions.setUiState({
        space: saveSpace,
      }),
    );

    const nextPath = isUpdate ? Path.spaceEditConfirm(space.id) : Path.createSpaceConfirm();
    history.push(nextPath);
  };

  onClickBack = () => {
    const { dispatch, history, space } = this.props;
    const { priceFull, priceTatami, isPriceTatami, isUpdate } = this.state;
    dispatch(
      uiActions.setUiState({
        space: Object.assign(space, {
          priceFull: formatRemoveComma(priceFull),
          priceTatami: isPriceTatami ? formatRemoveComma(priceTatami) : '0',
        }),
      }),
    );

    const nextPath = isUpdate ? Path.spaceEdit2(space.id) : Path.spaceCreate2();
    history.push(nextPath);
  };

  handleChangePriceUI = (propName, value) => {
    const { space } = this.props;
    const state = { ...this.state };
    const { error } = state;
    const returnValue = formatRemoveComma(value);
    const priceErrors = checkError(returnValue, space.addressPref);

    switch (propName) {
      case 'priceTatami': {
        if (space.tatami) {
          state.priceFull = calcPriceFull(value, space.tatami);
          this.handleChangePriceUI('priceFull', value);
        }
        break;
      }
      default:
        break;
    }

    state[propName] = returnValue === '' ? 0 : returnValue;
    error[propName] = priceErrors;
    this.setState({ ...state, error });
  };

  validate = () => {
    const { space } = this.props;
    const { isPriceTatami, priceFull, priceTatami } = this.state;
    const checkPriceFull = formatRemoveComma(priceFull);
    const checkPriceTatami = formatRemoveComma(priceTatami);
    let resultCheckTatami = true;

    let priceMin = Validate.Price.Min;
    if (space.addressPref && space.addressPref === '東京都') {
      priceMin = Validate.Price.MinTokyo;
    }

    if (isPriceTatami) {
      resultCheckTatami =
        checkPriceTatami && checkPriceTatami >= priceMin && checkPriceTatami <= Validate.Price.Max;
    }

    return (
      checkPriceFull &&
      checkPriceFull >= priceMin &&
      checkPriceFull <= Validate.Price.Max &&
      resultCheckTatami
    );
  };

  render() {
    const { space, isLoading } = this.props;
    const { isPriceTatami, priceFull, priceTatami, error, isUpdate } = this.state;

    if (!isUpdate && !space.title) {
      // 新規登録画面でリロードされた場合、登録TOP画面にリダイレクト
      return <Redirect to={Path.spaceCreate1()} />;
    }

    return (
      <BaseTemplate maxWidth={540}>
        <SpaceEditStep3
          isPriceTatami={isPriceTatami}
          sizeType={space.sizeType}
          edit={isUpdate}
          errors={error}
          isRoom={space.sizeType > 0 && space.sizeType < 4}
          priceFull={parseInt(priceFull, 10) === 0 ? '' : formatAddComma(priceFull)}
          onChangePriceFull={v => this.handleChangePriceUI('priceFull', v)}
          priceTatami={parseInt(priceTatami, 10) === 0 ? '' : formatAddComma(priceTatami)}
          onChangePriceTatami={v => this.handleChangePriceUI('priceTatami', v)}
          buttonLoading={isLoading}
          onClickBack={this.onClickBack}
          onKeyDownButtonBack={this.onKeyDownButtonBack}
          onClickNext={this.onClickNext}
          onKeyDownButtonNext={this.onKeyDownButtonNext}
          buttonNextDisabled={!this.validate()}
        />
      </BaseTemplate>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user || {},
  space: state.ui.space || {},
  isLoading: state.space.isLoading,
  geocode: state.space.geocode,
});

export default withAuthRequire(withHandleBeforeUnload(connect(mapStateToProps)(SpaceEdit3Page)));
