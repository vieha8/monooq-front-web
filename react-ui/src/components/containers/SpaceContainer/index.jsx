import React, { Component, Fragment } from 'react';
import numeral from 'numeral';
import Path from 'config/path';
import { spaceActions } from 'redux/modules/space';
import { uiActions } from 'redux/modules/ui';
import { requestActions } from 'redux/modules/request';
import ContentPageMenu from 'components/hocs/ContentPageMenu';
import SpaceMap from 'components/LV1/SpaceMap';
import Detail from 'components/LV3/Space/Detail';
import SendMessageOnlyTabletSp from 'components/LV3/Space/SendMessage';
import LoadingPage from 'components/LV3/LoadingPage';
import Meta from 'components/LV1/Meta';
import dummySpaceImage from 'images/dummy_space.png';
import { iskeyDownEnter } from 'helpers/keydown';

import { loggerActions } from 'redux/modules/logger';
import connect from '../connect';
import { getBreadths } from '../../../helpers/breadths';

const ReceiptType = {
  Both: 1,
  Meeting: 2,
  Delivery: 3,
};

class SpaceContainer extends Component {
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
    };
  }

  componentDidMount() {
    this._isMounted = true;
    window.addEventListener('scroll', () => this.watchCurrentPosition(), true);
  }

  componentDidUpdate(prevProps) {
    // おすすめから遷移した時はconstructorが発火しないのでここで
    const spaceId = this.props.match.params.space_id;
    if (prevProps.space && prevProps.space.id !== Number(spaceId) && !this.props.isLoading) {
      this.init();
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(spaceActions.clearSpace());
    this._isMounted = false;
    window.removeEventListener('scroll', () => this.watchCurrentPosition(), true);
  }

  static getDerivedStateFromProps(nextProps) {
    const { space } = nextProps;
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

      return { meta };
    }
    return null;
  }

  init = () => {
    const { dispatch, match } = this.props;
    const spaceId = match.params.space_id;

    dispatch(spaceActions.clearSpace());
    dispatch(spaceActions.fetchSpace({ spaceId }));
    dispatch(spaceActions.addSpaceAccessLog({ spaceId }));
    dispatch(spaceActions.getRecommendSpaces({ spaceId }));

    dispatch(
      loggerActions.recordEvent({
        event: 'space_views',
        detail: { spaceId },
      }),
    );
  };

  onClickSendMessage = async () => {
    const { dispatch, location, user, space, history } = this.props;
    // 未ログインの場合はログイン画面へ
    if (!user.id) {
      dispatch(uiActions.setUiState({ redirectPath: location.pathname }));
      history.push(Path.login());
      return;
    }
    dispatch(requestActions.request({ user, space }));
  };

  onKeyDownButtonMessage = e => {
    if (iskeyDownEnter(e)) {
      this.onClickSendMessage();
    }
  };

  makeBreadCrumbs = ({ addressPref, prefCode, addressCity, cityCode, addressTown, townCode }) => {
    const breadcrumbs = [];

    breadcrumbs.push({
      text: addressPref,
      link: Path.spacesByPrefecture(prefCode),
    });

    breadcrumbs.push({
      text: addressCity,
      link: Path.spacesByCity(prefCode, cityCode),
    });

    breadcrumbs.push({
      text: addressTown,
      link: Path.spacesByTown(prefCode, cityCode, townCode),
    });

    return breadcrumbs;
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

  showLeftContent = () => {
    const { space, user, isRequesting, recommendSpaces } = this.props;
    const {
      meta: { title, description, url, imageUrl },
      isOverTopView,
    } = this.state;
    const isSelfSpace = user.id === (space.user || {}).id;

    const isNoIndex = space.status === 'draft';

    const recommend = recommendSpaces
      ? recommendSpaces.map(s => ({
          id: s.id,
          image: (s.images[0] || {}).imageUrl,
          title: s.title,
          address: `${s.addressPref}${s.addressCity}`,
          priceFull: s.priceFull,
          priceTatami: s.priceTatami,
          onClick: () => this.onClickSpace(s),
        }))
      : null;

    return (
      <Fragment>
        <Meta
          title={title}
          description={description}
          ogUrl={url}
          ogImageUrl={imageUrl}
          noindex={isNoIndex}
          jsonLd={this.makeMetaBreadcrumbs(space)}
        />
        <Detail
          isOverTopView={isOverTopView}
          id={space.id}
          map={<SpaceMap lat={space.lat} lng={space.lng} />}
          pref={space.addressPref}
          name={space.title}
          images={space.images.map(image => ({
            original: image.imageUrl || dummySpaceImage,
            thumbnail: image.imageUrl || dummySpaceImage,
          }))}
          status={space.status}
          breadcrumbsList={this.makeBreadCrumbs(space)}
          description={space.introduction}
          breadth={getBreadths(space.sizeType)}
          tagList={space.tags.map(v => v.name)}
          address={`${space.addressPref}${space.addressCity}${space.addressTown}`}
          delivery={
            space.receiptType === ReceiptType.Both || space.receiptType === ReceiptType.Delivery
          }
          meeting={
            space.receiptType === ReceiptType.Both || space.receiptType === ReceiptType.Meeting
          }
          supplement={space.receiptAbout}
          user={{
            id: space.user.id,
            name: space.user.name,
            imageUrl: space.user.imageUrl,
            profile: space.user.profile,
          }}
          priceFull={numeral(space.priceFull).format('0,0')}
          priceTatami={space.priceTatami > 0 && numeral(space.priceTatami).format('0,0')}
          recommend={recommend}
          requestButtonDisabled={isSelfSpace}
          requestButtonLoading={isRequesting}
          requestButtonOnClick={isSelfSpace ? null : this.onClickSendMessage}
          onKeyDownButtonRequest={isSelfSpace ? null : this.onKeyDownButtonMessage}
        />
        <SendMessageOnlyTabletSp
          isRoom={space.sizeType < 3}
          priceFull={space.priceFull}
          priceTatami={space.priceTatami}
          disabled={isSelfSpace}
          loading={isRequesting}
          onClick={isSelfSpace ? null : this.onClickSendMessage}
          onKeyDownButtonMessage={isSelfSpace ? null : this.onKeyDownButtonMessage}
        />
      </Fragment>
    );
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
      if (this._isMounted) {
        this.setState({ isOverTopView: false });
      }
      if (positionScroll > 485) {
        if (this._isMounted) {
          this.setState({ isOverTopView: true });
        }
      }
    }
  }

  render() {
    const { space } = this.props;
    return !space ? <LoadingPage /> : this.showLeftContent();
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  space: state.space.space,
  isLoading: state.space.isLoading,
  recommendSpaces: state.space.recommendSpaces,
  isRequesting: state.request.isLoading,
});

export default ContentPageMenu(connect(SpaceContainer, mapStateToProps), {
  bottomMarginOnlySP: true,
  maxWidth: 1440,
  noMargin: true,
});
