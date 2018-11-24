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

class HomeContainer extends Component<PropTypes, State> {
  constructor(props: PropTypes) {
    super(props);

    const { location } = props;
    const query = parse(location.search);

    this.state = {
      location: query.location,
      limit: 6,
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

    // TODO: サンプルデータ。実装後削除するようお願いいたします。
    const sampleData = {
      ID: 269,
      Title: 'aaa',
      Address: '東京都世田谷区南烏山1-15-15 ロイヤルフラッツ芦花101',
      AddressPref: '東京都',
      AddressCity: '世田谷区',
      AddressTown: '南烏山',
      IsFurniture: false,
      PriceFull: 10000,
      PriceHalf: 0,
      PriceQuarter: 0,
      Images: [
        {
          ImageUrl:
            'https://monooq-dev.imgix.net/img%2Fspaces%2F261%2F1542854642235.jpg?alt=media&token=72c645e0-2c74-4e37-88f9-e59d2a55330a&fit=crop&w=240&max-h=180&format=auto&fit=crop&w=240&max-h=180&format=auto&fit=crop&w=350&max-h=200&format=auto',
        },
      ],
    };
    let sampleDataList = [];
    for (let i = 0; i < 6; i++) {
      sampleDataList.push(sampleData);
    }
    // TODO: サンプルデータここまで

    return (
      <MenuPageTemplate
        header={<Header />}
        leftContent={
          <Fragment>
            <SearchResultTemplate
              searchResult={
                <InfiniteScroll
                  // TODO: hasMoreを固定falseにしてあります。
                  pageStart={0}
                  loadMore={this.loadItems}
                  hasMore={false}
                  loader={<Loader size="medium" key={0} />}
                  initialLoad
                >
                  <SearchResult
                    // TODO: 取得するスペーズに併せて加工する。
                    // TODO: もっとみるボタンの遷移先を渡すようにしたほうがいいかも。
                    caption="広さが6畳以上あるスペース"
                    spaces={sampleDataList.map(s => ({
                      image: (s.Images[0] || {}).ImageUrl,
                      title: s.Title,
                      address: `${s.AddressPref}${s.AddressCity}`,
                      isFurniture: s.IsFurniture,
                      priceFull: s.PriceFull,
                      priceHalf: s.PriceHalf,
                      priceQuarter: s.PriceQuarter,
                      onClick: () => this.onClickSpace(s),
                    }))}
                    isMoreButton
                  />
                  <SearchResult
                    // TODO: 取得するスペーズに併せて加工する。
                    // TODO: もっとみるボタンの遷移先を渡すようにしたほうがいいかも。
                    caption="広さが6畳以上あるスペース"
                    spaces={sampleDataList.map(s => ({
                      image: (s.Images[0] || {}).ImageUrl,
                      title: s.Title,
                      address: `${s.AddressPref}${s.AddressCity}`,
                      isFurniture: s.IsFurniture,
                      priceFull: s.PriceFull,
                      priceHalf: s.PriceHalf,
                      priceQuarter: s.PriceQuarter,
                      onClick: () => this.onClickSpace(s),
                    }))}
                    isMoreButton
                  />
                </InfiniteScroll>
              }
              noTopMargin
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
  HomeContainer,
  mapStateToProps,
);
