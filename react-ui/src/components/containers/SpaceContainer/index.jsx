// @flow

import React, { Component, Fragment } from 'react';
import numeral from 'numeral';
import Path from 'config/path';
import { spaceActions } from 'redux/modules/space';
import { uiActions } from 'redux/modules/ui';
import { requestActions } from 'redux/modules/request';
import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import Header from 'components/containers/Header';
import SpaceMap from 'components/LV1/SpaceMap';
import Detail from 'components/LV3/Space/Detail';
import SendMessage from 'components/LV3/Space/SendMessage';
import LoadingPage from 'components/LV3/LoadingPage';
import Meta from 'components/LV1/Meta';
import type { SpaceType } from 'types/Space';
import dummySpaceImage from 'images/dummy_space.png';
import { iskeyDownEnter } from 'helpers/keydown';

import connect from '../connect';

type PropTypes = {
  dispatch: Function,
  history: {
    push: Function,
  },
  match: {
    params: {
      space_id: string,
    },
  },
  user: {
    id: number,
  },
  space: SpaceType,
};

const SPACE_TYPES = ['', 'クローゼット・押入れ', '', '部屋', '屋外倉庫', 'その他'];
const ReceiptType = {
  Both: 1,
  Meeting: 2,
  Delivery: 3,
};

class SpaceContainer extends Component<PropTypes> {
  constructor(props: PropTypes) {
    super(props);

    const { dispatch, match } = props;

    const spaceId = match.params.space_id;
    dispatch(spaceActions.fetchSpace({ spaceId }));
    dispatch(spaceActions.addSpaceAccessLog({ spaceId }));

    this.state = {
      meta: {
        title: '',
        description: '',
        url: '',
        imageUrl: '',
      },
    };
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
    const { space, user, isRequesting } = this.props;
    const isSelfSpace = user.id === (space.user || {}).id;
    return (
      <Fragment>
        <Detail
          id={space.id}
          map={<SpaceMap lat={space.lat} lng={space.lng} />}
          pref={space.addressPref}
          city={space.addressCity}
          town={space.addressTown}
          name={space.title}
          images={space.images.map(image => ({
            original: image.imageUrl || dummySpaceImage,
            thumbnail: image.imageUrl || dummySpaceImage,
          }))}
          description={space.introduction}
          address={`${space.addressPref}${space.addressCity}${space.addressTown}`}
          type={SPACE_TYPES[space.type]}
          furniture={space.isFurniture}
          aboutBaggage={space.about}
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
          pricefull={numeral(space.priceFull).format('0,0')}
          pricehalf={space.priceHalf > 0 && numeral(space.priceHalf).format('0,0')}
          pricequarter={space.priceQuarter > 0 && numeral(space.priceQuarter).format('0,0')}
        />
        <SendMessage
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
    const {
      meta: { title, description, url, imageUrl },
    } = this.state;

    return (
      <MenuPageTemplate
        meta={<Meta title={title} description={description} ogUrl={url} ogImageUrl={imageUrl} />}
        header={<Header />}
        leftContent={!space ? <LoadingPage /> : this.showLeftContent()}
        rightContent={<ServiceMenu />}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  space: state.space.space,
  isRequesting: state.request.isLoading,
});

export default connect(
  SpaceContainer,
  mapStateToProps,
);
