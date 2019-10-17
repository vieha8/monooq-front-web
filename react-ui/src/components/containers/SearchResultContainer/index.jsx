// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { parse } from 'helpers/query-string';
import InfiniteScroll from 'react-infinite-scroller';
import Loading from 'components/LV1/Loading';
import Path from 'config/path';

import ContentPageMenu from 'components/hocs/ContentPageMenu';
import SearchResultTemplate from 'components/templates/SearchResultTemplate';
import Button from 'components/LV1/Forms/Button';
import SearchResult from 'components/LV3/SearchResult';
import SpaceDataNone from 'components/LV3/SpaceDataNone';
import Meta from 'components/LV1/Meta';
import { H1 } from 'components/LV1/Texts/Headline';
import { Dimens } from 'variables';

import { spaceActions } from 'redux/modules/space';
import { iskeyDownEnter } from 'helpers/keydown';
import { getPrefecture } from 'helpers/prefectures';

import LoadingPage from 'components/LV3/LoadingPage';
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
  isSearching: boolean,
  spaces: Array<{
    id: number,
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

class SearchResultContainer extends Component<PropTypes> {
  constructor(props: PropTypes) {
    super(props);
    const { dispatch } = props;
    dispatch(spaceActions.resetSearch());

    const { location, match } = this.props;

    const state = {
      keyword: '',
      limit: 12,
      offset: 0,
      sort: 1,
    };

    if (!match.url.indexOf('/search')) {
      const { keyword } = parse(location.search);
      state.keyword = keyword;
    } else {
      const { pref_code: prefCode, city_code: cityCode, town_code: townCode } = match.params;
      state.prefCode = prefCode;
      state.cityCode = cityCode;
      state.townCode = townCode;
    }

    this.state = state;
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
    const { keyword, prefCode } = this.state;

    let condition = '';

    if (keyword !== '') {
      condition += `${keyword}、`;
    }

    if (prefCode !== '0') {
      condition += `${getPrefecture(parseInt(prefCode, 10))}、`;
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
    const { limit, offset, keyword, prefCode, cityCode, townCode, sort } = this.state;

    dispatch(
      spaceActions.doSearch({
        limit,
        offset,
        keyword,
        prefCode,
        cityCode,
        townCode,
        sort,
      }),
    );
    const newOffset = offset + limit;
    this.setState({ offset: newOffset });
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
            addressPref: s.addressPref,
            addressCity: s.addressCity,
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
      </Fragment>
    );
  };

  meta = condition => {
    return (
      <Meta title={`${condition}の検索結果 - モノオク`} description={`${condition}の検索結果`} />
    );
  };

  render() {
    const { spaces, isMore, maxCount, isSearching, breadcrumbs, area } = this.props;
    const condition = this.getCondition();

    if (isSearching && spaces.length === 0) {
      return <LoadingPage />;
    }

    if (spaces.length === 0 && !isMore) {
      return (
        <Fragment>
          <H1 bold>{`「${condition}」の検索結果 0件`}</H1>
          <SpaceDataNone
            captionHead="該当するスペースが見つかりませんでした"
            caption="別のキーワード及び条件で検索をお試しください"
            buttonText="条件を変えて再検索する"
            onClick={this.onClickBackSearchCondition}
            onKeyDown={this.onKeyDownButtonResearch}
          />
        </Fragment>
      );
    }

    return (
      <SearchResultTemplate
        isSearching={isSearching}
        meta={this.meta(condition)}
        searchResult={this.infiniteScroll()}
        options={this.options()}
        condition={condition}
        maxCount={maxCount}
        onClickMore={() => console.log('絞り込みボタン押下')}
        regionPrefectureList={[
          {
            region: '北海道・東北',
            prefectureList: [
              { name: '北海道', id: 1 },
              { name: '青森', id: 2 },
              { name: '岩手', id: 3 },
              { name: '宮城', id: 4 },
              { name: '秋田', id: 5 },
              { name: '山形', id: 6 },
              { name: '福島', id: 7 },
            ],
          },
          {
            region: '関東',
            prefectureList: [
              { name: '東京', id: 13 },
              { name: '神奈川', id: 14 },
              { name: '埼玉', id: 11 },
              { name: '千葉', id: 12 },
              { name: '茨城', id: 8 },
              { name: '群馬', id: 10 },
              { name: '栃木', id: 9 },
            ],
          },
          {
            region: '甲信越・北陸',
            prefectureList: [
              { name: '山梨', id: 19 },
              { name: '新潟', id: 15 },
              { name: '長野', id: 20 },
              { name: '富山', id: 16 },
              { name: '石川', id: 17 },
              { name: '福井', id: 18 },
            ],
          },
          {
            region: '東海',
            prefectureList: [
              { name: '愛知', id: 23 },
              { name: '岐阜', id: 21 },
              { name: '静岡', id: 22 },
              { name: '三重', id: 24 },
            ],
          },
          {
            region: '関西',
            prefectureList: [
              { name: '大阪', id: 27 },
              { name: '兵庫', id: 28 },
              { name: '京都', id: 26 },
              { name: '滋賀', id: 25 },
              { name: '奈良', id: 29 },
              { name: '和歌山', id: 30 },
            ],
          },
          {
            region: '四国',
            prefectureList: [
              { name: '徳島', id: 36 },
              { name: '香川', id: 37 },
              { name: '愛媛', id: 38 },
              { name: '高知', id: 39 },
            ],
          },
          {
            region: '中国',
            prefectureList: [
              { name: '鳥取', id: 31 },
              { name: '島根', id: 32 },
              { name: '岡山', id: 33 },
              { name: '広島', id: 34 },
              { name: '山口', id: 35 },
            ],
          },
          {
            region: '九州・沖縄',
            prefectureList: [
              { name: '福岡', id: 40 },
              { name: '佐賀', id: 41 },
              { name: '長崎', id: 42 },
              { name: '熊本', id: 43 },
              { name: '大分', id: 44 },
              { name: '宮崎', id: 45 },
              { name: '鹿児島', id: 46 },
              { name: '沖縄', id: 47 },
            ],
          },
        ]}
        breadcrumbsList={breadcrumbs}
        searchConditionCurrentList={[
          {
            title: '都道府県',
            value: '東京都',
          },
          {
            title: '市区町村',
            value: '渋谷区,新宿区,目黒区,千代田区,文京区,港区',
          },
          {
            title: '町域・エリア',
            value: '上原,恵比寿,神山町,笹塚,松濤,神宮前,神泉町,千駄ヶ谷',
          },
        ]}
        captionAreaPinList="人気エリアで探す"
        areaPinList={area}
        captionAreaAroundList="周辺エリアを含めて探す"
        areaAroundList={area}
        sortList={[
          {
            text: '新着順',
            path: '/',
            current: true,
          },
          {
            text: 'おすすめ',
            path: Path.signUp(),
          },
          {
            text: '安い順',
            path: Path.about(),
          },
        ]}
        prefecture="東京都"
        city="渋谷区,新宿区,目黒区,千代田区,文京区,港区"
        townArea="上原,恵比寿,神山町,笹塚,松濤,神宮前,神泉町,千駄ヶ谷"
        textButtonBottom="地域を絞り込む"
      />
    );
  }
}

const mapStateToProps = state => ({
  spaces: state.space.search.results,
  maxCount: state.space.search.maxCount,
  isSearching: state.space.search.isLoading,
  isMore: state.space.search.isMore,
  breadcrumbs: state.space.search.breadcrumbs,
  area: state.space.search.area,
});

export default ContentPageMenu(
  connect(
    SearchResultContainer,
    mapStateToProps,
  ),
  {
    maxWidth: 1168,
    bottomMarginOnlySP: true,
  },
);
