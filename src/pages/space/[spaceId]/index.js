/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { isOverTabletWindow } from 'helpers/style/media-query';
import { spaceActions } from 'redux/modules/space';
import { messagesActions } from 'redux/modules/messages';
import BaseTemplate from 'components/templates/BaseTemplate';
import Detail from 'components/LV3/Space/Detail';
import LoadingPage from 'components/LV3/LoadingPage';
import { connect } from 'react-redux';
import BaseLayout from 'components/Layout';

const dummySpaceImage =
  'https://monooq.imgix.net/img%2Fservice%2Fimg-dummy-space.png?alt=dummy&auto=format&auto=compress';

class SpacePage extends Component {
  constructor(props) {
    super(props);
    this.init();

    this.state = {
      meta: {
        title: '',
        description: '',
        url: '',
        imageUrl: '',
      },
      isOverTopView: false,
      isBottom: false,
      isModalOpen: false,
      isModalOpenSP: false,
      isLoadedRoom: false,
      queue: null,
      isOverTablet: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({ isOverTablet: isOverTabletWindow() });
    window.addEventListener('scroll', () => this.watchCurrentPosition(), true);
    window.addEventListener('resize', () => this.checkResize(), true);
    this.setState({ isModalOpen: false, isModalOpenSP: false });
  }

  componentDidUpdate(prevProps) {
    // おすすめから遷移した時はconstructorが発火しないのでここで
    const {
      isLoading,
      pageProps: { spaceId },
    } = this.props;
    if (
      prevProps.space &&
      prevProps.space.id &&
      prevProps.space.id !== Number(spaceId) &&
      !isLoading
    ) {
      this.init();
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(spaceActions.clearSpace());
    this._isMounted = false;
    window.removeEventListener('scroll', () => this.watchCurrentPosition(), true);
    window.removeEventListener('resize', () => this.checkResize(), true);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { dispatch, space, user, isLoading } = nextProps;
    const { isLoadedRoom } = prevState;

    if (user && user.name !== undefined && !isLoadedRoom && space && !isLoading) {
      const {
        pageProps: { spaceId },
      } = this.props;
      dispatch(
        messagesActions.fetchRoomsIdStart({
          guestId: (user && user.id) || 0,
          hostId: (space && space.userId) || 0,
          spaceId,
        }),
      );
      return { isLoadedRoom: true };
    }

    if (space && space.id) {
      const { title, addressPref, addressCity, introduction, id } = space;

      const { imageUrl } = space.images[0];
      const ogImageUrl = imageUrl.includes('data:image/png;base64,')
        ? null
        : space.images[0].imageUrl;

      const meta = {
        title: `${title} ${addressPref}${addressCity}の空きスペース - モノオク`,
        description: introduction,
        url: `space/${id}`,
        imageUrl: ogImageUrl,
      };

      ReactGA.plugin.execute('ec', 'addProduct', {
        id: space.id,
        name: space.title,
      });
      ReactGA.plugin.execute('ec', 'setAction', 'detail');

      return { meta };
    }
    return null;
  }

  // TODO: useEffectを使って下位コンポーネント側で実行するよう改修する。
  init = () => {
    const {
      dispatch,
      pageProps: { spaceId },
    } = this.props;

    dispatch(spaceActions.clearSpace());
    dispatch(spaceActions.fetchSpace({ spaceId }));
    dispatch(spaceActions.addSpaceAccessLog({ spaceId }));
    // dispatch(spaceActions.getRecommendSpaces({ spaceId }));
  };

  checkResize = () => {
    const { queue } = this.state;
    clearTimeout(queue);
    const queueFunction = setTimeout(() => {
      this.setState({ isOverTablet: isOverTabletWindow() });
    }, 100);
    this.setState({ queue: queueFunction });
  };

  makeMetaBreadcrumbs = space => {
    const { addressPref, addressCity, addressTown, prefCode, cityCode, townCode } = space;

    const baseUrl = 'https://monooq.com';
    const itemList = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'トップ',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${addressPref}のスペース`,
        item: `${baseUrl}/pref${prefCode}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${addressCity}のスペース`,
        item: `${baseUrl}/pref${prefCode}/city${cityCode}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: `${addressTown}のスペース`,
        item: `${baseUrl}/pref${prefCode}/city${cityCode}/town${townCode}`,
      },
    ];

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: itemList,
    };
  };

  showContent = () => {
    // const { space, user, isRequesting, recommendSpaces, roomId } = this.props;
    const { space: _space, user, isRequesting, roomId } = this.props;
    const {
      meta: { title, description, url, imageUrl },
      isOverTopView,
      isBottom,
      isModalOpen,
      isModalOpenSP,
      isOverTablet,
    } = this.state;

    // const recommend = recommendSpaces
    //   ? recommendSpaces.map(s => ({
    //       id: s.id,
    //       image: (s.images[0] || {}).imageUrl,
    //       title: s.title,
    //       address: `${s.addressPref}${s.addressCity}`,
    //       priceFull: s.priceFull,
    //       priceTatami: s.priceTatami,
    //       lastLoginAt: s.user.lastLoginAt,
    //       onClick: () => this.onClickSpace(s),
    //     }))
    //   : null;

    // let space = {};
    // if (!_space) {
    //   space = {
    //     images: [],
    //     tags: [],
    //     user: {},
    //   };
    // } else {
    //   space = _space;
    // }
    const space = {
      images: [],
      tags: [],
      user: {},
      ..._space,
    };

    return (
      <BaseLayout
        title={title}
        description={description}
        ogUrl={url}
        ogImageUrl={imageUrl}
        noindex={space.status === 'draft'}
        jsonLd={this.makeMetaBreadcrumbs(space)}
      >
        <BaseTemplate maxWidth={1440} noMargin>
          <Detail
            loading={isRequesting}
            space={space}
            images={space.images.map(image => ({
              original: image.imageUrl || dummySpaceImage,
              thumbnail: image.imageUrl || dummySpaceImage,
            }))}
            tagList={space.tags.map(v => v.name)}
            loginUser={user}
            user={{
              id: space.user.id,
              name: space.user.name,
              imageUrl: space.user.imageUrl,
              profile: space.user.profile,
              prefCode: space.user.prefCode,
              lastLoginAt: space.user.lastLoginAt,
            }}
            // recommend={recommend}
            isOverTopView={isOverTopView}
            isBottom={isBottom}
            isModalOpen={isModalOpen}
            handleModalOpen={() => this.setState({ isModalOpen: true })}
            handleModalClose={() => this.setState({ isModalOpen: false })}
            isModalOpenSP={isModalOpenSP}
            handleModalOpenSP={() => this.setState({ isModalOpenSP: true })}
            handleModalCloseSP={() => this.setState({ isModalOpenSP: false })}
            roomId={roomId}
            isOverTablet={isOverTablet}
          />
        </BaseTemplate>
      </BaseLayout>
    );
  };

  setStateOverTopView = (isOverTopView, isBottom) => {
    if (this._isMounted) {
      this.setState({ isOverTopView, isBottom });
    }
  };

  scrollTop = () => {
    const isWebKit = this.browser ? this.browser.isWebKit : false;
    let tgt;

    if ('scrollingElement' in document) {
      tgt = document.scrollingElement;
    } else if (isWebKit) {
      tgt = document.body;
    } else {
      tgt = document.documentElement;
    }
    const scrollTop = (tgt && tgt.scrollTop) || 0;
    return Math.max(window.pageYOffset, scrollTop);
  };

  watchCurrentPosition() {
    if (window.parent.screen.width > 768) {
      const positionScroll = this.scrollTop();
      this.setStateOverTopView(false, false);

      if (positionScroll > 485) {
        const { body } = window.document;
        const html = window.document.documentElement;

        const scrollTop = body.scrollTop || html.scrollTop;
        const scrollBottom = html.scrollHeight - html.clientHeight - scrollTop;

        if (scrollBottom > 450) {
          this.setStateOverTopView(true, false);
        } else {
          this.setStateOverTopView(true, true);
        }
      }
    }
  }

  render() {
    const { space } = this.props;
    return !space || (space && !space.id) ? <LoadingPage /> : this.showContent();
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  space: state.space.space,
  isLoading: state.space.isLoading,
  // recommendSpaces: state.space.recommendSpaces,
  isRequesting: state.request.isLoading,
  roomId: state.messages.roomId,
});

export default connect(mapStateToProps)(SpacePage);

export const getServerSideProps = ({ query: { spaceId } }) => {
  return {
    props: {
      spaceId,
    },
  };
};
