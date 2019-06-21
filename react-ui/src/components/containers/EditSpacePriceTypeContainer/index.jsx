// @flow

import React, { Component } from 'react';
import Path from 'config/path';
import { Redirect } from 'react-router-dom';
import handleBeforeUnload from 'components/hocs/handleBeforeUnload';

import { uiActions } from 'redux/modules/ui';
import { spaceActions } from 'redux/modules/space';

import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import Header from 'components/containers/Header';
import EditSpaceInputPriceType from 'components/LV3/EditSpace/InputPriceType';

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

type PropTypes = {
  dispatch: Function,
  history: {
    push: Function,
  },
  space: {
    id: number,
  },
};

class EditSpacePriceTypeContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    const { space, dispatch } = this.props;
    const spaceId = props.match.params.space_id;

    this.state = {
      priceFull: space.priceFull || '',
      priceHalf: space.priceHalf || '',
      priceQuarter: space.priceQuarter || '',
      error: {},
      isUpdate: false,
      isFirst: true,
    };

    if (spaceId) {
      dispatch(spaceActions.prepareUpdateSpace(spaceId));
      this.state.isUpdate = true;
    } else if (space.address) {
      dispatch(spaceActions.getGeocode({ address: space.address }));
    }
  }

  componentDidMount() {
    const { priceFull, priceHalf, priceQuarter, isUpdate } = this.state;
    if (!isUpdate) {
      this.handleChangeUI('priceFull', priceFull);
      this.handleChangeUI('priceHalf', priceHalf);
      this.handleChangeUI('priceQuarter', priceQuarter);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { space } = nextProps;
    if (space.id && !prevState.id) {
      const {
        priceFull: PriceFullTmp,
        priceHalf: PriceHalfTmp,
        priceQuarter: PriceQuarterTmp,
        id,
      } = space;

      const priceFull = formatAddComma(PriceFullTmp);
      const priceHalf = formatAddComma(PriceHalfTmp);
      const priceQuarter = formatAddComma(PriceQuarterTmp);

      return { priceFull, priceHalf, priceQuarter, id, isFirst: false };
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
    const { dispatch, space, history, match } = this.props;
    const { priceFull, priceHalf, priceQuarter } = this.state;

    const spaceId = match.params.space_id;
    if (!spaceId && space.address) {
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
      priceHalf: formatRemoveComma(priceHalf),
      priceQuarter: formatRemoveComma(priceQuarter),
    });
    dispatch(
      uiActions.setUiState({
        space: saveSpace,
      }),
    );

    const nextPath = space.id ? Path.editSpaceConfirm(space.id) : Path.createSpaceConfirm();
    history.push(nextPath);
  };

  onClickBack: Function;

  onClickBack = () => {
    const { dispatch, history, space } = this.props;
    const { priceFull, priceHalf, priceQuarter } = this.state;

    dispatch(
      uiActions.setUiState({
        space: Object.assign(space, {
          priceFull: formatRemoveComma(priceFull),
          priceHalf: formatRemoveComma(priceHalf),
          priceQuarter: formatRemoveComma(priceQuarter),
        }),
      }),
    );

    const nextPath = space.id ? Path.editSpaceReceive(space.id) : Path.createSpaceReceive();
    history.push(nextPath);
  };

  handleChangeUI: Function;

  handleChangeUI = (propName: string, value: any) => {
    const { state } = this;
    const { error } = state;
    let returnValue = formatRemoveComma(value);

    const priceErrors = [];

    if (returnValue.length === 0) {
      priceErrors.push(ErrorMessages.PleaseInput);
    } else {
      if (isNaN(returnValue) || !String(returnValue).match(Validate.Price.Num)) {
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
    }

    state[propName] = returnValue;
    error[propName] = priceErrors;
    this.setState({ ...state, error });
  };

  validate: Function;

  validate = () => {
    const { priceFull, priceHalf, priceQuarter } = this.state;

    const checkPriceFull = formatRemoveComma(priceFull);
    const checkPriceHalf = formatRemoveComma(priceHalf);
    const checkPriceQuarter = formatRemoveComma(priceQuarter);

    return (
      checkPriceFull &&
      checkPriceFull >= Validate.Price.Min &&
      checkPriceFull <= Validate.Price.Max &&
      checkPriceHalf &&
      checkPriceHalf >= Validate.Price.Min &&
      checkPriceHalf <= Validate.Price.Max &&
      checkPriceQuarter &&
      checkPriceQuarter >= Validate.Price.Min &&
      checkPriceQuarter <= Validate.Price.Max
    );
  };

  render() {
    const { space, isLoading } = this.props;
    const { priceFull, priceHalf, priceQuarter, error, isUpdate, isFirst } = this.state;

    if (!isUpdate) {
      if (Object.keys(space).length === 0) {
        // 新規登録画面でリロードされた場合、登録TOP画面にリダイレクト
        return <Redirect to={Path.createSpaceInfo()} />;
      }
    } else if (priceFull && priceHalf && priceQuarter && isFirst) {
      // リロード時にvalidate実行する。
      this.handleChangeUI('priceFull', priceFull);
      this.handleChangeUI('priceHalf', priceHalf);
      this.handleChangeUI('priceQuarter', priceQuarter);
    }

    return (
      <MenuPageTemplate
        header={<Header />}
        headline="スペース料金の設定"
        leftContent={
          <EditSpaceInputPriceType
            errors={error}
            priceFull={priceFull}
            onChangePriceFull={v => this.handleChangeUI('priceFull', v)}
            priceHalf={priceHalf}
            onChangePriceHalf={v => this.handleChangeUI('priceHalf', v)}
            priceQuarter={priceQuarter}
            onChangePriceQuarter={v => this.handleChangeUI('priceQuarter', v)}
            buttonLoading={isLoading}
            onClickBack={this.onClickBack}
            onKeyDownButtonBack={this.onKeyDownButtonBack}
            onClickNext={this.onClickNext}
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
  user: state.auth.user || {},
  space: state.ui.space || {},
  isLoading: state.space.isLoading,
  geocode: state.space.geocode,
});

export default authRequired(
  handleBeforeUnload(connect(mapStateToProps)(EditSpacePriceTypeContainer)),
);
