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
    };
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

  showLeftContent = () => {
    const { space, user, isRequesting, recommendSpaces } = this.props;
    const {
      meta: { title, description, url, imageUrl },
    } = this.state;
    const isSelfSpace = user.id === (space.user || {}).id;

    const isNoIndex = space.status !== 'public';

    const recommend = recommendSpaces
      ? recommendSpaces.map(s => ({
          id: s.id,
          image: (s.images[0] || {}).imageUrl,
          title: s.title,
          address: `${s.addressPref}${s.addressCity}`,
          isFurniture: s.isFurniture,
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
        />
        <Detail
          id={space.id}
          map={<SpaceMap lat={space.lat} lng={space.lng} />}
          pref={space.addressPref}
          name={space.title}
          images={space.images.map(image => ({
            original: image.imageUrl || dummySpaceImage,
            thumbnail: image.imageUrl || dummySpaceImage,
          }))}
          // TODO: 【API連携】ステータス(1:満室,2:要相談,これ以外:空室)
          statusAvailability={0}
          // TODO: 【API連携】パンくずリスト
          breadcrumbsList={[
            {
              text: '神奈川県',
            },
            {
              text: '川崎市',
            },
            {
              text: '中原区',
            },
            {
              text: '下沼部',
            },
          ]}
          description={space.introduction}
          // TODO: 【API連携】スペースの広さ
          breadth="4畳以上12畳未満"
          // TODO:【API連携】タグ
          tagList={[
            '4畳以上',
            '1階',
            'ダンボール1箱〜',
            '4畳以上4畳以上4畳以上',
            '1階1階',
            'ダンボール1箱〜ダンボール1箱〜ダンボール1箱〜',
            '4畳以上',
            '1階',
            'ダンボール1箱〜',
          ]}
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
          // TODO: 【API連携】現状固定値なので、API連携する
          priceTatami={numeral(3123).format('0,0')}
          // priceTatami={space.priceTatami > 0 && numeral(space.priceTatami).format('0,0')}

          recommend={recommend}
          requestButtondisabled={isSelfSpace}
          requestButtonloading={isRequesting}
          requestButtononClick={isSelfSpace ? null : this.onClickSendMessage}
          onKeyDownButtonRequest={isSelfSpace ? null : this.onKeyDownButtonMessage}
        />
        <SendMessageOnlyTabletSp
          priceTatami={numeral(3123).format('0,0')}
          disabled={isSelfSpace}
          loading={isRequesting}
          onClick={isSelfSpace ? null : this.onClickSendMessage}
          onKeyDownButtonMessage={isSelfSpace ? null : this.onKeyDownButtonMessage}
        />
      </Fragment>
    );
  };

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
