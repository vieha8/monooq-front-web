// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { parse } from 'helpers/query-string';
import InfiniteScroll from 'react-infinite-scroller';
import Loading from 'components/LV1/Loading';
import Path from 'config/path';

import SearchResultTemplate from 'components/templates/SearchResultTemplate';
import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import Header from 'components/containers/Header';
import Button from 'components/LV1/Button';
import SearchResult from 'components/LV3/SearchResult';
import NoDataView from 'components/LV3/NoDataView';
import ConciergeContents from 'components/LV2/ConciergeIntroduction';
import Meta from 'components/LV1/Meta';
import { Dimens } from 'variables';

import { spaceActions } from 'redux/modules/space';
import { getPrefecture } from 'helpers/prefectures';

import connect from '../connect';

const Loader = styled(Loading)`
  margin: ${Dimens.medium2}px auto auto;
  text-align: center;
`;

const SearchButtonWrap = styled.div`
  margin-top: 40px;
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

    const { location, dispatch } = props;
    const query = parse(location.search);
    const { keyword, prefCode, priceMin, priceMax, receiptType, type, isFurniture } = query;

    dispatch(spaceActions.resetSearch());

    this.state = {
      keyword: keyword || '',
      prefCode: prefCode || '0',
      priceMin: priceMin || '',
      priceMax: priceMax || '',
      receiptType: receiptType || '0',
      type: type || '0',
      isFurniture: isFurniture || false,
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

  getCondition = () => {
    const { keyword, prefCode, priceMin, priceMax, receiptType, type, isFurniture } = this.state;

    let condition = '';

    if (keyword !== '') {
      condition += `${keyword}、`;
    }

    if (prefCode !== '0') {
      condition += `${getPrefecture(parseInt(prefCode, 10))}、`;
    }

    if (type !== '0') {
      // TODO タイプ管理の汎用関数作る
      if (type === '1') {
        condition += `クローゼット・押入れ、`;
      } else if (type === '3') {
        condition += `部屋、`;
      } else if (type === '4') {
        condition += `野外倉庫、`;
      } else if (type === '5') {
        condition += `その他`;
      }
    }

    if (receiptType !== '0') {
      // TODO タイプ管理の汎用関数作る
      if (receiptType === '1') {
        condition += `対面・配送受取対応、`;
      } else if (receiptType === '2') {
        condition += `対面受取のみ、`;
      } else if (receiptType === '3') {
        condition += `配送受取のみ、`;
      }
    }

    if (priceMin !== '') {
      condition += `${priceMin}円以上、`;
    }

    if (priceMax !== '') {
      condition += `${priceMax}円以下、`;
    }

    if (isFurniture === 'true') {
      condition += `家具家電可、`;
    }

    condition = condition.slice(0, -1);

    if (condition === '') {
      condition = 'すべて';
    }

    return condition;
  };

  renderNotFound = () => {
    const { history } = this.props;

    const condition = this.getCondition();

    return (
      <MenuPageTemplate
        header={<Header />}
        headline={`「${condition}」のスペース検索結果 0件`}
        leftContent={
          <NoDataView
            captionHead="検索結果がありませんでした"
            caption="キーワードが該当しませんでした。別のキーワードで再度検索をお願いします。"
            buttonText="再度検索する"
            onClick={() => history.push(Path.searchCondition())}
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
    const {
      limit,
      offset,
      keyword,
      prefCode,
      priceMin,
      priceMax,
      receiptType,
      type,
      isFurniture,
    } = this.state;

    dispatch(
      spaceActions.doSearch({
        limit,
        offset,
        keyword,
        prefCode,
        priceMin,
        priceMax,
        receiptType,
        type,
        isFurniture,
      }),
    );
    const newOffset = offset + limit;
    this.setState({ offset: newOffset });
  };

  render() {
    const { spaces, isMore, history, maxCount, isSearching } = this.props;
    if (spaces.length === 0 && !isMore) {
      return this.renderNotFound();
    }

    const condition = this.getCondition();

    return (
      <MenuPageTemplate
        header={<Header />}
        headline={`「${condition}」のスペース検索結果${maxCount}件`}
        leftContent={
          <SearchResultTemplate
            isSearching={isSearching}
            meta={<Meta title={`${condition}のスペース検索結果 | モノオク`} />}
            searchResult={
              <InfiniteScroll
                pageStart={0}
                loadMore={this.loadItems}
                hasMore={isMore}
                loader={<Loader size="medium" key={0} />}
                initialLoad
              >
                <SearchResult
                  history={history}
                  spaces={spaces.map(s => ({
                    id: s.ID,
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
            options={
              <Fragment>
                <SearchButtonWrap>
                  <Button
                    primary
                    fontbold
                    center
                    onClick={() => history.push(Path.searchCondition())}
                  >
                    条件を変えて再検索する
                  </Button>
                </SearchButtonWrap>
                <ConciergeContents />
              </Fragment>
            }
          />
        }
        rightContent={<ServiceMenu />}
      />
    );
  }
}

const mapStateToProps = state => ({
  spaces: state.space.spaces,
  maxCount: state.space.maxCount,
  isSearching: state.space.isLoading,
  isMore: state.space.isMore,
});

export default connect(
  SearchResultContainer,
  mapStateToProps,
);
