import React, { Component, Fragment } from 'react';
import Path from 'config/path';
import connect from 'components/containers/connect';
import { Colors } from 'variables';
import { areaPrefectures } from 'helpers/prefectures';
import { parse, stringify } from 'helpers/query-string';
import {
  isDefaultCheckCity,
  makeConditionTitle,
  makeCurrentSearchConditions,
  makeMetaBreadcrumbs,
} from 'helpers/search';
import Meta from 'components/LV1/Meta';
import BreadcrumbsList from 'components/LV2/Lists/BreadcrumbsList';
import AreaAroundList from 'components/LV2/Lists/AreaAroundList';
import AreaPinList from 'components/LV2/Lists/AreaPinList';
import SortList from 'components/LV2/Lists/LinkList';
import ButtonBottom from 'components/LV2/Forms/ButtonBottom';
import SearchResultHeader from 'components/LV3/SearchResultHeader';

class SearchResultHeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityAndTowns: [],
      sortList: [],
      searchConditionCurrentList: [],
    };
  }

  componentDidMount() {
    const { conditions, cities } = this.props;

    const cityAndTowns = cities.map(v => {
      const isCheckedCity = isDefaultCheckCity(v, conditions);
      const townAreaList = v.towns.map(w => {
        const isCheckedTown = conditions.towns.filter(t => t.code === w.code).length > 0;
        return {
          text: w.name,
          code: w.code,
          link: Path.spacesByTown(conditions.pref.code, v.code, w.code),
          isChecked: isCheckedTown || isCheckedCity,
          count: w.count,
        };
      });

      return {
        cityName: v.name,
        cityCode: v.code,
        isChecked: isCheckedCity,
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

    const sortList = [
      {
        text: 'おすすめ',
        path: this.makeSortPath(1),
        current: Number(conditions.sort === 1),
      },
      {
        text: '新着順',
        path: this.makeSortPath(2),
        current: Number(conditions.sort === 2),
      },
      {
        text: '安い順',
        path: this.makeSortPath(3),
        current: Number(conditions.sort === 3),
      },
    ];

    const searchConditionCurrentList = makeCurrentSearchConditions(conditions);
    this.setState({ cityAndTowns, searchConditionCurrentList, sortList });
  }

  makeSortPath = sort => {
    const { location } = this.props;
    const q = parse(location.search);
    q.sort = sort;
    const newQuery = stringify(q);
    return `${window.location.pathname}?${newQuery}`;
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
    const { maxCount, breadcrumbs, area, conditions } = this.props;
    const { cityAndTowns, sortList, searchConditionCurrentList } = this.state;

    // TODO getDerivedでやる
    let areaPinList = [];
    let areaAroundList = [];
    if (conditions.pref && conditions.pref.name && conditions.cities.length === 0) {
      // 都道府県一覧
      areaPinList = area;
    } else if (!conditions.keyword) {
      areaAroundList = area;
    }

    const buttonText = '地域を絞り込む';
    const conditionTitle = makeConditionTitle(conditions);

    return (
      <Fragment>
        <Meta
          title={`${conditionTitle}のスペース検索結果 - モノオク`}
          jsonLd={makeMetaBreadcrumbs(conditions)}
        />
        {breadcrumbs && <BreadcrumbsList breadcrumbsList={breadcrumbs} />}
        <SearchResultHeader
          conditionTitle={conditionTitle}
          maxCount={maxCount}
          prefecture={conditions.pref.name}
          onClickMore={this.onClickMore}
          onClickCheckCity={this.onClickCheckCity}
          onClickCheckTown={this.onClickCheckTown}
          regionPrefectureList={areaPrefectures}
          cityTownAreaList={cityAndTowns}
          textButtonBottom={buttonText}
          searchConditionCurrentList={searchConditionCurrentList}
        />
        {areaAroundList && areaAroundList.length > 0 && (
          <AreaAroundList areaAroundList={areaAroundList} />
        )}
        {areaPinList && areaPinList.length > 0 && <AreaPinList areaPinList={areaPinList} />}
        {sortList && sortList.length > 0 && (
          <SortList list={sortList} isLinkEvent landscape color={Colors.brandPrimary} />
        )}
        <ButtonBottom
          modal
          text={buttonText}
          cityTownAreaList={cityAndTowns}
          onClickMore={this.onClickMore}
          onClickCheckCity={this.onClickCheckCity}
          onClickCheckTown={this.onClickCheckTown}
          searchConditionCurrentList={searchConditionCurrentList}
          prefectureList={this.getPrefectureList()}
        />
      </Fragment>
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

export default connect(
  SearchResultHeaderContainer,
  mapStateToProps,
);
