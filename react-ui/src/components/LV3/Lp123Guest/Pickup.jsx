import React from 'react';
import styled from 'styled-components';
import { Colors, Dimens, ZIndexes } from 'variables';
import { media } from 'helpers/style/media-query';
import PickupSpaceList from 'components/LV2/Lists/PickupSpaceList';
import ImagePickupSpace1 from 'images/lp123guest/pickup-space-1.jpg';
import ImagePickupSpace1Host from 'images/lp123guest/pickup-space-1-host.jpg';
import ImagePickupSpace2 from 'images/lp123guest/pickup-space-2.jpg';
import ImagePickupSpace2Host from 'images/lp123guest/pickup-space-2-host.jpg';
import ImagePickupSpace3 from 'images/lp123guest/pickup-space-3.jpg';
import ImagePickupSpace3Host from 'images/lp123guest/pickup-space-3-host.jpg';
import SectionTitle from './SectionTitle';

const Wrap = styled.div`
  position: relative;
  background-color: ${Colors.brandQuaternary};
  padding: ${Dimens.medium2}px;
  &::before,
  &::after {
    content: '';
    position: absolute;
    right: 0;
    left: 0;
    width: 0px;
    height: 0px;
    margin: auto;
    border-style: solid;
    border-width: ${Dimens.medium1_25}px ${Dimens.medium4_50}px 0 ${Dimens.medium4_50}px;
  }
  &::before {
    top: 0px;
    border-color: ${Colors.white} transparent transparent transparent;
  }
  &::after {
    bottom: -25px;
    border-color: ${Colors.brandQuaternary} transparent transparent transparent;
    z-index: ${ZIndexes.child_1};
  }
  ${media.tablet`
    padding: ${Dimens.medium2}px ${Dimens.medium}px;
  `};
`;

export default () => (
  <Wrap>
    <SectionTitle text="PickUP!スペース" />
    <PickupSpaceList
      list={[
        {
          spaceImage: ImagePickupSpace1,
          spaceImageAlt: 'img-space1',
          spaceImageprice: '6,000円〜',
          station: '西川口駅',
          walk: '2分',
          type: '部屋',
          backage: '家具・家電',
          delivery: '配送/対面',
          hostImage: ImagePickupSpace1Host,
          hostImageAlt: 'img-host1',
          hostName: 'ithurricaneさん',
          priceList: [
            {
              title: '1/4程度のスペースの月額料金',
              price: '6,000円',
            },
            {
              title: '半分のスペースの月額料金',
              price: '10,000円',
            },
            {
              title: '全てのスペースの月額料金',
              price: '18,000円',
            },
          ],
          spaceId: 2278,
        },
        {
          spaceImage: ImagePickupSpace2,
          spaceImageAlt: 'img-space2',
          spaceImageprice: '6,000円〜',
          station: '成瀬駅',
          walk: '5分',
          type: '部屋',
          backage: '家具・家電',
          delivery: '配送/対面',
          hostImage: ImagePickupSpace2Host,
          hostImageAlt: 'img-host2',
          hostName: 'もかさん',
          priceList: [
            {
              title: '1/4程度のスペースの月額料金',
              price: '6,000円',
            },
            {
              title: '半分のスペースの月額料金',
              price: '10,000円',
            },
            {
              title: '全てのスペースの月額料金',
              price: '20,000円',
            },
          ],
          spaceId: 2203,
        },
        {
          spaceImage: ImagePickupSpace3,
          spaceImageAlt: 'img-space3',
          spaceImageprice: '6,000円〜',
          station: '東北沢駅',
          walk: '2分',
          type: '部屋',
          backage: '家具・家電',
          delivery: '配送/対面',
          hostImage: ImagePickupSpace3Host,
          hostImageAlt: 'img-host3',
          hostName: 'Syunさん',
          priceList: [
            {
              title: '1/4程度のスペースの月額料金',
              price: '6,000円',
            },
            {
              title: '半分のスペースの月額料金',
              price: '12,000円',
            },
            {
              title: '全てのスペースの月額料金',
              price: '18,000円',
            },
          ],
          spaceId: 2412,
        },
      ]}
    />
  </Wrap>
);
