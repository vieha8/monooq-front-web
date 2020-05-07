import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import Path from 'config/path';
import { Dimens } from 'variables';
import { convertSpaceImgUrl } from 'helpers/imgix';
import { media } from 'helpers/style/media-query';
import { spaceActions } from 'redux/modules/space';
import withAuthRequire from 'components/hooks/withAuthRequire';
import BaseTemplate from 'components/templates/BaseTemplate';
import Loading from 'components/LV1/Loading';
import Meta from 'components/LV1/Meta';
import { H1 } from 'components/LV1/Texts/Headline';
import NoneData from 'components/LV2/NoneData';
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

class SearchResultHistoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 8,
      offset: 0,
      isInit: false,
    };
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(spaceActions.resetSearch());
  }

  init = () => {
    const { dispatch } = this.props;
    dispatch(spaceActions.resetSearch());
    this.setState({ offset: 0, isInit: true });
  };

  // ローディング処理
  loadItems = () => {
    const { dispatch, isLoading } = this.props;
    if (isLoading) {
      return;
    }

    const { limit, offset } = this.state;
    const params = {
      limit,
      offset,
    };
    dispatch(spaceActions.getSpaceAccessLog(params));
    const newOffset = offset + limit;
    this.setState({ offset: newOffset });
  };

  onClickSpace = spaceId => {
    const { history } = this.props;
    history.push(Path.space(spaceId));
  };

  onClickBackTop = () => {
    const { history } = this.props;
    history.push(Path.top());
  };

  render() {
    const { isLoading, spaces, isMore } = this.props;
    const { isInit } = this.state;

    if (!isInit || (isLoading && spaces && spaces.length === 0)) {
      return <LoadingPage />;
    }

    let isNoData = false;
    if (spaces && spaces.length === 0 && !isMore) {
      isNoData = true;
    }

    return (
      <BaseTemplate maxWidth={1168}>
        <Meta title="閲覧履歴 - モノオク" />
        <H1 bold>閲覧履歴</H1>
        <Content>
          {!isNoData ? (
            <InfiniteScroll
              pageStart={0}
              loadMore={this.loadItems}
              hasMore={isMore}
              loader={<Loader size="medium" key={0} />}
              initialLoad
            >
              <SearchResult
                spaces={spaces.map(s => ({
                  ...s,
                  image:
                    s.images.length !== 0
                      ? convertSpaceImgUrl(s.images[0].imageUrl, 'w=600')
                      : dummySpaceImage,
                  onClick: () => this.onClickSpace(s.id),
                }))}
              />
            </InfiniteScroll>
          ) : (
            <NoneData
              caption="検索履歴がありません。"
              buttonText="TOPに戻る"
              onClick={this.onClickBackTop}
            />
          )}
        </Content>
      </BaseTemplate>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.space.isLoading,
  spaces: state.space.spaces,
  isMore: state.space.isMore,
});

export default withAuthRequire(connect(mapStateToProps)(SearchResultHistoryPage));
