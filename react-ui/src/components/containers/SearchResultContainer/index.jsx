// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { parse } from 'helpers/query-string';
import InfiniteScroll from 'react-infinite-scroller';
import Loading from 'components/LV1/Loading';
import Path from 'config/path';

import ContentPageMenu from 'components/hocs/ContentPageMenu';
import SearchResultTemplate from 'components/templates/SearchResultTemplate';
import SearchResult from 'components/LV3/SearchResult';
import SpaceDataNone from 'components/LV3/SpaceDataNone';
import Meta from 'components/LV1/Meta';
import { H1 } from 'components/LV1/Texts/Headline';
import { Dimens } from 'variables';

import { spaceActions } from 'redux/modules/space';
import { iskeyDownEnter } from 'helpers/keydown';
import { areaPrefectures } from 'helpers/prefectures';

import LoadingPage from 'components/LV3/LoadingPage';
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

    // initと統合したいが取り急ぎ
    // constructorでinitを呼ぶとレンダリング終わる前にsetStateすなと叱られる
    // componentDidMountでinitを呼ぶとloadItemsが先に走ってしまう為検索条件が反映されない
    // 上記の問題を解決している余裕がないので一旦冗長のままとしている
  }

  init = () => {
    const { dispatch } = this.props;
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

    this.setState(state);
  };

  componentDidUpdate(prevProps, prevState) {
    // パンくずやエリアタグから遷移した時はconstructorが発火しないのでここで
    const { match } = this.props;
    const { pref_code: prefCode, city_code: cityCode, town_code: townCode } = match.params;

    if (
      !this.props.isSearching &&
      (prevState.prefCode !== prefCode ||
        prevState.cityCode !== cityCode ||
        prevState.townCode !== townCode)
    ) {
      this.init();
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(spaceActions.resetSearch());
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
    const { conditions } = this.props;
    const { keyword, pref, cities, towns } = conditions;

    if (keyword && keyword !== '') {
      return keyword;
    }

    let condition = '';

    if (pref && pref.name !== '') {
      condition += pref.name;
    }

    if (cities && cities.length > 0) {
      condition += `/${cities.map(v => v.name).join(',')}`;
    }

    if (towns && towns.length > 0) {
      condition += `/${towns.map(v => v.name).join(',')}`;
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

    const params = {
      limit,
      offset,
      keyword,
      prefCode,
      sort,
      cities: [],
      towns: [],
    };

    if (cityCode) {
      params.cities = [cityCode];
    }

    if (townCode) {
      params.towns = [townCode];
    }

    dispatch(spaceActions.doSearch(params));
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
            addressTown: s.addressTown,
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

  meta = condition => {
    return (
      <Meta title={`${condition}の検索結果 - モノオク`} description={`${condition}の検索結果`} />
    );
  };

  renderNotFound = condition => (
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

  render() {
    const {
      spaces,
      isMore,
      maxCount,
      isSearching,
      breadcrumbs,
      area,
      conditions,
      cities,
    } = this.props;
    const condition = this.getCondition();

    if (isSearching && spaces.length === 0) {
      return <LoadingPage />;
    }

    if (spaces.length === 0 && !isMore) {
      return this.renderNotFound(condition);
    }

    let areaPinList = [];
    let areaAroundList = [];
    if (conditions.pref && conditions.pref.name && conditions.cities.length === 0) {
      // 都道府県一覧
      areaPinList = area;
    } else if (!conditions.keyword) {
      areaAroundList = area;
    }

    const cityTownAreaList = cities.map(v => {
      return {
        cityName: v.name,
        areaAroundList: v.popularArea.map(w => {
          return {
            text: w.name,
            link: Path.spacesByTown(conditions.pref.code, v.code, w.code),
          };
        }),
        townAreaList: v.towns.map(w => {
          return {
            text: w.name,
            link: Path.spacesByTown(conditions.pref.code, v.code, w.code),
          };
        }),
      };
    });

    return (
      <SearchResultTemplate
        isSearching={isSearching}
        meta={this.meta(condition)}
        searchResult={this.infiniteScroll()}
        condition={condition}
        maxCount={maxCount}
        onClickMore={() => console.log('絞り込みボタン押下')}
        regionPrefectureList={areaPrefectures}
        breadcrumbsList={breadcrumbs}
        searchConditionCurrentList={[
          {
            title: '都道府県',
            value: conditions.pref.name,
          },
          {
            title: '市区町村',
            value: conditions.cities.map(v => v.name).join(','),
          },
          {
            title: '町域・エリア',
            value: conditions.towns.map(v => v.name).join(','),
          },
        ]}
        captionAreaPinList="人気エリアで探す"
        areaPinList={areaPinList}
        captionAreaAroundList="周辺エリアで探す"
        areaAroundList={areaAroundList}
        cityTownAreaList={cityTownAreaList}
        townAreaList={area}
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
        prefecture={conditions.pref.name}
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
  conditions: state.space.search.conditions,
  cities: state.space.search.cities,
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
