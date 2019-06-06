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
    ID: number,
  },
};

class EditSpacePriceTypeContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    const { space, dispatch } = this.props;
    const spaceId = props.match.params.space_id;

    this.state = {
      PriceFull: space.PriceFull || '',
      PriceHalf: space.PriceHalf || '',
      PriceQuarter: space.PriceQuarter || '',
      error: {},
      isUpdate: false,
      isFirst: true,
    };

    if (spaceId) {
      dispatch(spaceActions.prepareUpdateSpace(spaceId));
      this.state.isUpdate = true;
    } else if (space.Address) {
      dispatch(spaceActions.getGeocode({ address: space.Address }));
    }
  }

  componentDidMount() {
    const { PriceFull, PriceHalf, PriceQuarter, isUpdate } = this.state;
    if (!isUpdate) {
      this.handleChangeUI('PriceFull', PriceFull);
      this.handleChangeUI('PriceHalf', PriceHalf);
      this.handleChangeUI('PriceQuarter', PriceQuarter);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { space } = nextProps;
    if (space.ID && !prevState.ID) {
      const {
        PriceFull: PriceFullTmp,
        PriceHalf: PriceHalfTmp,
        PriceQuarter: PriceQuarterTmp,
        ID,
      } = space;

      const PriceFull = formatAddComma(PriceFullTmp);
      const PriceHalf = formatAddComma(PriceHalfTmp);
      const PriceQuarter = formatAddComma(PriceQuarterTmp);

      return { PriceFull, PriceHalf, PriceQuarter, ID, isFirst: false };
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
    const { PriceFull, PriceHalf, PriceQuarter } = this.state;

    const spaceId = match.params.space_id;
    if (!spaceId && space.Address) {
      const { geocode } = this.props;
      const arrayAddress = space.Address.match(Validate.Address);

      const saveSpaceNew = Object.assign(space, {
        Latitude: (geocode || {}).lat,
        Longitude: (geocode || {}).lng,
        AddressPref: arrayAddress[1],
        AddressCity: arrayAddress[2],
        AddressTown: arrayAddress[3],
      });
      dispatch(
        uiActions.setUiState({
          space: saveSpaceNew,
        }),
      );
    }

    const saveSpace = Object.assign(space, {
      PriceFull: formatRemoveComma(PriceFull),
      PriceHalf: formatRemoveComma(PriceHalf),
      PriceQuarter: formatRemoveComma(PriceQuarter),
    });
    dispatch(
      uiActions.setUiState({
        space: saveSpace,
      }),
    );

    const nextPath = space.ID ? Path.editSpaceConfirm(space.ID) : Path.createSpaceConfirm();
    history.push(nextPath);
  };

  onClickBack: Function;

  onClickBack = () => {
    const { dispatch, history, space } = this.props;
    const { PriceFull, PriceHalf, PriceQuarter } = this.state;

    dispatch(
      uiActions.setUiState({
        space: Object.assign(space, {
          PriceFull: formatRemoveComma(PriceFull),
          PriceHalf: formatRemoveComma(PriceHalf),
          PriceQuarter: formatRemoveComma(PriceQuarter),
        }),
      }),
    );

    const nextPath = space.ID ? Path.editSpaceReceive(space.ID) : Path.createSpaceReceive();
    history.push(nextPath);
  };

  handleChangeUI: Function;

  handleChangeUI = (propName: string, value: any) => {
    const { state } = this;
    const { error } = state;
    const errors = [];
    let returnValue = formatRemoveComma(value);

    const priceErrors = [];

    if (returnValue.length === 0) {
      priceErrors.push(ErrorMessages.PleaseInput);
    } else {
      if (!Number(returnValue) || !String(returnValue).match(Validate.Price.Num)) {
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

    switch (propName) {
      case 'PriceFull':
        error.priceFull = priceErrors;
        break;
      case 'PriceHalf':
        error.priceHalf = priceErrors;
        break;
      case 'PriceQuarter':
        error.priceQuarter = priceErrors;
        break;

      default:
        break;
    }

    state[propName] = returnValue;
    error[propName] = errors;
    this.setState({ ...state, error });
  };

  validate: Function;

  validate = () => {
    const { PriceFull, PriceHalf, PriceQuarter } = this.state;

    const checkPriceFull = formatRemoveComma(PriceFull);
    const checkPriceHalf = formatRemoveComma(PriceHalf);
    const checkPriceQuarter = formatRemoveComma(PriceQuarter);

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
    const { PriceFull, PriceHalf, PriceQuarter, error, isUpdate, isFirst } = this.state;

    if (!isUpdate) {
      if (Object.keys(space).length === 0) {
        // 新規登録画面でリロードされた場合、登録TOP画面にリダイレクト
        return <Redirect to={Path.createSpaceInfo()} />;
      }
    } else if (PriceFull && PriceHalf && PriceQuarter && isFirst) {
      // リロード時にvalidate実行する。
      this.handleChangeUI('PriceFull', PriceFull);
      this.handleChangeUI('PriceHalf', PriceHalf);
      this.handleChangeUI('PriceQuarter', PriceQuarter);
    }

    return (
      <MenuPageTemplate
        header={<Header />}
        headline="スペース料金の設定"
        leftContent={
          <EditSpaceInputPriceType
            edit={space.ID}
            priceFull={PriceFull}
            priceFullErrors={error.priceFull}
            onChangePriceFull={v => this.handleChangeUI('PriceFull', v)}
            priceHalf={PriceHalf}
            priceHalfErrors={error.priceHalf}
            onChangePriceHalf={v => this.handleChangeUI('PriceHalf', v)}
            priceQuarter={PriceQuarter}
            priceQuarterErrors={error.priceQuarter}
            onChangePriceQuarter={v => this.handleChangeUI('PriceQuarter', v)}
            onClickBack={this.onClickBack}
            onClickNext={this.onClickNext}
            onKeyDownButtonBack={this.onKeyDownButtonBack}
            onKeyDownButtonNext={this.onKeyDownButtonNext}
            buttonLoading={isLoading}
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
