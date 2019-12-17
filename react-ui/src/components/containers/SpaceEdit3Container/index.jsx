import React, { Component } from 'react';
import Path from 'config/path';
import { Redirect } from 'react-router-dom';
import ContentPageMenu from 'components/hocs/ContentPageMenu';
import handleBeforeUnload from 'components/hocs/HandleBeforeUnload';
import SpaceEditStep3 from 'components/LV3/SpaceEdit/Step3';

import { uiActions } from 'redux/modules/ui';
import { spaceActions } from 'redux/modules/space';

import { ErrorMessages } from 'variables';

import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';
import { iskeyDownEnter } from 'helpers/keydown';
import { formatAddComma, formatRemoveComma } from 'helpers/string';

const Validate = {
  Address: `(...??[都道府県])((?:旭川|伊達|石狩|盛岡|奥州|田村|南相馬|那須塩原|東村山|武蔵村山|羽村|十日町|上越|富山|野々市|大町|蒲郡|四日市|姫路|大和郡山|廿日市|下松|岩国|田川|大村)市|.+?郡(?:玉村|大町|.+?)[町村]|.+?市.+?区|.+?[市区町村郡])(\\D+)(.*)`,
  Price: {
    Num: /^[0-9]+$/,
    Max: 300000,
    Min: 3000,
  },
};

class SpaceEdit3Container extends Component {
  constructor(props) {
    super(props);
    const { space } = this.props;
    this.state = {
      isPriceTatami: false,
      priceFull: space.priceFull || '',
      priceTatami: space.priceTatami || '',
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

    if (space.address) {
      dispatch(spaceActions.getGeocode({ address: space.address }));
      const { sizeType } = space;
      const isPriceTatami = sizeType === 1 || sizeType === 2 || sizeType === 3;
      this.setState({ isPriceTatami });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { space } = nextProps;
    if (space.id && !prevState.id) {
      // TODO: スペース編集時のリロード対策(最適化したい)

      const { priceFull: PriceFullTmp, priceTatami: PriceTatamiTmp, id, sizeType } = space;

      const isPriceTatami = sizeType === 1 || sizeType === 2 || sizeType === 3;

      const priceFull = formatAddComma(PriceFullTmp);
      const priceTatami = formatAddComma(PriceTatamiTmp);

      return { priceFull, priceTatami, id, isPriceTatami };
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
      const arrayAddress = space.address.match(Validate.Address);
      const saveSpaceNew = Object.assign(space, {
        lat: (geocode || {}).lat,
        lng: (geocode || {}).lng,
        addressPref: arrayAddress[1],
        addressCity: arrayAddress[2],
        addressTown: arrayAddress[3],
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

  handleChangeUI = (propName, value) => {
    const { state } = this;
    const { error } = state;
    let returnValue = formatRemoveComma(value);

    const priceErrors = [];

    if (!returnValue || returnValue.length === 0) {
      priceErrors.push(ErrorMessages.PleaseInput);
    } else if (Number.isNaN(returnValue) || !String(returnValue).match(Validate.Price.Num)) {
      priceErrors.push(ErrorMessages.PriceNumber);
    } else {
      if (returnValue < Validate.Price.Min) {
        priceErrors.push(ErrorMessages.PriceMin(Validate.Price.Min));
      }
      if (returnValue > Validate.Price.Max) {
        priceErrors.push(ErrorMessages.PriceMax(Validate.Price.Max));
      }
      returnValue = formatAddComma(returnValue);
    }

    state[propName] = returnValue;
    error[propName] = priceErrors;
    this.setState({ ...state, error });
  };

  validate = () => {
    const { isPriceTatami, priceFull, priceTatami } = this.state;
    const checkPriceFull = formatRemoveComma(priceFull);
    const checkPriceTatami = formatRemoveComma(priceTatami);
    let resultCheckTatami = true;

    if (isPriceTatami) {
      resultCheckTatami =
        checkPriceTatami &&
        checkPriceTatami >= Validate.Price.Min &&
        checkPriceTatami <= Validate.Price.Max;
    }

    return (
      checkPriceFull &&
      checkPriceFull >= Validate.Price.Min &&
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
      <SpaceEditStep3
        isPriceTatami={isPriceTatami}
        edit={isUpdate}
        errors={error}
        priceFull={priceFull}
        onChangePriceFull={v => this.handleChangeUI('priceFull', v)}
        priceTatami={priceTatami}
        onChangePriceTatami={v => this.handleChangeUI('priceTatami', v)}
        buttonLoading={isLoading}
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
  user: state.auth.user || {},
  space: state.ui.space || {},
  isLoading: state.space.isLoading,
  geocode: state.space.geocode,
});

export default authRequired(
  handleBeforeUnload(
    ContentPageMenu(connect(mapStateToProps)(SpaceEdit3Container), {
      noFooter: true,
      maxWidth: 540,
    }),
  ),
);
