// @flow

import React, { Component } from 'react';
import queryString from 'query-string';

import Path from 'config/path';

import SearchResultTemplate from 'components/atomic/templates/SearchResult';
import Header from 'components/atomic/organisms/Header';
import Footer from 'components/atomic/molecules/Footer';
import SearchResult from 'components/atomic/organisms/SearchResult';

import { searchActions } from 'redux/modules/search';

import connect from '../connect';

type PropTypes = {
  dispatch: Function,
  history: {
    push: Function,
  },
  location: {
    search: string,
  },
  spaces: Array<{
    ID: number,
    Images: Array<{
      ImageUrl: string,
    }>,
    AddressTown: string,
    Title: string,
    IsFurniture: boolean,
    PriceFull: number,
    PriceHalf: number,
    PriceQuarter: number,
  }>
}

type State = {
  location: string,
}

class SearchResultContainer extends Component<PropTypes, State> {
  constructor(props: PropTypes) {
    super(props);

    const { location, dispatch } = props;

    const query = queryString.parse(location.search);
    dispatch(searchActions.fetchStartSearch({ location: query.location || '' }));

    this.state = {
      location: query.location,
    };
  }

  onClickSpace: Function;
  onClickSpace = (space: { ID: number }) => {
    const { history } = this.props;
    history.push(Path.space(space.ID));
  }

  render() {
    const { spaces } = this.props;
    const { location } = this.state;

    return (
      <SearchResultTemplate
        headline1={`${location}のスペース`}
        caption="荷物の量と期間によって最適な料金をホストが提示してくれます。長期間の物置きとして便利です。"
        searchResult={
          <SearchResult
            spaces={spaces.map(s => ({
              image: (s.Images[0] || {}).ImageUrl,
              title: s.Title,
              addressTown: s.AddressTown,
              isFurniture: s.IsFurniture,
              priceFull: s.PriceFull,
              priceHalf: s.PriceHalf,
              priceQuarter: s.PriceQuarter,
              onClick: () => this.onClickSpace(s),
            }))}
          />
        }
        header={<Header />}
        footer={<Footer />}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
  search: state.search,
  spaces: state.search.spaces,
  ui: state.ui,
});

export default connect(SearchResultContainer, mapStateToProps);
