import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import Path from 'config/path';
import { Dimens, FontSizes, Colors } from 'variables';
import { convertSpaceImgUrl } from 'helpers/imgix';
import { media } from 'helpers/style/media-query';
import { spaceActions } from 'redux/modules/space';
import withAuthRequire from 'components/hooks/withAuthRequire';
import BaseTemplate from 'components/templates/BaseTemplate';
import Loading from 'components/LV1/Loading';
import Meta from 'components/LV1/Meta';
import InlineText from 'components/LV1/Texts/InlineText';
import { H1 } from 'components/LV1/Texts/Headline';
import SearchResult from 'components/LV3/SearchResult';
import LoadingPage from 'components/LV3/LoadingPage';
import dummySpaceImage from 'images/img-dummy-space.png';

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

const ResultCount = styled.span`
  font-size: ${FontSizes.large}px;
  color: ${Colors.brandPrimary};
  margin-left: ${Dimens.small_10}px;
  margin-right: ${Dimens.xxsmall_5}px;
`;

const ResultCountWrap = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

const Caption = styled.div`
  width: 100%;
  margin: ${Dimens.small2}px auto;
  font-size: ${FontSizes.medium}px;
  line-height: normal;
  ${media.tablet`
    font-size: ${FontSizes.small}px;
  `};
`;

class SearchResultHistoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 12,
      offset: 0,
      sort: 1,
      pref: '',
      isInit: false,
      isMore: true,
      recommendSpaces: props.location.state && props.location.state.recommendSpaces,
    };
  }

  componentDidMount() {
    this.setState({ offset: 0, isInit: true });
  }

  // ローディング処理
  loadItems = () => {
    const { dispatch, isSearching } = this.props;
    if (isSearching) {
      return;
    }

    const { limit, offset, keyword, pref, sort } = this.state;
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

    dispatch(spaceActions.doSearch(params));
    const newOffset = offset + limit;
    this.setState({ offset: newOffset, isMore: false });
  };

  onClickSpace = spaceId => {
    const { history } = this.props;
    history.push(Path.space(spaceId));
  };

  render() {
    const { history, isSearching } = this.props;
    const { isInit, isMore, recommendSpaces } = this.state;
    const setSpaces = recommendSpaces && recommendSpaces.results;

    if (!setSpaces) {
      history.push(Path.top());
    }

    if (!isInit || (isSearching && setSpaces.length === 0)) {
      return <LoadingPage />;
    }

    if (setSpaces.length === 0) {
      history.push(Path.top());
    }

    return (
      <BaseTemplate maxWidth={1168}>
        <Meta title="あなたにおすすめのスペース - モノオク" />
        <ResultCountWrap>
          <H1 bold>
            あなたにおすすめのスペース
            <br />
            <ResultCount>{(setSpaces && setSpaces.length) || 0}</ResultCount>
            <InlineText.Base fontSize={FontSizes.small} nobold>
              件
            </InlineText.Base>
          </H1>
        </ResultCountWrap>
        <Caption>
          希望条件に特に近いスペースはこちら！
          <br />
          気になるスペースへ気軽に相談してみましょう。
        </Caption>
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
                image:
                  s.images.length !== 0
                    ? convertSpaceImgUrl(s.images[0].imageUrl, 'w=600')
                    : dummySpaceImage,
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
  isSearching: state.space.search.isLoading,
});

export default withAuthRequire(connect(mapStateToProps)(SearchResultHistoryPage));
