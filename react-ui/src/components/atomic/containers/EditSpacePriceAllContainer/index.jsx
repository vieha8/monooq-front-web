// @flow

import React, { Component } from 'react';
import Path from 'config/path';
import { Redirect } from 'react-router-dom';

import { uiActions } from 'redux/modules/ui';
import { spaceActions } from 'redux/modules/space';

import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import Header from 'components/atomic/containers/Header';
import EditSpaceInputPriceAll from 'components/atomic/LV3/EditSpace/InputPriceAll';

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
      if ((this.state.error.price || []).length === 0) {
        const { dispatch, space, user } = this.props;
        const { PriceFull } = this.state;

        const saveSpace = Object.assign(space, {
          PriceFull,
          PriceHalf: 0,
          PriceQuarter: 0,
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
    const { PriceFull } = this.state;

    dispatch(
      uiActions.setUiState({
        space: Object.assign(space, {
          PriceFull,
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
    const { PriceFull, error } = this.state;

    const priceErrors = [];
    if (PriceFull < Validate.Price.Min) {
      priceErrors.push(ErrorMessage.PriceMin(Validate.Price.Min));
    }
    if (PriceFull > Validate.Price.Max) {
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
    const { PriceFull, error } = this.state;

    if (!isLoading && isCompleted) {
      if (space.ID) {
        return <Redirect to={Path.editSpaceCompletion(space.ID)} />;
      }
      return <Redirect to={Path.createSpaceCompletion()} />;
    }

    return (
      <MenuPageTemplate
        header={<Header />}
        headline="スペースの料金"
        leftContent={
          <EditSpaceInputPriceAll
            edit={space.ID}
            price={PriceFull}
            priceErrors={error.price}
            onChangePrice={v => this.handleChangeUI('PriceFull', v)}
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
