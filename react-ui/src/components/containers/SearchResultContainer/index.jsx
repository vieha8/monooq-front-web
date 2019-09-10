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
import Button from 'components/LV1/Forms/Button';
import SearchResult from 'components/LV3/SearchResult';
import SpaceDataNone from 'components/LV3/SpaceDataNone';
import ConciergeContents from 'components/LV2/IntroductionConcierge';
import Meta from 'components/LV1/Meta';
import { Dimens, FormValues } from 'variables';

import { spaceActions } from 'redux/modules/space';
import { iskeyDownEnter } from 'helpers/keydown';
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
    iD: number,
    images: Array<{
      ImageUrl: string,
    }>,
    addressTown: string,
    title: string,
    isFurniture: boolean,
    priceFull: number,
    priceHalf: number,
    priceQuarter: number,
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
      receiptType: receiptType || `${FormValues.typeReceiptNoSelect}`,
      type: type || `${FormValues.typeSpaceNoSelect}`,
      isFurniture: isFurniture || false,
      limit: 12,
      offset: 0,
    };
  }

  onClickBackSearchCondition = () => {
    const { history } = this.props;
    history.push(Path.searchCondition());
  };

  onKeyDownButtonResearch = e => {
    if (iskeyDownEnter(e)) {
      this.onClickBackSearchCondition();
    }
  };

  onClickSpace = (space: { id: number }) => {
    const { history } = this.props;
    history.push(Path.space(space.id));
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

    if (type !== `${FormValues.typeSpaceNoSelect}`) {
      // TODO タイプ管理の汎用関数作る
      if (type === `${FormValues.typeSpaceCloset}`) {
        condition += `クローゼット・押入れ、`;
      } else if (type === `${FormValues.typeSpaceRoom}`) {
        condition += `部屋、`;
      } else if (type === `${FormValues.typeSpaceWarehouse}`) {
        condition += `屋外倉庫、`;
      } else if (type === `${FormValues.typeSpaceOther}`) {
        condition += `その他、`;
      }
    }

    if (receiptType !== `${FormValues.typeReceiptNoSelect}`) {
      // TODO タイプ管理の汎用関数作る
      if (receiptType === `${FormValues.typeReceiptAll}`) {
        condition += `対面・配送受取対応、`;
      } else if (receiptType === `${FormValues.typeReceiptOnlyFTF}`) {
        condition += `対面受取のみ、`;
      } else if (receiptType === `${FormValues.typeReceiptOnlyDelivery}`) {
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

  leftContentPageNotFound = () => {
    return (
      <SpaceDataNone
        captionHead="該当するスペースが見つかりませんでした"
        caption="別のキーワード及び条件で検索をお試しください"
        buttonText="条件を変えて再検索する"
        onClick={this.onClickBackSearchCondition}
        onKeyDown={this.onKeyDownButtonResearch}
      />
    );
  };

  renderPageNotFound = () => {
    const condition = this.getCondition();
    return (
      <MenuPageTemplate
        header={<Header />}
        headline={`「${condition}」のスペース検索結果 0件`}
        leftContent={this.leftContentPageNotFound()}
        rightContent={<ServiceMenu />}
      />
    );
  };

  infiniteScroll = () => {
    const { spaces, isMore, history } = this.props;
    return (
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
            id: s.id,
            image: (s.images[0] || {}).imageUrl,
            title: s.title,
            address: `${s.addressPref}${s.addressCity}`,
            isFurniture: s.isFurniture,
            priceFull: s.priceFull,
            priceHalf: s.priceHalf,
            priceQuarter: s.priceQuarter,
            onClick: () => this.onClickSpace(s),
          }))}
        />
      </InfiniteScroll>
    );
  };

  options = () => {
    return (
      <Fragment>
        <SearchButtonWrap>
          <Button
            primary
            fontbold
            center
            onClick={this.onClickBackSearchCondition}
            onKeyDown={this.onKeyDownButtonResearch}
          >
            条件を変えて再検索する
          </Button>
        </SearchButtonWrap>
        <ConciergeContents />
      </Fragment>
    );
  };

  meta = condition => {
    return (
      <Meta
        title={`${condition}のスペース検索結果 - モノオク`}
        description={`${condition}のスペース検索結果`}
      />
    );
  };

  leftContent = condition => {
    const { isSearching } = this.props;
    return (
      <SearchResultTemplate
        isSearching={isSearching}
        meta={this.meta(condition)}
        searchResult={this.infiniteScroll()}
        options={this.options()}
      />
    );
  };

  render() {
    const { spaces, isMore, maxCount } = this.props;

    if (spaces.length === 0 && !isMore) {
      return this.renderPageNotFound();
    }

    const condition = this.getCondition();
    return (
      <MenuPageTemplate
        header={<Header />}
        headline={`「${condition}」のスペース検索結果${maxCount}件`}
        leftContent={this.leftContent(condition)}
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
