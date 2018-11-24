// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { parse } from 'helpers/query-string';
import InfiniteScroll from 'react-infinite-scroller';
import Loading from 'components/atomic/LV1/Loading';
import Path from 'config/path';

import SearchResultTemplate from 'components/atomic/templates/SearchResult';
import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import Header from 'components/atomic/containers/Header';
import SearchResult from 'components/atomic/LV3/SearchResult';
import NoDataView from 'components/atomic/LV3/NoDataView';
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

  renderNotFound = () => {
    const { history, location } = this.state;

    return (
      <MenuPageTemplate
        header={<Header />}
        headline={`「${location}」の検索結果0件`}
        leftContent={
          <NoDataView
            captionHead="検索結果がありませんでした"
            caption="キーワードが該当しませんでした。別のキーワードで再度検索をお願いします。"
            buttonText="再度検索する"
            // TODO: 検索画面作成後にURL設定
            onClick={() => history.push(Path.top())}
          />
        }
        rightContent={<ServiceMenu />}
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

    return (
      <MenuPageTemplate
        header={<Header />}
        headline={`「${location}」の検索結果${spaces.length}件`}
        leftContent={
          <Fragment>
            <SearchResultTemplate
              meta={<Meta title={`${location}のスペース検索結果 | モノオク`} />}
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
                      address: `${s.AddressPref}${s.AddressCity}`,
                      isFurniture: s.IsFurniture,
                      priceFull: s.PriceFull,
                      priceHalf: s.PriceHalf,
                      priceQuarter: s.PriceQuarter,
                      onClick: () => this.onClickSpace(s),
                    }))}
                  />
                </InfiniteScroll>
              }
            />
          </Fragment>
        }
        rightContent={<ServiceMenu />}
      />
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
