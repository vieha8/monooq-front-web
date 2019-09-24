// @flow

import React, { Component, Fragment } from 'react';
import numeral from 'numeral';
import Path from 'config/path';
import { Redirect } from 'react-router-dom';
import ContentPageMenu from 'components/hocs/ContentPageMenu';
import handleBeforeUnload from 'components/hocs/HandleBeforeUnload';
import SpaceMap from 'components/LV1/SpaceMap';
import ButtonEntry from 'components/LV2/Forms/ButtonEntry';
import Detail from 'components/LV3/Space/Detail';
import { Height as HeaderHeight, HeightPhone as HeaderHeightPhone } from 'components/LV3/Header';

import styled from 'styled-components';
import { Colors, Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import dummySpaceImage from 'images/dummy_space.png';
import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';
import { iskeyDownEnter } from 'helpers/keydown';
import { spaceActions } from '../../../redux/modules/space';
import { formatRemoveComma } from '../../../helpers/string';

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
  space: {
    id: number,
    user: {
      id: number,
      firebaseUid: string,
      imageUrl: string,
      name: string,
      profile: string,
    },
    addressPref: string,
    addressCity: string,
    addressTown: string,
    title: string,
    images: Array<{
      imageUrl: string,
    }>,
    introduction: string,
    type: number,
    isFurniture: boolean,
    about: string,
    receiptAbout: string,
    priceFull: number,
    priceHalf: number,
    priceQuarter: number,
    location: {
      lat: number,
      lng: number,
    },
    status: string,
  },
};

const SPACE_TYPES = ['', 'クローゼット・押入れ', '', '部屋', '屋外倉庫', 'その他'];
const ReceiptType = {
  Both: 1,
  Meeting: 2,
  Delivery: 3,
};

const ConfirmMessage = styled.div`
  width: 100%;
  height: 54px;
  display: block;
  position: fixed;
  left: 0px;
  top: ${HeaderHeight}px;
  z-index: 100;
  text-align: center;
  padding: ${Dimens.medium_17}px;
  line-height: 22px;
  font-size: ${FontSizes.small_15}px;
  font-weight: bold;
  color: ${Colors.white};
  background-color: ${Colors.brandPrimary};
  ${media.tablet`
    top: ${HeaderHeightPhone}px;
  `};
`;

const EntryButtonWrap = styled.div`
  width: 100%;
  max-width: 100%;
  display: block;
  position: fixed;
  left: 0px;
  bottom: 0px;
  z-index: 100;
  text-align: center;
  padding: ${Dimens.medium}px;
  background-color: ${Colors.white};
  border-top: 1px solid ${Colors.borderGray};
`;

const Spacer = styled.div`
  margin: ${Dimens.medium3_40}px auto 0;
`;

class SpaceEditConfirmContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    this.state = {
      isUpdate: false,
    };

    const spaceId = props.match.params.space_id;

    if (spaceId) {
      this.state.isUpdate = true;
    }
  }

  onKeyDownButtonNext = e => {
    if (iskeyDownEnter(e)) {
      this.onClickNext();
    }
  };

  onKeyDownButtonBack = e => {
    if (iskeyDownEnter(e)) {
      this.onClickBack();
    }
  };

  onClickNext = () => {
    const { dispatch, space, user } = this.props;
    const { isUpdate } = this.state;

    const saveSpace = Object.assign(space);

    if (isUpdate) {
      dispatch(
        spaceActions.updateSpace({
          spaceId: space.id,
          body: {
            userId: user.id,
            ...saveSpace,
          },
        }),
      );
    } else {
      dispatch(spaceActions.createSpace({ body: { userId: user.id, ...saveSpace } }));
    }
  };

  onClickBack = () => {
    const { history, space } = this.props;
    const { isUpdate } = this.state;

    const nextPath = isUpdate ? Path.spaceEditPrice(space.id) : Path.createSpacePrice();
    history.push(nextPath);
  };

  render() {
    const { space, isLoading, isComplete } = this.props;
    const { isUpdate } = this.state;

    if (isUpdate) {
      if (!space.id) {
        return <Redirect to={Path.createSpaceInfo()} />;
      }
    } else if (space.images === undefined) {
      return <Redirect to={Path.createSpaceInfo()} />;
    }

    if (!isLoading && isComplete) {
      if (isUpdate) {
        return <Redirect to={Path.spaceEditCompletion(space.id)} />;
      }
      return <Redirect to={Path.createSpaceCompletion()} />;
    }

    const { user } = this.props;
    return (
      <Fragment>
        <ConfirmMessage>実際にお客様にこのように表示されます</ConfirmMessage>
        <Spacer />
        <Detail
          confirm
          id={space.id}
          map={<SpaceMap lat={space.lat} lng={space.lng} />}
          pref={space.addressPref}
          city={space.addressCity}
          town={space.addressTown}
          name={space.title}
          images={space.images.map(image => ({
            original: image.imageUrl || image.tmpUrl || image.preview || dummySpaceImage,
            thumbnail: image.imageUrl || image.tmpUrl || image.preview || dummySpaceImage,
          }))}
          description={space.introduction}
          address={`${space.addressPref}${space.addressCity}${space.addressTown}`}
          type={SPACE_TYPES[space.type]}
          furniture={space.isFurniture}
          baggage={space.about}
          delivery={
            space.receiptType === ReceiptType.Both || space.receiptType === ReceiptType.Delivery
          }
          meeting={
            space.receiptType === ReceiptType.Both || space.receiptType === ReceiptType.Meeting
          }
          supplement={space.receiptAbout}
          user={{
            id: user.id,
            name: user.name,
            imageUrl: user.imageUrl,
            profile: user.profile,
          }}
          pricefull={numeral(space.priceFull).format('0,0')}
          pricehalf={
            formatRemoveComma(space.priceHalf) > 0 && numeral(space.priceHalf).format('0,0')
          }
          pricequarter={
            formatRemoveComma(space.priceQuarter) > 0 && numeral(space.priceQuarter).format('0,0')
          }
        />
        <EntryButtonWrap>
          <ButtonEntry
            enabled
            relative
            loading={isLoading}
            backButton={{
              text: '戻って修正する',
              onClick: this.onClickBack,
              onKeyDown: this.onKeyDownButtonBack,
            }}
            enabledButton={{
              text: `登録する`,
              onClick: this.onClickNext,
              onKeyDown: this.onKeyDownButtonNext,
            }}
          />
        </EntryButtonWrap>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isComplete: state.space.isComplete,
  user: state.auth.user,
  space: state.ui.space || {},
  isLoading: state.space.isLoading,
  geocode: state.space.geocode,
});

export default authRequired(
  handleBeforeUnload(
    ContentPageMenu(connect(mapStateToProps)(SpaceEditConfirmContainer), {
      noFooter: true,
    }),
  ),
);
