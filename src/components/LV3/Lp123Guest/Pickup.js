import React from 'react';
import styled from 'styled-components';
import { Colors, Dimens, ZIndexes } from 'variables';
import { media } from 'helpers/style/media-query';
import PickupSpaceList from 'components/LV2/Lists/PickupSpaceList';
import SectionTitle from './SectionTitle';
const ImagePickupSpace2203 =
  'https://monooq.imgix.net/img%2Fservice%2Flp123guest%2Fpickup-space-2203.jpg?alt=media&auto=format&auto=compress';
const ImagePickupSpace1Host2203 =
  'https://monooq.imgix.net/img%2Fservice%2Flp123guest%2Fpickup-space-host-2203.jpg?alt=media&auto=format&auto=compress';
const ImagePickupSpace2901 =
  'https://monooq.imgix.net/img%2Fservice%2Flp123guest%2Fpickup-space-2901.jpeg?alt=media&auto=format&auto=compress';
const ImagePickupSpaceHost2901 =
  'https://monooq.imgix.net/img%2Fservice%2Flp123guest%2Fpickup-space-host-2901.jpg?alt=media&auto=format&auto=compress';
const ImagePickupSpace4762 =
  'https://monooq.imgix.net/img%2Fservice%2Flp123guest%2Fpickup-space-4762.jpg?alt=media&auto=format&auto=compress';
const ImagePickupSpaceHost4762 =
  'https://monooq.imgix.net/img%2Fservice%2Flp123guest%2Fpickup-space-host-4762.png?alt=media&auto=format&auto=compress';

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
          spaceImage: ImagePickupSpace2203,
          spaceImageAlt: 'img-space-2203',
          spaceImageprice: '6,000円〜',
          station: '成瀬駅(東京都)',
          walk: '5分',
          type: '部屋(6畳)',
          backage: '家具・家電',
          delivery: '配送/対面',
          hostImage: ImagePickupSpace1Host2203,
          hostImageAlt: 'img-host-2203',
          hostName: 'もか さん',
          priceList: [
            {
              title: 'スペース1畳分の月額料金',
              price: '6,000円',
            },
            {
              title: 'スペース全体の月額料金',
              price: '36,000円',
            },
          ],
          spaceId: 2203,
        },
        {
          spaceImage: ImagePickupSpace2901,
          spaceImageAlt: 'img-space-2901',
          spaceImageprice: '6,000円〜',
          station: '代々木上原駅(東京都)',
          walk: '5分',
          type: '部屋(6畳)',
          backage: '家具・家電',
          delivery: '配送/対面',
          hostImage: ImagePickupSpaceHost2901,
          hostImageAlt: 'img-host-2901',
          hostName: 'てんさん さん',
          priceList: [
            {
              title: 'スペース1畳分の月額料金',
              price: '6,000円',
            },
            {
              title: 'スペース全体の月額料金',
              price: '36,000円',
            },
          ],
          spaceId: 2901,
        },
        {
          spaceImage: ImagePickupSpace4762,
          spaceImageAlt: 'img-space3',
          spaceImageprice: '6,000円〜',
          station: '鵠沼海岸駅(神奈川県)',
          walk: '15分',
          type: '部屋(4.5畳)',
          backage: '家具・家電',
          delivery: '配送/対面',
          hostImage: ImagePickupSpaceHost4762,
          hostImageAlt: 'img-host-4762',
          hostName: 'kojika さん',
          priceList: [
            {
              title: 'スペース1畳分の月額料金',
              price: '6,000円',
            },
            {
              title: 'スペース全体の月額料金',
              price: '18,000円',
            },
          ],
          spaceId: 4762,
        },
      ]}
    />
  </Wrap>
);
