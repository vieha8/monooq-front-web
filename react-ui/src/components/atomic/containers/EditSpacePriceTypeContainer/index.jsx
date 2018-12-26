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

class EditSpacePriceAllContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    checkLogin(this.props);

    const { space } = this.props;

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

  onClickNext: Function;
  onClickNext = () => {
    this.validate(() => {
      if (
        (this.state.error.priceQuarter || []).length === 0 &&
        (this.state.error.priceHalf || []).length === 0 &&
        (this.state.error.priceFull || []).length === 0
      ) {
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
      }
    });
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

    const nextPath = space.ID ? Path.editSpaceAreaSize(space.ID) : Path.createSpaceAreaSize();
    history.push(nextPath);
  };

  handleChangeUI: Function;
  handleChangeUI = (propName: string, value: any) => {
    const state = this.state;
    const error = state.error;
    const errors = [];

    state[propName] = value;
    error[propName] = errors;
    this.setState({ ...state, error });
  };

  validate: Function;
  validate = (valid: Function) => {
    const { PriceQuarter, PriceHalf, PriceFull, error } = this.state;

    const priceQuarterErrors = [];
    if (PriceQuarter < Validate.Price.Min) {
      priceQuarterErrors.push(ErrorMessage.PriceMin(Validate.Price.Min));
    }
    if (PriceQuarter > Validate.Price.Max) {
      priceQuarterErrors.push(ErrorMessage.PriceMax(Validate.Price.Max));
    }
    error.priceQuarter = priceQuarterErrors;

    const priceHalfErrors = [];
    if (PriceHalf < Validate.Price.Min) {
      priceHalfErrors.push(ErrorMessage.PriceMin(Validate.Price.Min));
    }
    if (PriceHalf > Validate.Price.Max) {
      priceHalfErrors.push(ErrorMessage.PriceMax(Validate.Price.Max));
    }
    error.priceHalf = priceHalfErrors;

    const priceFullErrors = [];
    if (PriceFull < Validate.Price.Min) {
      priceFullErrors.push(ErrorMessage.PriceMin(Validate.Price.Min));
    }
    if (PriceFull > Validate.Price.Max) {
      priceFullErrors.push(ErrorMessage.PriceMax(Validate.Price.Max));
    }
    error.priceFull = priceFullErrors;

    this.setState({ error }, valid);
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
        headline="スペースに対する料金の設定"
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
  EditSpacePriceAllContainer,
  mapStateToProps,
);
