// @flow

import React, { Component } from 'react';
import Path from 'config/path';

import { uiActions } from 'redux/modules/ui';
import { spaceActions } from 'redux/modules/space';

import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import Header from 'components/containers/Header';
import EditSpaceInputPriceType from 'components/LV3/EditSpace/InputPriceType';

import { ErrorMessages } from 'variables';

import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';

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
    if (spaceId) {
      dispatch(spaceActions.prepareUpdateSpace(spaceId));
    } else {
      dispatch(spaceActions.getGeocode({ address: space.Address }));
    }

    this.state = {
      PriceQuarter: space.PriceQuarter || '',
      PriceHalf: space.PriceHalf || '',
      PriceFull: space.PriceFull || '',
      error: {},
    };
  }

  handleBeforeUnload(e) {
    e.preventDefault();
    e.returnValue = 'データが保存されませんが、よろしいですか?';
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { space } = nextProps;
    if (space.ID && !prevState.ID) {
      const { PriceFull, PriceHalf, PriceQuarter, ID } = space;
      return { PriceFull, PriceHalf, PriceQuarter, ID };
    }
    return null;
  }

  onClickNext: Function;

  onClickNext = () => {
    const { dispatch, space, history, match } = this.props;
    const { PriceQuarter, PriceHalf, PriceFull } = this.state;

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
      PriceFull,
      PriceHalf,
      PriceQuarter,
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
    const { PriceQuarter, PriceHalf, PriceFull } = this.state;

    dispatch(
      uiActions.setUiState({
        space: Object.assign(space, {
          PriceFull,
          PriceHalf,
          PriceQuarter,
        }),
      }),
    );

    const nextPath = space.ID ? Path.editSpaceReceive(space.ID) : Path.createSpaceReceive();
    history.push(nextPath);
  };

  handleChangeUI: Function;

  handleChangeUI = (propName: string, value: any) => {
    const state = this.state;
    const error = state.error;
    const errors = [];

    const priceErrors = [];
    if (value.length === 0) {
      priceErrors.push(ErrorMessages.PleaseInput);
    } else {
      if (!Number(value) || !String(value).match(Validate.Price.Num)) {
        priceErrors.push(ErrorMessages.PriceNumber);
      }
      if (value < Validate.Price.Min) {
        priceErrors.push(ErrorMessages.PriceMin(Validate.Price.Min));
      }
      if (value > Validate.Price.Max) {
        priceErrors.push(ErrorMessages.PriceMax(Validate.Price.Max));
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

    state[propName] = value;
    error[propName] = errors;
    this.setState({ ...state, error });
  };

  validate: Function;

  validate = () => {
    const state = this.state;

    return (
      state.PriceFull &&
      state.PriceFull >= Validate.Price.Min &&
      state.PriceFull <= Validate.Price.Max &&
      state.PriceHalf &&
      state.PriceHalf >= Validate.Price.Min &&
      state.PriceHalf <= Validate.Price.Max &&
      state.PriceQuarter &&
      state.PriceQuarter >= Validate.Price.Min &&
      state.PriceQuarter <= Validate.Price.Max
    );
  };

  render() {
    const { space, isLoading } = this.props;
    const { PriceQuarter, PriceHalf, PriceFull, error } = this.state;

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
            buttonLoading={isLoading}
            buttonDisabled={!this.validate()}
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

export default authRequired(connect(mapStateToProps)(EditSpacePriceTypeContainer));
