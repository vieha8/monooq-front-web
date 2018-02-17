import React from 'react';
import styled from 'styled-components';

import RequestDialog from './RequestDialog';
import SpaceMenu from '../Search/SpaceMenu';

import { Dimens } from '../../variables';

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
`;

const SpaceCardContainer = styled.div`
  width: 688px;
  margin-top: 80px;
  margin-left: 120px;
`;

export default props => (
  <SpacePage>
    {/* TODO マップのprops調整 */}
    <Map
      containerElement={<div style={{ height: '300px' }} />}
      mapElement={<div style={{ height: '100%' }} />}
      loadingElement={<div style={{ height: '100%' }} />}
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCrHQDZXZI21cMEW8FIYYWKyvI2kLUDsbA&v=3.exp&libraries=geometry,drawing,places"
    />
    <SpaceCardContainer>
      <Card>
        <PlaceText>東京都 港区 六本木</PlaceText>
        <HeaderTitle>東京タワーに近くて便利！大きい荷物も何人ぶんでもOK</HeaderTitle>
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
        <Caption>閲覧頂き有り難うございます！赤羽橋、芝公園などの駅付近で預かることが可能です。玄関から入れば大きめの荷物も対応可能です！</Caption>
      </Card>
    </SpaceCardContainer>
  </SpacePage>
);
