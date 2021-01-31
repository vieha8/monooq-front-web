import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import Path from 'config/path';
import { Dimens } from 'variables';
import { convertSpaceImgUrl } from 'helpers/imgix';
import { media, isOverPhoneWindow } from 'helpers/style/media-query';
import { spaceActions } from 'redux/modules/space';
import BaseTemplate from 'components/templates/BaseTemplate';
import Loading from 'components/LV1/Loading';
import { H1 } from 'components/LV1/Texts/Headline';
import NoneData from 'components/LV2/NoneData';
import SearchResult from 'components/LV3/SearchResult';
import SpaceRows from 'components/LV3/SpaceRows';
import LoadingPage from 'components/LV3/LoadingPage';
import BaseLayout from 'components/Layout';

const dummySpaceImage =
  'https://monooq.imgix.net/img%2Fservice%2Fimg-dummy-space.png?alt=dummy&auto=format&auto=compress';

const OnlyPcTab = styled.span`
  display: block;
  ${media.phone`
    display: none;
  `};
`;

const OnlyPhone = styled.span`
  display: none;
  ${media.phone`
    display: block;
  `};
`;
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
      queue: null,
      isOverPhone: false,
    };
  }

  componentDidMount() {
    this.loadItems();
    this.setState({ isOverPhone: isOverPhoneWindow() });
    window.addEventListener('resize', () => this.checkResize(), true);
    const { dispatch } = this.props;
    dispatch(spaceActions.resetSearch());
  }

  // TODO: あとで整理する
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isInit) {
      const { dispatch, spaces } = this.props;
      if (prevProps.spaces && prevProps.spaces.length === 0) {
        // ユーザ未登録時にスペース閲覧する。そして、スペース一覧画面から新規登録。
        // そして、TOP→スペース一覧画面から閲覧履歴画面に遷移するとここに到達。
        const { isInit } = this.state;
        if (!isInit) {
          dispatch(spaceActions.resetSearch());
        }
      } else if (
        prevProps.spaces !== null &&
        (prevProps.spaces && prevProps.spaces.length) !== (spaces && spaces.length)
      ) {
        dispatch(spaceActions.resetSearch());
      } else {
        dispatch(spaceActions.resetSearch());
      }
      return false;
    }
    return true;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.checkResize(), true);
  }

  checkResize = () => {
    const { queue } = this.state;
    clearTimeout(queue);
    const queueFunction = setTimeout(() => {
      this.setState({ isOverPhone: isOverPhoneWindow() });
    }, 100);
    this.setState({ queue: queueFunction });
  };

  // ローディング処理
  loadItems = () => {
    const { dispatch } = this.props;
    const { limit } = this.state;
    const params = {
      limit,
    };
    dispatch(spaceActions.getSpaceAccessLog(params));
  };

  onClickSpace = spaceId => {
    const { router } = this.props;
    router.push(Path.space(spaceId));
  };

  onClickBackTop = () => {
    const { router } = this.props;
    router.push(Path.top());
  };

  render() {
    const { isLoading, spaces, isMore } = this.props;
    const { isOverPhone } = this.state;

    if (isLoading || !spaces) {
      return <LoadingPage />;
    }

    let isNoData = false;
    if (spaces && spaces.length === 0 && !isMore) {
      isNoData = true;
    }

    return (
      <BaseLayout title="閲覧履歴 - モノオク">
        <BaseTemplate maxWidth={1168}>
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
                {isOverPhone ? (
                  <OnlyPcTab>
                    <SearchResult
                      spaces={spaces.map(s => ({
                        ...s,
                        image:
                          s.images.length !== 0
                            ? convertSpaceImgUrl(s.images[0].imageUrl, 'w=600&auto=compress')
                            : dummySpaceImage,
                        onClick: () => this.onClickSpace(s.id),
                      }))}
                    />
                  </OnlyPcTab>
                ) : (
                  <OnlyPhone>
                    <SpaceRows spaces={spaces} onClick={this.onClickSpace} />
                  </OnlyPhone>
                )}
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
      </BaseLayout>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.space.isAccessLogLoading,
  spaces: state.space.spaces,
  isMore: state.space.isMore,
});

export default connect(mapStateToProps)(SearchResultHistoryPage);
