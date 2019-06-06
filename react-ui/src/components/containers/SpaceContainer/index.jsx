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
    ID: number,
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
    if (space && space.ID) {
      const { Title, AddressPref, AddressCity, Introduction, ID } = space;

      const { ImageUrl } = space.Images[0];
      const ogImageUrl = ImageUrl.includes('data:image/png;base64,')
        ? null
        : space.Images[0].ImageUrl;

      const meta = {
        title: `${Title} ${AddressPref}${AddressCity}の空きスペース - モノオク`,
        description: Introduction,
        url: `space/${ID}`,
        imageUrl: ogImageUrl,
      };

      return { meta };
    }
    return null;
  }

  onClickSendMessage: Function;
  onClickSendMessage = async () => {
    const { dispatch, location, user, space, history } = this.props;
    // 未ログインの場合はログイン画面へ
    if (!user.ID) {
      dispatch(uiActions.setUiState({ redirectPath: location.pathname }));
      history.push(Path.login());
      return;
    }
    dispatch(requestActions.request({ user, space }));
  };

  showLeftContent = () => {
    const { space, user, isRequesting } = this.props;
    const isSelfSpace = user.ID === (space.Host || {}).ID;
    return (
      <Fragment>
        <Detail
          id={space.ID}
          map={<SpaceMap lat={space.Latitude} lng={space.Longitude} />}
          pref={space.AddressPref}
          city={space.AddressCity}
          town={space.AddressTown}
          name={space.Title}
          images={space.Images.map(image => ({
            original: image.ImageUrl || dummySpaceImage,
            thumbnail: image.ImageUrl || dummySpaceImage,
          }))}
          description={space.Introduction}
          address={`${space.AddressPref}${space.AddressCity}${space.AddressTown}`}
          type={SPACE_TYPES[space.Type]}
          furniture={space.IsFurniture}
          aboutBaggage={space.About}
          delivery={
            space.ReceiptType === ReceiptType.Both || space.ReceiptType === ReceiptType.Delivery
          }
          meeting={
            space.ReceiptType === ReceiptType.Both || space.ReceiptType === ReceiptType.Meeting
          }
          supplement={space.ReceiptAbout}
          user={{
            id: space.Host.ID,
            name: space.Host.Name,
            imageUrl: space.Host.ImageUrl,
            profile: space.Host.Profile,
          }}
          pricefull={numeral(space.PriceFull).format('0,0')}
          pricehalf={space.PriceHalf > 0 && numeral(space.PriceHalf).format('0,0')}
          pricequarter={space.PriceQuarter > 0 && numeral(space.PriceQuarter).format('0,0')}
        />
        <SendMessage
          disabled={isSelfSpace}
          onClick={isSelfSpace ? null : this.onClickSendMessage}
          loading={isRequesting}
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

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    space: state.space.space,
    isRequesting: state.request.isLoading,
  };
}

export default connect(
  SpaceContainer,
  mapStateToProps,
);
