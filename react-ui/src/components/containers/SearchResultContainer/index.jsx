import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { parse, stringify } from 'helpers/query-string';
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

class SearchResultContainer extends Component {
  constructor(props) {
    super(props);
    const state = {
      keyword: '',
      limit: 12,
      offset: 0,
      sort: 1,
      cityAndTowns: [],
      checkCities: [],
      checkTowns: [],
      sortList: [],
      searchConditionCurrentList: [],
    };
    const conditions = this.getConditionsFromUrl();
    this.state = { ...state, ...conditions };
  }

  componentDidUpdate(prevProps, prevState) {
    // パンくずやエリアタグから遷移した時はconstructorが発火しないのでここで
    const newConditions = this.getConditionsFromUrl();

    const isCheckCities =
      newConditions.cities.length !== prevState.cities.length
        ? true
        : !newConditions.cities.every(v => prevState.cities.includes(v));
    const isCheckTowns =
      newConditions.towns.length !== prevState.towns.length
        ? true
        : !newConditions.towns.every(v => prevState.towns.includes(v));
    const isCheckSort = newConditions.sort !== prevProps.conditions.sort;

    const { isSearching } = this.props;
    if (
      !isSearching &&
      (prevState.pref !== newConditions.pref || isCheckCities || isCheckTowns || isCheckSort)
    ) {
      this.init();
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(spaceActions.resetSearch());
  }

  getConditionsFromUrl = () => {
    const conditions = {
      keyword: '',
      pref: '',
      cities: [],
      towns: [],
      sort: 1,
    };

    const { location, match } = this.props;
    const { keyword, sort, pref: queryPref, cities: queryCities, towns: queryTowns } = parse(
      location.search,
    );
    if (sort) {
      conditions.sort = Number(sort);
    }

    if (!match.url.indexOf('/search')) {
      // フリーワード検索
      if (keyword) {
        conditions.keyword = keyword;
      }
      if (queryPref) {
        conditions.pref = queryPref;
      }
      if (queryTowns) {
        conditions.towns = queryTowns.split(',');
      }
      if (queryCities) {
        conditions.cities = queryCities.split(',');
      }
    } else {
      const { pref_code: prefCode, city_code: cityCode, town_code: townCode } = match.params;
      if (prefCode && cityCode && townCode) {
        // 町域一覧
        conditions.pref = prefCode;
        conditions.cities = [cityCode];
        conditions.towns = [townCode];
      } else if (prefCode && cityCode) {
        // 市区町村一覧
        conditions.pref = prefCode;
        conditions.cities = [cityCode];
      } else if (prefCode) {
        // 都道府県一覧
        conditions.pref = prefCode;
      }
    }

    return conditions;
  };

  static getDerivedStateFromProps(props, state) {
    const { cities, conditions } = props;
    if (
      (state.cityAndTowns.length === 0 && cities.length > 0) ||
      state.cities.length !== conditions.cities.length ||
      state.towns.length !== conditions.towns.length ||
      state.sort !== conditions.sort
    ) {
      // TODO だいぶ煩雑になっているのでリファクタリング
      const cityTownAreaList = cities.map(v => {
        const checkAlreadyCity = () => {
          if (conditions.cities.filter(c => c.code === v.code).length > 0) {
            const checkedTowns = v.towns.filter(
              w => conditions.towns.filter(t => t.code === w.code).length > 0,
            ).length;
            if (checkedTowns === 0 || checkedTowns === v.towns.length) {
              return true;
            }
          }
          return false;
        };
        const isAlreadyCity = checkAlreadyCity();

        const townAreaList = v.towns.map(w => {
          const isAlreadyTown = conditions.towns.filter(t => t.code === w.code).length > 0;
          return {
            text: w.name,
            code: w.code,
            link: Path.spacesByTown(conditions.pref.code, v.code, w.code),
            isChecked: isAlreadyTown || isAlreadyCity,
            count: w.count,
          };
        });

        return {
          cityName: v.name,
          cityCode: v.code,
          isChecked: isAlreadyCity,
          areaAroundList: v.popularArea.map(w => {
            return {
              text: w.name,
              link: Path.spacesByTown(conditions.pref.code, v.code, w.code),
            };
          }),
          townAreaList,
          count: v.count,
        };
      });

      const makeSortPath = sort => {
        const { location } = props;
        const q = parse(location.search);
        q.sort = sort;
        const newQuery = stringify(q);
        return `${window.location.pathname}?${newQuery}`;
      };

      const sortList = [
        {
          text: 'おすすめ',
          path: makeSortPath(1),
          current: Number(conditions.sort === 1),
        },
        {
          text: '新着順',
          path: makeSortPath(2),
          current: Number(conditions.sort === 2),
        },
        {
          text: '安い順',
          path: makeSortPath(3),
          current: Number(conditions.sort === 3),
        },
      ];

      const searchConditionCurrentList = [
        {
          title: '都道府県',
          value: conditions.pref.name,
        },
        {
          title: '市区町村',
          value: conditions.cities.map(v => v.name).join('・'),
        },
        {
          title: '町域・エリア',
          value: conditions.towns.map(v => v.name).join('・'),
        },
      ];
      if (conditions.keyword) {
        searchConditionCurrentList.push({
          title: 'キーワード',
          value: conditions.keyword,
        });
      }

      return {
        cityAndTowns: cityTownAreaList,
        sortList,
        searchConditionCurrentList,
      };
    }
    return null;
  }

  init = () => {
    const { dispatch } = this.props;
    dispatch(spaceActions.resetSearch());
    const conditions = this.getConditionsFromUrl();
    this.setState({ ...conditions, offset: 0, checkCities: [], checkTowns: [] });
  };

  onClickBackSearchCondition = () => {
    const { history } = this.props;
    history.push(Path.searchCondition());
  };

  onKeyDownButtonResearch = e => {
    if (iskeyDownEnter(e)) {
      this.onClickBackSearchCondition();
    }
  };

  onClickSpace = space => {
    const { history } = this.props;
    history.push(Path.space(space.id));
  };

  onClickCheckCity = (_, { code, checked }) => {
    const { cityAndTowns } = this.state;
    const res = cityAndTowns.map(v => {
      if (v.cityCode !== code) {
        return v;
      }
      return {
        ...v,
        isChecked: checked,
        townAreaList: v.townAreaList.map(w => ({ ...w, isChecked: checked })),
      };
    });
    this.setState({ cityAndTowns: res });
  };

  onClickCheckTown = (_, { code, checked }) => {
    const { cityAndTowns } = this.state;
    const res = cityAndTowns.map(city => {
      const cityRes = { ...city };
      const towns = city.townAreaList.map(town => {
        if (town.code !== code) {
          return town;
        }
        if (!checked) {
          cityRes.isChecked = false;
        }
        return { ...town, isChecked: checked };
      });
      return { ...cityRes, townAreaList: towns };
    });
    this.setState({ cityAndTowns: res });
  };

  onClickMore = () => {
    let citiesCode = [];
    const townsCode = [];
    const { cityAndTowns } = this.state;
    cityAndTowns.map(city => {
      if (city.isChecked) {
        citiesCode.push(city.cityCode);
      } else {
        city.townAreaList.map(town => {
          if (town.isChecked) {
            citiesCode.push(city.cityCode); // TODO ここで重複push防ぐような判定いれる
            townsCode.push(town.code);
          }
          return null;
        });
      }
      return null;
    });

    citiesCode = citiesCode.filter((x, i, self) => self.indexOf(x) === i);

    if (citiesCode.length === 0 && townsCode.length === 0) {
      return;
    }

    const { history, conditions } = this.props;

    if (townsCode.length === 1 && citiesCode.length === 1) {
      // 町域ひとつ
      history.push(Path.spacesByTown(conditions.pref.code, citiesCode[0], townsCode[0]));
    } else if (citiesCode.length === 1) {
      // 市区町村ひとつ
      history.push(Path.spacesByCity(conditions.pref.code, citiesCode[0]));
    } else {
      const query = `?pref=${conditions.pref.code}&cities=${citiesCode.join(
        ',',
      )}&towns=${townsCode.join(',')}`;
      history.push(`${Path.search()}${query}`);
    }
  };

  getCondition = () => {
    const { conditions } = this.props;
    const { keyword, pref, cities, towns } = conditions;

    if (keyword && keyword !== '') {
      return keyword;
    }

    let condition = '';

    if (pref && pref.name && pref.name !== '') {
      condition += pref.name;
    }

    if (cities && cities.length > 0) {
      condition += `/${cities.map(v => v.name).join('・')}`;
    }

    if (towns && towns.length > 0) {
      condition += `/${towns.map(v => v.name).join('・')}`;
    }

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
      pref,
      cities,
      towns,
      sort,
      checkCities,
      checkTowns,
    } = this.state;

    const params = {
      limit,
      offset,
      keyword,
      prefCode: pref,
      sort,
      cities: [],
      towns: [],
    };

    if (cities.length > 0) {
      params.cities = cities;
    }

    if (checkCities.length > 0) {
      params.cities = checkCities;
    }

    if (towns.length > 0) {
      params.towns = towns;
    }

    if (checkTowns.length > 0) {
      params.towns = checkTowns;
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

  makeMetaBreadcrumbs = () => {
    let position = 1;
    const baseUrl = 'https://monooq.com';
    const itemList = [
      {
        '@type': 'ListItem',
        position,
        name: 'トップ',
        item: baseUrl,
      },
    ];

    const { conditions } = this.props;
    const { pref, cities, towns } = conditions;

    if (pref && pref.name) {
      position += 1;
      itemList.push({
        '@type': 'ListItem',
        position,
        name: `${pref.name}のスペース`,
        item: `${baseUrl}/pref${pref.code}`,
      });
      if (cities.length === 1) {
        position += 1;
        const city = cities[0];
        itemList.push({
          '@type': 'ListItem',
          position,
          name: `${city.name}のスペース`,
          item: `${baseUrl}/pref${pref.code}/city${city.code}`,
        });
        if (towns.length === 1) {
          position += 1;
          const town = towns[0];
          itemList.push({
            '@type': 'ListItem',
            position,
            name: `${town.name}のスペース`,
            item: `${baseUrl}/pref${pref.code}/city${city.code}/town${town.code}`,
          });
        }
      }
    }

    if (itemList.length === 1) {
      position += 1;
      itemList.push({
        '@type': 'ListItem',
        position,
        name: `スペース検索結果`,
        item: `${baseUrl}/search`,
      });
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: itemList,
    };
  };

  meta = condition => {
    return (
      <Meta
        title={`${condition}のスペース検索結果 - モノオク`}
        jsonLd={this.makeMetaBreadcrumbs()}
      />
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

  getPrefectureList = () => {
    // TODO render走る度回るのアホくさいのでキャッシュ的なことしたい
    areaPrefectures.map(a => {
      return {
        title: a.region,
        collapsibleItemList: a.prefectureList.map(p => {
          return {
            text: p.name,
            to: Path.spacesByPrefecture(p.id),
          };
        }),
      };
    });
  };

  render() {
    const { spaces, isMore, maxCount, isSearching, breadcrumbs, area, conditions } = this.props;

    if (isSearching && spaces.length === 0) {
      return <LoadingPage />;
    }

    const condition = this.getCondition();

    if (spaces.length === 0 && !isMore) {
      return this.renderNotFound(condition);
    }

    const { cityAndTowns, sortList, searchConditionCurrentList } = this.state;

    let areaPinList = [];
    let areaAroundList = [];
    if (conditions.pref && conditions.pref.name && conditions.cities.length === 0) {
      // 都道府県一覧
      areaPinList = area;
    } else if (!conditions.keyword) {
      areaAroundList = area;
    }

    return (
      <SearchResultTemplate
        isSearching={isSearching}
        meta={this.meta(condition)}
        searchResult={this.infiniteScroll()}
        condition={condition}
        maxCount={maxCount}
        onClickMore={this.onClickMore}
        regionPrefectureList={areaPrefectures}
        breadcrumbsList={breadcrumbs}
        searchConditionCurrentList={searchConditionCurrentList}
        areaPinList={areaPinList}
        areaAroundList={areaAroundList}
        cityTownAreaList={cityAndTowns}
        prefectureList={this.getPrefectureList()}
        townAreaList={area}
        sortList={sortList}
        prefecture={conditions.pref.name}
        textButtonBottom="地域を絞り込む" // TODO SearchConditionMoreとSearchConditionMoreSPを共通化できれば不要になる
        onClickCheckCity={this.onClickCheckCity}
        onClickCheckTown={this.onClickCheckTown}
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
