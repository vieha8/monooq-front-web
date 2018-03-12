import React, {Fragment} from 'react';
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
import { isExistRoom, createRoom } from 'redux/modules/messages';
import { spaceActions } from "../../redux/modules/space";

const SpacePage = styled.div`
  background: ${Colors.lightGray2Bg};
`;

const CardContainer = styled.div`
  padding: 0 8%;

  &::after {
    clear: both;
    content: "";
    display: block;
  }

  ${media.phone`
    padding: 0;
  `}
`;

const MobileContainer = styled.div`
  ${media.phone`
    padding: ${Dimens.medium}px;
  `}
`;

const SpaceCardContainer = styled.div`
  max-width: 688px;
  width: 100%;
  margin-top: 80px;
  padding-bottom: 80px;
  float: left;

  ${media.phone`
    float: none;
    max-width: 100%;
    margin-top: 0;
    padding: 0 ${Dimens.medium};
    padding-bottom: 0;
  `}
`;

const PriceCardContainer = styled.div`
  max-width: 340px;
  width: 100%;
  margin-top: 80px;
  padding-bottom: 80px;
  float: right;

  ${media.phone`
    float: none;
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
  
  ${media.phone`
    margin-top: ${Dimens.medium}px;
  `}
`;

const MapContainer = styled.div`
  margin-top: -20px;
  height: 360px;
  ${media.phone`
    height: 240px;  
  `}
`;

class Space extends React.Component {

  constructor(props) {
    super(props);
    const spaceId = props.match.params.space_id;
    props.dispatch(spaceActions.fetchSpace({ spaceId: spaceId }));
  }

  sendMessage = async (props) => {
    // TODO ホストとユーザーのIDをpropsからひっぱってくる
    const userId1 = props.userId;
    const userId2 = 'hogehoge';
    let roomId = await isExistRoom(userId1, userId2);
    if (!roomId) {
      roomId = await createRoom(userId1, userId2);
    }
    props.history.push(Path.message(roomId));
  };

  render() {
    const props = this.props;
    const space = props.space;

    if(!space){
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
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCrHQDZXZI21cMEW8FIYYWKyvI2kLUDsbA&v=3.exp&libraries=geometry,drawing,places"
        />
        <CardContainer>
          <SpaceCardContainer>
            <Card>
              <MobileContainer>
                <MenuContainer>
                  <TableCell>
                    <PlaceText>東京都</PlaceText>
                  </TableCell>
                  <TableCell align="right">
                    <SpaceMenu />
                  </TableCell>
                </MenuContainer>
                <HeaderTitle>{space.Title}</HeaderTitle>
                <SlideImageWrapper>
                  <SlideImage
                    images={[
                      {
                        original: 'http://placehold.jp/500x300.png',
                        thumbnail: 'http://placehold.jp/500x300.png',
                      },
                      {
                        original: 'http://placehold.jp/500x300.png',
                        thumbnail: 'http://placehold.jp/500x300.png',
                      },
                      {
                        original: 'http://placehold.jp/500x300.png',
                        thumbnail: 'http://placehold.jp/500x300.png',
                      },
                    ]}
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
                    renderContent={() => <DetailContent.Address>{space.Address}</DetailContent.Address>}
                  />
                  <DetailContainer
                    title="種類"
                    renderContent={() => <DetailContent.SpaceType>{space.Type}</DetailContent.SpaceType>}
                  />
                </Section>
                <Section>
                  <DetailTitle>荷物について</DetailTitle>
                </Section>
                <Section>
                  <DetailContainer
                    title="預かることができる荷物"
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
                    src: 'https://placehold.jp/150x150.png',
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
              onClickSendMessage={() => this.sendMessage(props)}
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
  userId: state.auth.user.id,
  space: state.space.space,
});

export default connect(mapStateToProps)(withRouter(Space));
