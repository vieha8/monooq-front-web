import React from 'react';
import styled from 'styled-components';

import RequestDialog from './RequestDialog';
import SpaceMenu from '../Search/SpaceMenu';

import { Colors, Dimens } from '../../variables';

import { Footer } from '../../stories/shared';
import {
  Card,
  Map,
  PlaceText,
  HeaderTitle,
  SlideImage,
  Caption,
  DetailTitle,
  DetailContainer,
  DetailContent,
  HostInfo,
} from '../../stories/space';

const SpacePage = styled.div`
  background: ${Colors.lightGray};
`;

const SpaceCardContainer = styled.div`
  max-width: 688px;
  width: 100%;
  margin-top: 80px;
  padding: 0 8%;
  padding-bottom: 80px;
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
`;

export default props => (
  <SpacePage>
    {/* TODO マップのprops調整 */}
    <Map
      containerElement={<div style={{ marginTop: '-20px', height: '360px' }} />}
      mapElement={<div style={{ height: '100%' }} />}
      loadingElement={<div style={{ height: '100%' }} />}
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCrHQDZXZI21cMEW8FIYYWKyvI2kLUDsbA&v=3.exp&libraries=geometry,drawing,places"
    />
    <SpaceCardContainer>
      <Card>
        <MenuContainer>
          <TableCell>
            <PlaceText>東京都 港区 六本木</PlaceText>
          </TableCell>
          <TableCell align="right">
            <SpaceMenu />
          </TableCell>
        </MenuContainer>
        <HeaderTitle>東京タワーに近くて便利！大きい荷物も何人分でもOK</HeaderTitle>
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
          <Caption>閲覧頂き有り難うございます！赤羽橋、芝公園などの駅付近で預かることが可能です。玄関から入れば大きめの荷物も対応可能です！</Caption>
        </Section>
        <Section>
          <DetailTitle>スペースについて</DetailTitle>
        </Section>
        <Section>
          <DetailContainer
            title="所在地"
            renderContent={() => <DetailContent.Address>東京都港区西新橋</DetailContent.Address>}
          />
          <DetailContainer
            title="種類"
            renderContent={() => <DetailContent.SpaceType>クローゼット</DetailContent.SpaceType>}
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
                typeOK
                text="冷蔵庫や洗濯機など家具・家電もお預かり可能ですが、ボリュームによっては検討させていただきますのでご相談ください！"
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
              <DetailContent.ReceiveSupplement text="普段は会社勤めですので、基本的には平日の夜のご対応となります。土日でも対応できる時がありますので、事前にメッセージでお知らせください！" />
            )}
          />
        </Section>
        <Section>
          <HostInfo
            img={{
              src: 'https://placehold.jp/150x150.png',
              alt: 'YUKI HASHIDA',
            }}
            hostName="YUKI HASHIDA"
            text="こんにちは。東京都港区芝に住む29才です。是非安心して荷物を預けてくださいね。こんにちは。東京都港区芝に住む29才です。是非安心して荷物を預けてくださいね。こんにちは。"
          />
        </Section>
      </Card>
    </SpaceCardContainer>
    <Footer />
  </SpacePage>
);
