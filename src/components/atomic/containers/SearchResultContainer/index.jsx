// @flow

import React, { Component, Fragment } from 'react';
import queryString from 'helpers/query-string';
import InfiniteScroll from 'react-infinite-scroller';
import Loading from 'components/atomic/LV1/Loading';
import Path from 'config/path';

import SearchResultTemplate from 'components/atomic/templates/SearchResult';
import Header from 'components/atomic/containers/Header';
import Footer from 'components/atomic/LV2/Footer';
import SearchResult from 'components/atomic/LV3/SearchResult';
import SearchNotFound from 'components/atomic/LV3/SearchNotFound';

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
  search: string,
};

class SearchResultContainer extends Component<PropTypes, State> {
  constructor(props: PropTypes) {
    super(props);

    const { location, dispatch } = props;

    const query = queryString.parse(location.search);
    dispatch(
      searchActions.fetchStartSearch({ location: query.location || '', limit: 5, offset: 0 }),
    );

    this.state = {
      location: query.location,
      search: '',
      hasMoreItems: true,
      items: [],
    };

    this.loadItems = this.loadItems.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onClickSpace: Function;
  onClickSpace = (space: { ID: number }) => {
    const { history } = this.props;
    history.push(Path.space(space.ID));
  };

  research: Function;
  research = () => {
    const { search } = this.state;
    if (window && window.location) {
      window.location.href = `${Path.search()}?location=${search}`;
    }
  };

  onKeyDownSearchField: Function;
  onKeyDownSearchField = e => {
    if (e && e.keyCode === 13 && e.target.value) {
      this.research();
    }
  };

  renderNotFound = () => {
    const { search } = this.state;

    return (
      <SearchNotFound
        locationText={search}
        onChangeLocation={value => {
          this.setState({ search: value });
        }}
        onClickSearchButton={this.research}
        onKeyDownSearchField={this.onKeyDownSearchField}
      />
    );
  };

  // reloadSearchResult = () => {
  //   const { dispatch } = this.props;
  //   dispatch(searchActions.fetchStartSearch({ location: '東京都' || '', limit: 5, offset: 0 }));
  // };

  // ローディング処理
  loadItems() {
    const current_item_count = this.state.items.length;
    const max_items = 300;
    const page_item_size = 50;

    if (current_item_count < max_items) {
      const new_ids = Array.from(Array(page_item_size).keys()).map(num => {
        return num + current_item_count;
      });
      const new_items = new_ids.map(id => {
        return { id: id };
      });

      setTimeout(() => {
        this.setState({ items: this.state.items.concat(new_items) });
      }, 500); // add some delay for demo purpose
    } else {
      this.setState({ hasMoreItems: false });
    }
  }

  render() {
    const { spaces, isSearching } = this.props;
    const { location } = this.state;

    if (!isSearching && spaces.length === 0) {
      return this.renderNotFound();
    }

    // item読み込み
    const items = this.state.items.map(item => {
      return <div>{item.id}</div>;
    });

    return (
      <Fragment>
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

        <div className="App">
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>

          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadItems}
            hasMore={this.state.hasMoreItems}
            loader={<div>Loading...</div>}
            initialLoad={true}
          >
            {items}
          </InfiniteScroll>
        </div>
        {/* <InfiniteScroll
          pageStart={0}
          loadMore={this.reloadSearchResult()}
          hasMore={false}
          initialLoad={true}
          loader={<Loading size="large" />}
        >
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
        </InfiniteScroll> */}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
  isSearching: state.search.isLoading,
  search: state.search,
  spaces: state.search.spaces,
  ui: state.ui,
});

export default connect(
  SearchResultContainer,
  mapStateToProps,
);
