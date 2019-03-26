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
      return;
    }
    dispatch(requestActions.request({ user, space }));
  };

  render() {
    const { user, space, isLoading, isRequesting } = this.props;

    if (!user || !space || !space.Images || isLoading) {
      return <LoadingPage />;
    }

    const isSelfSpace = user.ID === (space.Host || {}).ID;

    const { ImageUrl } = space.Images[0];
    const ogImageUrl = ImageUrl.includes('data:image/png;base64,')
      ? null
      : space.Images[0].ImageUrl;

    return (
      <MenuPageTemplate
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
        leftContent={
          <Fragment>
            <Detail
              id={space.ID}
              map={<SpaceMap lat={space.Latitude} lng={space.Longitude} />}
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
        }
        rightContent={<ServiceMenu />}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    space: state.space.space,
    isLoading: state.space.isLoading,
    isRequesting: state.request.isLoading,
  };
}

export default connect(
  SpaceContainer,
  mapStateToProps,
);
