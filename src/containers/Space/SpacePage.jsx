import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import Path from 'config/path';
import { isMobileWindow, media } from 'helpers/style/media-query';
import { Colors, Dimens } from 'variables';
import { Footer } from 'components/Shared';
import {
  Caption,
  Card,
  DetailContainer,
  DetailContent,
  DetailTitle,
  HeaderTitle,
  HostInfo,
  Map,
  PlaceText,
  PriceContent,
  PriceTitle,
  ReportLink,
  SendMessageButton,
  SlideImage,
} from 'components/Space';

import SpaceMenu from 'containers/Search/SpaceMenu';
import { getRoomId, createRoom } from 'redux/modules/messages';
import { spaceActions } from 'redux/modules/space';

const SpacePage = styled.div`
  background: ${Colors.lightGray2Bg};
`;

const CardContainer = styled.div`
  padding: 0 92px;

  &::after {
    clear: both;
    content: "";
    display: block;
  }

  ${media.tablet`
    padding: 0;
  `}
`;

const MobileContainer = styled.div`
  ${media.tablet`
    padding: ${Dimens.medium}px;
  `}
`;

const SpaceCardContainer = styled.div`
  max-width: 720px;
  width: 60%;
  margin-top: 80px;
  padding-bottom: 80px;
  float: left;

  ${media.tablet`
    float: none;
    width: 100%;
    max-width: 100%;
    margin-top: 0;
    padding: 0 ${Dimens.medium};
    padding-bottom: 0;
  `}
`;

const PriceCardContainer = styled.div`
  max-width: 340px;
  width: 40%;
  margin-top: 80px;
  padding-bottom: 80px;
  float: right;

  ${media.tablet`
    float: none;
    width: 100%;
    max-width: 100%;
    margin-top: 0;
    padding: 0 ${Dimens.medium};
    padding-bottom: 40px;
  `}
`;

const MenuContainer = styled.div`
  display: table;
`;

const TableCell = styled.div`
  display: table-cell;
  width: 100%;
  text-align: ${props => props.align || 'left'};
`;

const Section = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const SlideImageWrapper = styled.div`
  margin-top: ${Dimens.medium3}px;
  
  ${media.tablet`
    margin-top: ${Dimens.medium}px;
  `}
`;

const MapContainer = styled.div`
  margin-top: -20px;
  height: 360px;
  ${media.tablet`
    height: 240px;  
  `}
`;

const spaceTypes = [
  '',
  'クローゼット',
  '押入れ',
  '部屋',
  '屋外倉庫',
  'その他',
];
const KEY = 'AIzaSyCrHQDZXZI21cMEW8FIYYWKyvI2kLUDsbA';

class Space extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch, match } = props;

    const spaceId = match.params.space_id;
    dispatch(spaceActions.fetchSpace({ spaceId }));
  }

  sendMessage = async () => {
    const { userId, space, history } = this.props;
    const userId1 = userId;
    const userId2 = space.UserID;
    const spaceId = space.ID;
    let roomId = await getRoomId(userId1, userId2, spaceId);
    if (!roomId) {
      roomId = await createRoom(userId1, userId2, spaceId);
    }
    history.push(Path.message(roomId));
  };

  render() {
    const { space } = this.props;

    if (!space || !space.Images) {
      return (
        <SpacePage>
          {/*TODO インジケーター*/}
        </SpacePage>
      );
    }

    return (
      <SpacePage>
        {/* TODO マップのprops調整 */}
        <Map
          containerElement={<MapContainer />}
          mapElement={<div style={{ height: '100%' }} />}
          loadingElement={<div style={{ height: '100%' }} />}
          lat={space.location.lat}
          lng={space.location.lng}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${KEY}&v=3.exp&libraries=geometry,drawing,places`}
        />
        <CardContainer>
          <SpaceCardContainer>
            <Card>
              <MobileContainer>
                <MenuContainer>
                  <TableCell>
                    <PlaceText>{space.AddressPref} {space.AddressCity} {space.AddressTown}</PlaceText>
                  </TableCell>
                  <TableCell align="right">
                    <SpaceMenu />
                  </TableCell>
                </MenuContainer>
                <HeaderTitle>{space.Title}</HeaderTitle>
                <SlideImageWrapper>
                  <SlideImage
                    images={space.Images.map((v) => ({original: v.ImageUrl, thumbnail: v.ImageUrl}))}
                  />
                </SlideImageWrapper>
                <Section>
                  <Caption>{space.Introduction}</Caption>
                </Section>
                <Section>
                  <DetailTitle>スペースについて</DetailTitle>
                </Section>
                <Section>
                  <DetailContainer
                    title="所在地"
                    renderContent={() => <DetailContent.Address>{space.AddressPref}{space.AddressCity}{space.AddressTown}</DetailContent.Address>}
                  />
                  <DetailContainer
                    title="種類"
                    renderContent={() => (
                      <DetailContent.SpaceType>
                        {spaceTypes[space.Type]}
                      </DetailContent.SpaceType>
                    )}
                  />
                </Section>
                <Section>
                  <DetailTitle>荷物について</DetailTitle>
                </Section>
                <Section>
                  <DetailContainer
                    title="このスペースに置ける荷物"
                    renderContent={() => (
                      <DetailContent.BaggegeType
                        typeOK={space.IsFurniture}
                        text={space.About}
                      />
                    )}
                  />
                  <DetailContainer
                    title="受取り方法"
                    renderContent={() => (
                      <DetailContent.HowToReceive delivery meeting />
                    )}
                  />
                  <DetailContainer
                    title="受取りについて補足"
                    renderContent={() => (
                      <DetailContent.ReceiveSupplement text={space.ReceiptAbout} />
                    )}
                  />
                </Section>
              </MobileContainer>
              <Section>
                <HostInfo
                  img={{
                    src: space.Host.ImageUrl,
                    alt: space.Host.Name,
                  }}
                  hostName={space.Host.Name}
                  text={space.Host.Profile}
                />
              </Section>
            </Card>
          </SpaceCardContainer>
          <PriceCardContainer>
            <Card>
              <MobileContainer>
                <PriceTitle />
                <div>
                  <PriceContent
                    title="スペースまるごと"
                    price={space.PriceFull}
                    caption="スペースのほとんどを使用する荷物の場合の料金"
                  />
                  <PriceContent
                    title="スペース半分"
                    price={space.PriceHalf}
                    caption="スペースの半分程度を使用する荷物の場合の料金"
                  />
                  <PriceContent
                    title="スペース1/4"
                    price={space.PriceQuarter}
                    caption="スペースの4分の1程度を使用する荷物の場合の料金"
                  />
                </div>
              </MobileContainer>
            </Card>
            {isMobileWindow() &&
              <Section>
                <ReportLink />
              </Section>
            }
            <SendMessageButton
              onClickSendMessage={() => this.sendMessage()}
            />
            {!isMobileWindow() &&
              <Section>
                <ReportLink />
              </Section>
            }
          </PriceCardContainer>
        </CardContainer>
        {!isMobileWindow() && <Footer />}
      </SpacePage>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.auth.user.ID,
  space: state.space.space,
  ui: state.ui,
});

export default connect(mapStateToProps)(withRouter(Space));
