// @flow

import React, { Component } from 'react';
import Path from 'config/path';
import { Redirect } from 'react-router-dom';

import { uiActions } from 'redux/modules/ui';
import { spaceActions } from 'redux/modules/space';

import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import Header from 'components/atomic/containers/Header';
import EditSpaceInputPriceType from 'components/atomic/LV3/EditSpace/InputPriceType';

import ErrorMessage from 'strings';

import { checkLogin, checkAuthState, mergeAuthProps } from '../AuthRequired';
import connect from '../connect';

const Validate = {
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

    checkLogin(this.props);

    const { space, dispatch } = this.props;
    const spaceId = props.match.params.space_id;
    if (spaceId) {
      dispatch(spaceActions.prepareUpdateSpace(spaceId));
    }

    this.state = {
      PriceQuarter: space.PriceQuarter || '',
      PriceHalf: space.PriceHalf || '',
      PriceFull: space.PriceFull || '',
      error: {},
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { space } = nextProps;
    if (space.ID && prevState.PriceFull === '') {
      const { PriceFull, PriceHalf, PriceQuarter } = space;
      return { PriceFull, PriceHalf, PriceQuarter };
    }
    return null;
  }

  onClickNext: Function;

  onClickNext = () => {
    const { dispatch, space, user } = this.props;
    const { PriceQuarter, PriceHalf, PriceFull } = this.state;

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

    if (space.ID) {
      dispatch(
        spaceActions.updateSpace({
          spaceId: space.ID,
          body: {
            userId: user.ID,
            ...saveSpace,
          },
        }),
      );
    } else {
      dispatch(spaceActions.createSpace({ body: { userId: user.ID, ...saveSpace } }));
    }
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
      priceErrors.push(ErrorMessage.PleaseInput);
    } else {
      if (!Number(value) || !String(value).match(Validate.Price.Num)) {
        priceErrors.push(ErrorMessage.PriceNumber);
      }
      if (value < Validate.Price.Min) {
        priceErrors.push(ErrorMessage.PriceMin(Validate.Price.Min));
      }
      if (value > Validate.Price.Max) {
        priceErrors.push(ErrorMessage.PriceMax(Validate.Price.Max));
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
    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

    const { space, isLoading, isCompleted } = this.props;
    const { PriceQuarter, PriceHalf, PriceFull, error } = this.state;

    if (!isLoading && isCompleted) {
      if (space.ID) {
        return <Redirect to={Path.editSpaceCompletion(space.ID)} />;
      }
      return <Redirect to={Path.createSpaceCompletion()} />;
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
            buttonLoading={isLoading}
            buttonDisabled={!this.validate()}
          />
        }
        rightContent={<ServiceMenu />}
      />
    );
  }
}

const mapStateToProps = state =>
  mergeAuthProps(state, {
    isCompleted: state.space.isComplete,
    user: state.auth.user || {},
    space: state.ui.space || {},
    isLoading: state.space.isLoading,
  });

export default connect(
  EditSpacePriceTypeContainer,
  mapStateToProps,
);
