// @flow

import React, { Component } from 'react';
import Path from 'config/path';
import ReactGA from 'react-ga';
import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import Header from 'components/atomic/containers/Header';
import SearchCondition from 'components/atomic/LV3/SearchCondition';
import { searchActions } from 'redux/modules/search';
import connect from '../connect';

type PropTypes = {
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
    this.state = {
      keyword: '',
      prefCode: 0,
      priceMin: '',
      priceMax: '',
      type: 0,
      isFurniture: false,
      receiptType: 0,
      error: {},
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onClickSearch: Function;

  onClickSearch = () => {
    const { history, dispatch } = this.props;
    dispatch(searchActions.resetSearch());

    const { keyword, prefCode, priceMin, priceMax, type, isFurniture, receiptType } = this.state;
    const searchPath = Path.search();
    let query = `?keyword=${keyword}`;
    query += `&prefCode=${prefCode}`;
    query += `&priceMin=${priceMin}`;
    query += `&priceMax=${priceMax}`;
    query += `&type=${type}`;
    query += `&isFurniture=${isFurniture}`;
    query += `&receiptType=${receiptType}`;

    ReactGA.event({
      category: 'Search',
      action: 'Submit Condition Search Form',
      label: query,
    });

    history.push(`${searchPath}${query}`);
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
        headline="スペース検索"
        leftContent={
          <SearchCondition
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

export default connect(SearchConditionContainer);
