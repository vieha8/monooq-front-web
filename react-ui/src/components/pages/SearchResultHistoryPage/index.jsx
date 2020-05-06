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
      isInit: false,
      isMore: true,
    };

    const { dispatch } = this.props;
    dispatch(spaceActions.getSpaceAccessLog());
  }

  componentDidMount() {
    this.setState({ isInit: true, isMore: false });
  }

  // ローディング処理
  loadItems = () => {
    const { dispatch, isLoading } = this.props;
    if (isLoading) {
      return;
    }
    dispatch(spaceActions.getSpaceAccessLog());
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
    const { isLoading, spaces } = this.props;
    const { isInit, isMore } = this.state;

    if (!isInit || (isLoading && !spaces)) {
      return <LoadingPage />;
    }

    return (
      <BaseTemplate maxWidth={1168}>
        <Meta title="閲覧履歴 - モノオク" />
        <H1 bold>閲覧履歴</H1>
        <Content>
          {spaces && spaces.length > 0 ? (
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
});

export default withAuthRequire(connect(mapStateToProps)(SearchResultHistoryPage));
