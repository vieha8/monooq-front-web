// @flow

import React, { Component } from 'react';
import Path from 'config/path';

import { uiActions } from 'redux/modules/ui';
import { spaceActions } from 'redux/modules/space';

import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import Header from 'components/atomic/containers/Header';
import SearchCondition from 'components/atomic/LV3/SearchCondition';

import { ErrorMessage } from 'strings';

import { checkLogin, checkAuthState, mergeAuthProps } from '../AuthRequired';
import connect from '../connect';

type PropTypes = {
  dispatch: Function,
  history: {
    push: Function,
  },
  space: {
    ID: number,
  },
};

class SearchConditionContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    checkLogin(this.props);

    const { dispatch, space } = this.props;

    dispatch(spaceActions.prepareUpdateSpace());

    this.state = {
      Keyword: space.Keyword || '',
      PrefCode: space.PrefCode || 0,
      PriceMin: space.PriceMin || '',
      PriceMax: space.PriceMax || '',
      Type: space.Type || 0,
      IsFurniture: space.IsFurniture || false,
      ReceiptType: space.ReceiptType || 0,
      error: {},
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onClickSearch: Function;
  onClickSearch = () => {
    this.validate(() => {
      if (
        (this.state.error.keyword || []).length === 0 &&
        (this.state.error.prefCode || []).length === 0 &&
        (this.state.error.price || []).length === 0 &&
        (this.state.error.type || []).length === 0
      ) {
        const { dispatch, history, space } = this.props;
        const { Keyword, PrefCode, Type } = this.state;

        // dispatch(
        //   uiActions.setUiState({
        //     space: Object.assign(space, {
        //       Title,
        //       Type: parseInt(Type, 10),
        //       Introduction,
        //       Address,
        //     }),
        //   }),
        // );

        // const nextPath = space.ID ? Path.editSpaceBaggage(space.ID) : Path.createSpaceBaggage();
        // history.push(nextPath);
      }
    });
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
    const { Keyword, PrefCode, PriceMin, PriceMax, Type, error } = this.state;

    const keywordErrors = [];
    if (Keyword.length === 0) {
      keywordErrors.push(ErrorMessage.PleaseInput);
    }
    error.keyword = keywordErrors;

    const prefCodeErrors = [];
    if (`${PrefCode}` === '0') {
      prefCodeErrors.push(ErrorMessage.PleaseSelect);
    }
    error.prefCode = prefCodeErrors;

    const priceErrors = [];
    if (PriceMin.length === 0) {
      priceErrors.push(ErrorMessage.PleaseInput);
    }
    if (PriceMax.length === 0) {
      priceErrors.push(ErrorMessage.PleaseInput);
    }
    error.price = priceErrors;

    const typeErrors = [];
    if (`${Type}` === '0') {
      typeErrors.push(ErrorMessage.PleaseSelect);
    }
    error.type = typeErrors;

    this.setState({ error }, valid);
  };

  render() {
    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

    const { space } = this.props;
    const {
      Keyword,
      PrefCode,
      PriceMin,
      PriceMax,
      Type,
      IsFurniture,
      ReceiptType,
      error,
    } = this.state;

    return (
      <MenuPageTemplate
        header={<Header />}
        headline="検索"
        leftContent={
          <SearchCondition
            edit={space.ID}
            keyword={Keyword}
            keywordErrors={error.keyword}
            onChangeKeyword={v => this.handleChangeUI('Keyword', v)}
            prefCode={PrefCode}
            prefCodeErrors={error.prefCode}
            onChangePrefCode={v => this.handleChangeUI('PrefCode', v)}
            priceMin={PriceMin}
            priceMax={PriceMax}
            priceErrors={error.price}
            onChangePriceMin={v => this.handleChangeUI('PriceMin', v)}
            onChangePriceMax={v => this.handleChangeUI('PriceMax', v)}
            type={Type}
            typeErrors={error.type}
            onChangeType={v => this.handleChangeUI('Type', v)}
            checkedFurniture={IsFurniture}
            onClickFurniture={() => this.handleChangeUI('IsFurniture', !IsFurniture)}
            receive={ReceiptType}
            receiveErrors={error.receiptType}
            onChangeReceive={v => this.handleChangeUI('ReceiptType', v)}
            onClickSearch={this.onClickSearch}
          />
        }
        rightContent={<ServiceMenu />}
      />
    );
  }
}

const mapStateToProps = state =>
  mergeAuthProps(state, {
    space: state.ui.space || {},
  });

export default connect(
  SearchConditionContainer,
  mapStateToProps,
);
