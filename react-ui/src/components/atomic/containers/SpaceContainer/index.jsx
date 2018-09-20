// @flow

import React, { Component } from 'react';
import numeral from 'numeral';

import Path from 'config/path';

import { getRoomId, createRoom } from 'redux/modules/messages';
import { spaceActions } from 'redux/modules/space';
import { uiActions } from 'redux/modules/ui';

import SpaceTemplate from 'components/atomic/templates/SpaceTemplate';
import Header from 'components/atomic/containers/Header';
import SpaceMap from 'components/atomic/LV1/SpaceMap';
import Detail from 'components/atomic/LV3/Space/Detail';
import Price from 'components/atomic/LV3/Space/Price';
import SendMessage from 'components/atomic/LV3/Space/SendMessage';
import Note from 'components/atomic/LV2/Space/Note';
import Footer from 'components/atomic/LV2/Footer';
import LoadingPage from 'components/atomic/LV3/LoadingPage';
import Meta from 'components/Meta';

import type { SpaceType } from 'types/Space';

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

type State = {
  isLoading: boolean,
};

const SPACE_TYPES = ['', 'クローゼット', '押入れ', '部屋', '屋外倉庫', 'その他'];
const ReceiptType = {
  Both: 1,
  Meeting: 2,
  Delivery: 3,
};

class SpaceContainer extends Component<PropTypes, State> {
  constructor(props: PropTypes) {
    super(props);

    const { dispatch, match } = props;

    const spaceId = match.params.space_id;
    dispatch(spaceActions.fetchSpace({ spaceId }));

    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(spaceActions.clearSpace());
  }

  onClickSendMessage: Function;
  onClickSendMessage = async () => {
    const { dispatch, location, user, space, history } = this.props;

    // 未ログインの場合はログイン画面へ
    if (!user.ID) {
      dispatch(uiActions.setUiState({ redirectPath: location.pathname }));
      history.push(Path.login());
    } else {
      try {
        this.setState({ isLoading: true });
        const userId = user.ID;
        const spaceUserId = space.UserID;
        const spaceId = space.ID;
        let roomId = await getRoomId(userId, spaceUserId, spaceId);
        if (!roomId) {
          roomId = await createRoom(
            userId,
            user.FirebaseUid,
            spaceUserId,
            space.Host.FirebaseUid,
            spaceId,
          );
          window.dataLayer.push({ event: 'newRequest' }); // GTM
        }
        history.push(Path.message(roomId));
      } finally {
        // TODO sagaに乗せる
        this.setState({ isLoading: false });
      }
    }
  };

  render() {
    const { user, space, isLoading } = this.props;

    if (!user || !space || !space.Images || isLoading) {
      return <LoadingPage />;
    }

    const isSelfSpace = user.ID === (space.Host || {}).ID;

    const { ImageUrl } = space.Images[0];
    const ogImageUrl = ImageUrl.includes('data:image/png;base64,')
      ? null
      : space.Images[0].ImageUrl;

    return (
      <SpaceTemplate
        meta={
          <Meta
            title={`${space.Title} - ${space.AddressPref}${
              space.AddressCity
            }の空きスペース | モノオク`}
            description={`${space.Introduction}`}
            ogUrl={`space/${space.ID}`}
            ogImageUrl={ogImageUrl}
          />
        }
        header={<Header />}
        map={<SpaceMap lat={(space.location || {}).lat} lng={(space.location || {}).lng} />}
        detail={
          <Detail
            pref={space.AddressPref}
            city={space.AddressCity}
            town={space.AddressTown}
            name={space.Title}
            images={space.Images.map(image => ({
              original: image.ImageUrl,
              thumbnail: image.ImageUrl,
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
          />
        }
        price={
          <Price
            full={numeral(space.PriceFull).format('0,0')}
            half={space.PriceHalf > 0 && numeral(space.PriceHalf).format('0,0')}
            quarter={space.PriceQuarter > 0 && numeral(space.PriceQuarter).format('0,0')}
          />
        }
        message={
          <SendMessage
            disabled={isSelfSpace}
            onClick={isSelfSpace ? null : this.onClickSendMessage}
            loading={this.state.isLoading}
          />
        }
        note={<Note />}
        footer={<Footer />}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    space: state.space.space,
    isLoading: state.space.isLoading,
  };
}

export default connect(
  SpaceContainer,
  mapStateToProps,
);
