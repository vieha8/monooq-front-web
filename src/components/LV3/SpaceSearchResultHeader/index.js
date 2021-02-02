import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Path from 'config/path';
import { Colors } from 'variables';
import { isOverTabletWindow } from 'helpers/style/media-query';
import { areaPrefectures } from 'helpers/prefectures';
import { parse, stringify } from 'helpers/query-string';
import BreadcrumbsList from 'components/LV2/Lists/BreadcrumbsList';
import AreaAroundList from 'components/LV2/Lists/AreaAroundList';
import AreaPinList from 'components/LV2/Lists/AreaPinList';
import SortList from 'components/LV2/Lists/LinkList';
import SearchResultHeader from 'components/LV3/SpaceSearchResultHeader/SearchResultHeader';

class SearchResultHeaderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityAndTowns: [],
      sortList: [],
      searchConditionCurrentList: [],
      areaPinList: [],
      areaAroundList: [],
      prefectureList: [],
      isModalOpenPC: false,
      isModalOpenSP: false,
      queue: null,
      isOverTablet: false,
    };
  }

  componentDidMount() {
    const { conditions, cities, area } = this.props;

    this.setState({ isOverTablet: isOverTabletWindow() });
    window.addEventListener('resize', () => this.checkResize(), true);

    const cityAndTowns = cities.map(v => {
      const isCheckedCity = this.isDefaultCheckCity(v, conditions);
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

    let areaPinList = [];
    let areaAroundList = [];
    if (conditions.pref && conditions.pref.name && conditions.cities.length === 0) {
      areaPinList = area;
    } else if (!conditions.keyword) {
      areaAroundList = area;
    }

    const prefectureList = this.getPrefectureList();

    const searchConditionCurrentList = this.makeCurrentSearchConditions(conditions);
    this.setState({
      cityAndTowns,
      searchConditionCurrentList,
      sortList,
      areaPinList,
      areaAroundList,
      prefectureList,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.checkResize(), true);
  }

  checkResize = () => {
    const { queue } = this.state;
    clearTimeout(queue);
    const queueFunction = setTimeout(() => {
      this.setState({ isOverTablet: isOverTabletWindow() });
    }, 100);
    this.setState({ queue: queueFunction });
  };

  makeSortPath = sort => {
    const { search } = this.props;
    const q = parse(search);
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

    this.setState({ isModalOpenPC: false, isModalOpenSP: false });

    const { router, conditions } = this.props;

    if (townsCode.length === 1 && citiesCode.length === 1) {
      // 町域ひとつ
      router.push(Path.spacesByTown(conditions.pref.code, citiesCode[0], townsCode[0]));
    } else if (townsCode.length === 0 && citiesCode.length === 1) {
      // 市区町村ひとつ
      router.push(Path.spacesByCity(conditions.pref.code, citiesCode[0]));
    } else {
      const query = `?pref=${conditions.pref.code}&cities=${citiesCode.join(
        ',',
      )}&towns=${townsCode.join(',')}`;
      router.push(`${Path.search()}${query}`);
    }
  };

  getPrefectureList = () => {
    return areaPrefectures.map(a => {
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

  isDefaultCheckCity = (city, conditions) => {
    if (conditions.cities.filter(c => c.code === city.code).length > 0) {
      const checkedTowns = city.towns.filter(
        w => conditions.towns.filter(t => t.code === w.code).length > 0,
      ).length;
      if (checkedTowns === 0 || checkedTowns === city.towns.length) {
        return true;
      }
    }
    return false;
  };

  makeCurrentSearchConditions = conditions => {
    const list = [
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
      list.push({
        title: 'キーワード',
        value: conditions.keyword,
      });
    }
    return list;
  };

  render() {
    const { maxCount, breadcrumbs, conditions, conditionTitle } = this.props;
    const {
      cityAndTowns,
      sortList,
      searchConditionCurrentList,
      areaPinList,
      areaAroundList,
      prefectureList,
      isModalOpenPC,
      isModalOpenSP,
      isOverTablet,
    } = this.state;

    return (
      <Fragment>
        {breadcrumbs && <BreadcrumbsList breadcrumbsList={breadcrumbs} />}
        <SearchResultHeader
          isModalOpenPC={isModalOpenPC}
          handleModalOpenPC={() => this.setState({ isModalOpenPC: true })}
          handleModalClosePC={() => this.setState({ isModalOpenPC: false })}
          isModalOpenSP={isModalOpenSP}
          handleModalOpenSP={() => this.setState({ isModalOpenSP: true })}
          handleModalCloseSP={() => this.setState({ isModalOpenSP: false })}
          conditionTitle={conditionTitle}
          maxCount={maxCount}
          prefecture={conditions.pref.name}
          onClickMore={this.onClickMore}
          onClickCheckCity={this.onClickCheckCity}
          onClickCheckTown={this.onClickCheckTown}
          regionPrefectureList={areaPrefectures}
          prefectureList={prefectureList}
          cityTownAreaList={cityAndTowns}
          searchConditionCurrentList={searchConditionCurrentList}
          isOverTablet={isOverTablet}
        />
        {areaAroundList && areaAroundList.length > 0 && (
          <AreaAroundList areaAroundList={areaAroundList} />
        )}
        {areaPinList && areaPinList.length > 0 && <AreaPinList areaPinList={areaPinList} />}
        {sortList && sortList.length > 0 && (
          <SortList list={sortList} isLinkEvent landscape color={Colors.brandPrimary} />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  maxCount: state.space.search.maxCount,
  breadcrumbs: state.space.search.breadcrumbs,
  area: state.space.search.area,
  conditions: state.space.search.conditions,
  cities: state.space.search.cities,
  search: state.router.location.search,
});

export default connect(mapStateToProps)(SearchResultHeaderPage);
