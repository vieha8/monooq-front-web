// @flow

import React, { Component } from 'react';
import numeral from 'numeral';

import Path from 'config/path';

import { getRoomId, createRoom } from 'redux/modules/messages';
import { spaceActions } from 'redux/modules/space';
import { uiActions } from 'redux/modules/ui';

import SpaceTemplate from 'components/atomic/templates/SpaceTemplate';
import Header from 'components/atomic/organisms/Header';
import SpaceMap from 'components/atomic/atoms/SpaceMap';
import Detail from 'components/atomic/organisms/Space/Detail';
import Price from 'components/atomic/organisms/Space/Price';
import SendMessage from 'components/atomic/organisms/Space/SendMessage';
import Footer from 'components/atomic/molecules/Footer';

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
  space: {
    Host: {
      ID: number,
      FirebaseUid: string,
      ImageUrl: string,
      Name: string,
      Profile: string,
    },
    AddressPref: string,
    AddressCity: string,
    AddressTown: string,
    Title: string,
    Images: Array<{
      ImageUrl: string,
    }>,
    Introduction: string,
    Type: number,
    IsFurniture: boolean,
    About: string,
    ReceiptAbout: string,
    PriceFull: number,
    PriceHalf: number,
    PriceQuarter: number,
    location: {
      lat: number,
      lng: number,
    },
  },
}

type State = {
  isLoading: boolean,
};

const SPACE_TYPES = [
  '',
  'クローゼット',
  '押入れ',
  '部屋',
  '屋外倉庫',
  'その他',
];

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
            spaceId);
        }
        history.push(Path.message(roomId));
      } finally {
        // TODO sagaに乗せる
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { user, space } = this.props;

    if (!space || !space.Images) {
      // TODO インジケーター
      return null;
    }

    const isSelfSpace = user.ID === (space.Host || {}).ID;

    return (
      <SpaceTemplate
        header={<Header />}
        map={
          <SpaceMap
            lat={(space.location || {}).lat}
            lng={(space.location || {}).lng}
          />
        }
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
            delivery
            meeting
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
            half={numeral(space.PriceHalf).format('0,0')}
            quarter={numeral(space.PriceQuarter).format('0,0')}
          />
        }
        message={
          <SendMessage
            disabled={isSelfSpace}
            onClick={isSelfSpace ? null : this.onClickSendMessage}
            loading={this.state.isLoading}
          />
        }
        footer={<Footer />}
      />
    );
  }
}

function mapStateToProps(state) {
  return ({
    user: state.auth.user,
    space: state.space.space,
  });
}

export default connect(SpaceContainer, mapStateToProps);
