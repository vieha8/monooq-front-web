import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
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
import SearchResultHeaderPage from 'components/pages/SearchResultPage/SearchResultHeaderPage';
import Loading from 'components/LV1/Loading';
import { H1 } from 'components/LV1/Texts/Headline';
import SearchResult from 'components/LV3/SearchResult';
import NoneData from 'components/LV2/NoneData';
import LoadingPage from 'components/LV3/LoadingPage';

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
      recommendSpaces: props.location.state && props.location.state.recommendSpaces,
    };
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isInit) {
      return;
    }

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

    const isCheckTags =
      newConditions.tags.length !== prevState.tags.length
        ? true
        : !newConditions.tags.every(v => prevState.tags.includes(v));

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

    const { location, match } = this.props;
    const { keyword, sort, pref: queryPref, cities: queryCities, towns: queryTowns, tags } = parse(
      location.search,
    );
    if (sort) {
      conditions.sort = Number(sort);
    }
    if (tags) {
      conditions.tags = tags.split(',');
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

  init = () => {
    const { dispatch, spaces } = this.props;
    if (spaces.length !== 0) {
      dispatch(spaceActions.resetSearch());
    }
    const conditions = this.getConditionsFromUrl();
    this.setState({ ...conditions, offset: 0, isInit: true });
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
    const { history } = this.props;
    history.push(Path.space(spaceId));
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
    const { isInit, recommendSpaces } = this.state;

    let setSpaces = spaces;
    if (recommendSpaces) {
      setSpaces = recommendSpaces.results;
    } else {
      if (!isInit || (isSearching && spaces.length === 0)) {
        return <LoadingPage />;
      }

      if (spaces.length === 0 && !isMore) {
        return this.renderNotFound(conditions);
      }
    }

    return (
      <BaseTemplate maxWidth={1168}>
        <SearchResultHeaderPage
          recommendSpaceCount={recommendSpaces ? recommendSpaces.results.length : 0}
        />
        <Content>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadItems}
            hasMore={isMore}
            loader={<Loader size="medium" key={0} />}
            initialLoad
          >
            <SearchResult
              spaces={setSpaces.map(s => ({
                ...s,
                image: (s.images[0] || {}).imageUrl,
                onClick: () => this.onClickSpace(s.id),
              }))}
            />
          </InfiniteScroll>
        </Content>
      </BaseTemplate>
    );
  }
}

const mapStateToProps = state => ({
  spaces: state.space.search.results,
  isSearching: state.space.search.isLoading,
  isMore: state.space.search.isMore,
  conditions: state.space.search.conditions,
});

export default withRouter(connect(mapStateToProps)(SearchResultPage));
