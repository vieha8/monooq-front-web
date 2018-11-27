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
      keyword: space.Keyword || '',
      prefCode: space.PrefCode || 0,
      priceMin: space.PriceMin || '',
      priceMax: space.PriceMax || '',
      type: space.Type || 0,
      isFurniture: space.IsFurniture || false,
      receiptType: space.ReceiptType || 0,
      error: {},
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onClickSearch: Function;

  onClickSearch = () => {
    const { keyword, prefCode, priceMin, priceMax, type, isFurniture, receiptType } = this.state;

    console.log(keyword, prefCode, priceMin, priceMax, type, isFurniture, receiptType);
  };

  handleChangeUI: Function;

  handleChangeUI = (propName: string, value: any) => {
    const { state } = this;
    const { error } = state;
    const errors = [];
    state[propName] = value;
    error[propName] = errors;
    this.setState({ ...state, error });
  };

  render() {
    const { space } = this.props;
    const {
      keyword,
      prefCode,
      priceMin,
      priceMax,
      type,
      isFurniture,
      receiptType,
      error,
    } = this.state;

    return (
      <MenuPageTemplate
        header={<Header />}
        headline="検索"
        leftContent={
          <SearchCondition
            edit={space.ID}
            keyword={keyword}
            keywordErrors={error.keyword}
            onChangeKeyword={v => this.handleChangeUI('keyword', v)}
            prefCode={prefCode}
            prefCodeErrors={error.prefCode}
            onChangePrefCode={v => this.handleChangeUI('prefCode', v)}
            priceMin={priceMin}
            priceMax={priceMax}
            priceErrors={error.price}
            onChangePriceMin={v => this.handleChangeUI('priceMin', v)}
            onChangePriceMax={v => this.handleChangeUI('priceMax', v)}
            type={type}
            typeErrors={error.type}
            onChangeType={v => this.handleChangeUI('type', v)}
            checkedFurniture={isFurniture}
            onClickFurniture={() => this.handleChangeUI('isFurniture', !isFurniture)}
            receive={receiptType}
            receiveErrors={error.receiptType}
            onChangeReceive={v => this.handleChangeUI('receiptType', v)}
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
