import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import Path from 'config/path';
import { Dimens } from 'variables';
import { parse } from 'helpers/query-string';
import { iskeyDownEnter } from 'helpers/keydown';
import { makeConditionTitle } from 'helpers/search';
import { media } from 'helpers/style/media-query';
import { spaceActions } from 'redux/modules/space';
import BaseTemplate from 'components/templates/BaseTemplate';
import SearchResultHeader from 'components/LV3/SpaceSearchResultHeader';
import Loading from 'components/LV1/Loading';
import { H1 } from 'components/LV1/Texts/Headline';
import SearchResult from 'components/LV3/SearchResult';
import NoneData from 'components/LV2/NoneData';
import LoadingPage from 'components/LV3/LoadingPage';
import BaseLayout from 'components/Layout';

const Loader = styled(Loading)`
  margin: ${Dimens.medium2}px auto auto;
  text-align: center;
`;

const Content = styled.div`
  margin: ${Dimens.medium2}px 0;
  ${media.tablet`
    margin: ${Dimens.medium}px 0;
  `};
`;

class SearchResultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 12,
      offset: 0,
      sort: 1,
      keyword: '',
      pref: '',
      cities: [],
      towns: [],
      isInit: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(spaceActions.initSearch());

    this.init();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isInit) {
      return;
    }

    // パンくずやエリアタグから遷移した時はconstructorが発火しないのでここで
    const newConditions = this.getConditionsFromUrl();

    const isCheckCities =
      newConditions.cities.length !== prevState.cities.length ||
      !newConditions.cities.every(v => prevState.cities.includes(v));
    const isCheckTowns =
      newConditions.towns.length !== prevState.towns.length ||
      !newConditions.towns.every(v => prevState.towns.includes(v));

    const isCheckTags =
      newConditions.tags.length !== prevState.tags.length ||
      !newConditions.tags.every(v => prevState.tags.includes(v));

    const isCheckSort = newConditions.sort !== prevProps.conditions.sort;

    const { isSearching } = this.props;

    if (
      !isSearching &&
      (prevState.pref !== newConditions.pref ||
        isCheckCities ||
        isCheckTowns ||
        isCheckSort ||
        isCheckTags)
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
      tags: [],
      sort: 1,
    };

    const {
      search,
      router: { asPath },
      pageProps: { query },
    } = this.props;
    const { keyword, sort, pref: queryPref, cities: queryCities, towns: queryTowns, tags } = parse(
      search,
    );
    if (sort) {
      conditions.sort = Number(sort);
    }
    if (tags) {
      conditions.tags = tags.split(',');
    }

    if (!asPath.indexOf('/search')) {
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
      const { pref: prefCode, city: cityCode, town: townCode } = query;
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

  init = () => {
    const { dispatch, spaces } = this.props;
    if (spaces.length !== 0) {
      dispatch(spaceActions.resetSearch());
    }
    const conditions = this.getConditionsFromUrl();
    this.setState({ ...conditions, offset: 0, isInit: true });
  };

  onClickBackSearchCondition = () => {
    const { router } = this.props;
    router.push(Path.searchCondition());
  };

  onKeyDownButtonResearch = e => {
    if (iskeyDownEnter(e)) {
      this.onClickBackSearchCondition();
    }
  };

  makeMetaBreadcrumbs = conditions => {
    const { pref, cities, towns } = conditions;

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

  // ローディング処理
  loadItems = () => {
    const { dispatch, isSearching } = this.props;
    if (isSearching) {
      return;
    }
    const { limit, offset, keyword, pref, cities, towns, sort, tags } = this.state;

    const params = {
      limit,
      offset,
      keyword,
      prefCode: pref,
      sort,
      cities: [],
      towns: [],
      tags: [],
    };

    if (cities.length > 0) {
      params.cities = cities;
    }

    if (towns.length > 0) {
      params.towns = towns;
    }

    if (tags.length > 0) {
      params.tags = tags;
    }
    dispatch(spaceActions.doSearch(params));
    const newOffset = offset + limit;
    this.setState({ offset: newOffset });
  };

  onClickSpace = spaceId => {
    const { router } = this.props;
    router.push(Path.space(spaceId));
  };

  renderNotFound = conditions => (
    <BaseTemplate maxWidth={1168}>
      <H1 bold>{`「${makeConditionTitle(conditions)}」の検索結果 0件`}</H1>
      <NoneData
        captionHead="該当するスペースが見つかりませんでした"
        caption="別のキーワード及び条件で検索をお試しください"
        buttonText="条件を変えて再検索する"
        onClick={this.onClickBackSearchCondition}
        onKeyDown={this.onKeyDownButtonResearch}
      />
    </BaseTemplate>
  );

  render() {
    const { spaces, isMore, isSearching, conditions } = this.props;
    const { isInit } = this.state;

    if (!isInit || (isSearching && spaces.length === 0)) {
      return <LoadingPage />;
    }

    if (spaces.length === 0 && !isMore) {
      return this.renderNotFound(conditions);
    }

    let viaParams;

    if (conditions.keyword) {
      viaParams = 'keyword';
    } else if (conditions.towns.length > 0) {
      viaParams = 'town';
    } else if (conditions.cities.length > 0) {
      viaParams = 'city';
    } else if (conditions.pref) {
      viaParams = 'pref';
    }

    const conditionTitle = makeConditionTitle(conditions);

    return (
      <BaseLayout
        title={`${conditionTitle}のスペース検索結果 - モノオク`}
        jsonLd={this.makeMetaBreadcrumbs(conditions)}
      >
        <BaseTemplate maxWidth={1168}>
          <SearchResultHeader conditions={conditions} conditionTitle={conditionTitle} />
          <Content>
            <InfiniteScroll
              pageStart={0}
              loadMore={this.loadItems}
              hasMore={isMore}
              loader={<Loader size="medium" key={0} />}
              initialLoad
            >
              <SearchResult
                via={viaParams}
                spaces={spaces.map(s => ({
                  ...s,
                  image: (s.images[0] || {}).imageUrl,
                  onClick: () => this.onClickSpace(s.id),
                }))}
              />
            </InfiniteScroll>
          </Content>
        </BaseTemplate>
      </BaseLayout>
    );
  }
}

const mapStateToProps = state => ({
  spaces: state.space.search.results,
  isSearching: state.space.search.isLoading,
  isMore: state.space.search.isMore,
  conditions: state.space.search.conditions,
  search: state.router.location.search,
});

export default connect(mapStateToProps)(SearchResultPage);

export const getServerSideProps = ({ query }) => {
  return {
    props: {
      query,
    },
  };
};
