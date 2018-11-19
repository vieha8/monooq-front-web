// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { parse } from 'helpers/query-string';
import InfiniteScroll from 'react-infinite-scroller';
import Loading from 'components/atomic/LV1/Loading';
import Path from 'config/path';

import SearchResultTemplate from 'components/atomic/templates/SearchResult';
import Header from 'components/atomic/containers/Header';
import SearchResult from 'components/atomic/LV3/SearchResult';
import SearchNotFound from 'components/atomic/LV3/SearchNotFound';
import Meta from 'components/Meta';
import { Dimens } from 'variables';

import { searchActions } from 'redux/modules/search';

import connect from '../connect';

const Loader = styled(Loading)`
  margin: ${Dimens.medium2}px auto auto;
  text-align: center;
`;

type PropTypes = {
  dispatch: Function,
  history: {
    push: Function,
  },
  location: {
    search: string,
  },
  isSearching: boolean,
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
  }>,
};

type State = {
  location: string,
};

class SearchResultContainer extends Component<PropTypes, State> {
  constructor(props: PropTypes) {
    super(props);

    const { location } = props;
    const query = parse(location.search);

    this.state = {
      location: query.location,
      limit: 12,
      offset: 0,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onClickSpace = (space: { ID: number }) => {
    const { history } = this.props;
    history.push(Path.space(space.ID));
  };

  onKeyDownSearchField = e => {
    if (e && e.keyCode === 13 && e.target.value) {
      this.research();
    }
  };

  research = () => {
    const { search } = this.state;
    if (window && window.location) {
      window.location.href = `${Path.search()}?location=${search}`;
    }
  };

  renderNotFound = () => {
    const { search } = this.state;

    return (
      <SearchNotFound
        header={<Header />}
        locationText={search}
        onChangeLocation={value => {
          this.setState({ search: value });
        }}
        onClickSearchButton={this.research}
        onKeyDownSearchField={this.onKeyDownSearchField}
      />
    );
  };

  // ローディング処理
  loadItems = () => {
    const { dispatch, isSearching } = this.props;
    if (isSearching) {
      return;
    }
    const { location, limit, offset } = this.state;
    dispatch(searchActions.doSearch({ location, limit, offset }));
    const newOffset = offset + limit;
    this.setState({ offset: newOffset });
  };

  render() {
    const { spaces, isMore } = this.props;
    const { location } = this.state;

    if (spaces.length === 0 && !isMore) {
      return this.renderNotFound();
    }

    const caption =
      '荷物の量と期間によって最適な料金をホストが提示してくれます。長期間の物置きとして便利です。';

    return (
      <Fragment>
        <SearchResultTemplate
          meta={<Meta title={`${location}のスペース検索結果 | モノオク`} />}
          headline1={`${location}のスペース`}
          caption={caption}
          searchResult={
            <InfiniteScroll
              pageStart={0}
              loadMore={this.loadItems}
              hasMore={isMore}
              loader={<Loader size="medium" key={0} />}
              initialLoad
            >
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
            </InfiniteScroll>
          }
          header={<Header />}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  spaces: state.search.spaces,
  isSearching: state.search.isLoading,
  isMore: state.search.isMore,
});

export default connect(
  SearchResultContainer,
  mapStateToProps,
);
