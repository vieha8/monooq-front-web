// @flow

import React, { Component } from 'react';
import Path from 'config/path';
import { Redirect } from 'react-router-dom';

import { uiActions } from 'redux/modules/ui';
import { spaceActions } from 'redux/modules/space';

import EditSpaceTemplate from 'components/atomic/templates/EditSpaceTemplate';
import Header from 'components/atomic/containers/Header';
import EditSpaceInputPriceType from 'components/atomic/LV3/EditSpace/InputPriceType';
import EditStatus from 'components/atomic/LV3/EditSpace/Status';

import { ErrorMessage } from 'strings';

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
      priceQuarter: space.priceQuarter || '',
      priceHalf: space.priceHalf || '',
      priceFull: space.priceFull || '',
      error: {},
    };
  }

  onClickNext: Function;
  onClickNext = () => {
    this.validate(() => {
      if (
        (this.state.error.priceQuarter || []).length === 0 &&
        (this.state.error.priceHalf || []).length === 0 &&
        (this.state.error.priceFull || []).length === 0
      ) {
        const { dispatch, space } = this.props;
        const { priceQuarter, priceHalf, priceFull } = this.state;

        const saveSpace = Object.assign(space, {
          priceFull,
          priceHalf,
          priceQuarter,
        });
        dispatch(
          uiActions.setUiState({
            space: saveSpace,
          }),
        );

        if (space.ID) {
          dispatch(spaceActions.updateSpace({ spaceId: space.ID, body: saveSpace }));
        } else {
          dispatch(spaceActions.createSpace({ body: saveSpace }));
        }
      }
    });
  };

  onClickBack: Function;
  onClickBack = () => {
    const { dispatch, history, space } = this.props;
    const { priceQuarter, priceHalf, priceFull } = this.state;

    dispatch(
      uiActions.setUiState({
        space: Object.assign(space, {
          priceFull,
          priceHalf,
          priceQuarter,
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
    const { priceQuarter, priceHalf, priceFull, error } = this.state;

    const priceQuarterErrors = [];
    if (priceQuarter < Validate.Price.Min) {
      priceQuarterErrors.push(ErrorMessage.PriceMin(Validate.Price.Min));
    }
    if (priceQuarter > Validate.Price.Max) {
      priceQuarterErrors.push(ErrorMessage.PriceMax(Validate.Price.Max));
    }
    error.priceQuarter = priceQuarterErrors;

    const priceHalfErrors = [];
    if (priceHalf < Validate.Price.Min) {
      priceHalfErrors.push(ErrorMessage.PriceMin(Validate.Price.Min));
    }
    if (priceHalf > Validate.Price.Max) {
      priceHalfErrors.push(ErrorMessage.PriceMax(Validate.Price.Max));
    }
    error.priceHalf = priceHalfErrors;

    const priceFullErrors = [];
    if (priceFull < Validate.Price.Min) {
      priceFullErrors.push(ErrorMessage.PriceMin(Validate.Price.Min));
    }
    if (priceFull > Validate.Price.Max) {
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

    if (!space.title) {
      return <Redirect to={Path.createSpaceInfo()} />;
    }

    const { priceQuarter, priceHalf, priceFull, error } = this.state;

    if (isCompleted) {
      if (space.ID) {
        return <Redirect to={Path.editSpaceCompletion(space.ID)} />;
      }
      return <Redirect to={Path.createSpaceCompletion()} />;
    }

    return (
      <EditSpaceTemplate
        header={<Header />}
        leftContent={
          <EditSpaceInputPriceType
            priceQuarter={priceQuarter}
            priceQuarterErrors={error.priceQuarter}
            onChangePriceQuarter={v => this.handleChangeUI('priceQuarter', v)}
            priceHalf={priceHalf}
            priceHalfErrors={error.priceHalf}
            onChangePriceHalf={v => this.handleChangeUI('priceHalf', v)}
            priceFull={priceFull}
            priceFullErrors={error.priceFull}
            onChangePriceFull={v => this.handleChangeUI('priceFull', v)}
            onClickBack={this.onClickBack}
            onClickNext={this.onClickNext}
            buttonLoading={isLoading}
          />
        }
        rightContent={
          <EditStatus
            edit={space.ID}
            step={3}
            hintTitle="料金設定に関するヒント"
            hintContent={[
              '荷物が思っていたよりも大きかったなど、荷物が届いた後でも柔軟に対応できる料金設定をしましょう。',
            ]}
          />
        }
      />
    );
  }
}

const mapStateToProps = state =>
  mergeAuthProps(state, {
    isCompleted: state.space.isComplete,
    space: state.ui.space || {},
    isLoading: state.space.isLoading,
  });

export default connect(EditSpacePriceAllContainer, mapStateToProps);
