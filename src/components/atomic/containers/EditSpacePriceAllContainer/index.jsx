// @flow

import React, { Component } from 'react';
import Path from 'config/path';
import { Redirect } from 'react-router-dom';

import { uiActions } from 'redux/modules/ui';
import { spaceActions } from 'redux/modules/space';

import EditSpaceTemplate from 'components/atomic/templates/EditSpaceTemplate';
import Header from 'components/atomic/containers/Header';
import EditSpaceInputPriceAll from 'components/atomic/organisms/EditSpace/InputPriceAll';
import EditStatus from 'components/atomic/organisms/EditSpace/Status';

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
      price: space.priceFull || '',
      error: {},
    };
  }

  onClickNext: Function;
  onClickNext = () => {
    this.validate(() => {
      if ((this.state.error.price || []).length === 0) {
        const { dispatch, space } = this.props;
        const { price } = this.state;

        const saveSpace = Object.assign(space, {
          priceFull: price,
          priceHalf: 0,
          priceQuarter: 0,
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
    const { price } = this.state;

    dispatch(
      uiActions.setUiState({
        space: Object.assign(space, {
          priceFull: price,
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
    const { price, error } = this.state;

    const priceErrors = [];
    if (price < Validate.Price.Min) {
      priceErrors.push(ErrorMessage.PriceMin(Validate.Price.Min));
    }
    if (price > Validate.Price.Max) {
      priceErrors.push(ErrorMessage.PriceMax(Validate.Price.Max));
    }
    error.price = priceErrors;

    this.setState({ error }, valid);
  };

  render() {
    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

    const { space, isLoading, isCompleted } = this.props;
    const { price, error } = this.state;

    if (!space.title) {
      return <Redirect to={Path.createSpaceInfo()} />;
    }

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
          <EditSpaceInputPriceAll
            price={price}
            priceErrors={error.price}
            onChangePrice={v => this.handleChangeUI('price', v)}
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
    space: state.ui.space || {},
    isLoading: state.space.isLoading,
  });

export default connect(EditSpacePriceAllContainer, mapStateToProps);
