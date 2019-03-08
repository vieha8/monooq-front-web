// @flow

import React, { Component, Fragment } from 'react';
import numeral from 'numeral';
import Path from 'config/path';
import { Redirect } from 'react-router-dom';

import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import Header from 'components/atomic/containers/Header';
import SpaceMap from 'components/atomic/LV1/SpaceMap';
import EntryButtons from 'components/atomic/LV2/EntryButtons';
import Detail from 'components/atomic/LV3/Space/Detail';
import type { SpaceType } from 'types/Space';

import styled from 'styled-components';
import { Colors, Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import { checkLogin, checkAuthState, mergeAuthProps } from '../AuthRequired';
import connect from '../connect';
import { spaceActions } from '../../../../redux/modules/space';

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

const Validate = {
  Address: `(...??[都道府県])((?:旭川|伊達|石狩|盛岡|奥州|田村|南相馬|那須塩原|東村山|武蔵村山|羽村|十日町|上越|富山|野々市|大町|蒲郡|四日市|姫路|大和郡山|廿日市|下松|岩国|田川|大村)市|.+?郡(?:玉村|大町|.+?)[町村]|.+?市.+?区|.+?[市区町村郡])(\\D+)(.*)`,
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
  top: 64px;
  z-index: 100;
  text-align: center;
  padding: ${Dimens.medium_17}px;
  line-height: 22px;
  font-size: ${FontSizes.small_15}px;
  font-weight: bold;
  color: ${Colors.white};
  background-color: ${Colors.brandPrimary};
  ${media.tablet`
    top: 54px;
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
  margin: 40px auto 0;
  ${media.tablet`
  `};
`;

class EditSpaceConfirmContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    checkLogin(this.props);

    this.state = {
      isUpdate: false,
    };

    const { dispatch } = this.props;
    const spaceId = props.match.params.space_id;

    if (spaceId) {
      dispatch(spaceActions.prepareUpdateSpace(spaceId));
      this.state.isUpdate = true;
    }
  }

  handleBeforeUnload(e) {
    e.preventDefault();
    e.returnValue = 'データが保存されませんが、よろしいですか?';
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  }

  onClickNext: Function;

  onClickNext = () => {
    const { dispatch, space, user } = this.props;
    const saveSpace = Object.assign(space);

    if (space.ID) {
      dispatch(
        spaceActions.updateSpace({
          spaceId: space.ID,
          body: {
            userId: user.ID,
            ...saveSpace,
          },
        }),
      );
    } else {
      dispatch(spaceActions.createSpace({ body: { userId: user.ID, ...saveSpace } }));
    }
  };

  onClickBack: Function;

  onClickBack = () => {
    const { history, space } = this.props;

    const nextPath = space.ID ? Path.editSpacePrice(space.ID) : Path.createSpacePrice();
    history.push(nextPath);
  };

  render() {
    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

    const { user, space, isLoading, isComplete } = this.props;
    const { isUpdate } = this.state;

    if (isUpdate) {
      if (!space.ID) {
        return null;
      }
    } else if (space.Images === undefined) {
      return <Redirect to={Path.createSpaceInfo()} />;
    }

    if (!isLoading && isComplete) {
      if (space.ID) {
        return <Redirect to={Path.editSpaceCompletion(space.ID)} />;
      }
      return <Redirect to={Path.createSpaceCompletion()} />;
    }

    return (
      <MenuPageTemplate
        header={<Header />}
        leftContent={
          <Fragment>
            <ConfirmMessage>実際にお客様にこのように表示されます</ConfirmMessage>
            <Spacer />
            <Detail
              confirm
              id={space.ID}
              map={<SpaceMap lat={space.Latitude} lng={space.Longitude} />}
              pref={space.AddressPref}
              city={space.AddressCity}
              town={space.AddressTown}
              name={space.Title}
              images={space.Images.map(image => ({
                original: image.ImageUrl || image.preview,
                thumbnail: image.ImageUrl || image.preview,
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
                id: user.ID,
                name: user.Name,
                imageUrl: user.ImageUrl,
                profile: user.Profile,
              }}
              pricefull={numeral(space.PriceFull).format('0,0')}
              pricehalf={space.PriceHalf > 0 && numeral(space.PriceHalf).format('0,0')}
              pricequarter={space.PriceQuarter > 0 && numeral(space.PriceQuarter).format('0,0')}
            />
            <EntryButtonWrap>
              <EntryButtons
                enabled
                rerative
                loading={isLoading}
                backButton={{
                  text: '戻って修正する',
                  onClick: this.onClickBack,
                }}
                enabledButton={{
                  text: `登録する`,
                  onClick: this.onClickNext,
                }}
              />
            </EntryButtonWrap>
          </Fragment>
        }
        rightContent={
          <Fragment>
            <Spacer />
            <ServiceMenu />
          </Fragment>
        }
      />
    );
  }
}

const mapStateToProps = state =>
  mergeAuthProps(state, {
    isComplete: state.space.isComplete,
    user: state.auth.user,
    space: state.ui.space || {},
    isLoading: state.space.isLoading,
    geocode: state.space.geocode,
  });

export default connect(
  EditSpaceConfirmContainer,
  mapStateToProps,
);
