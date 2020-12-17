import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';
import PickupSpaceList from './index';

const ImagePickupSpace1 =
  'https://monooq.imgix.net/img%2Fservice%2Flp123guest%2Fpickup-space-1.jpg?alt=media&auto=format&auto=compress';
const ImagePickupSpace1Host =
  'https://monooq.imgix.net/img%2Fservice%2Flp123guest%2Fpickup-space-1-host.jpg?alt=media&auto=format&auto=compress';

PickupSpaceList.displayName = 'PickupSpaceList';

storiesOf('Molecules(LV2)/Lists/PickupSpaceList', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        Pickupスペースリスト
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <PickupSpaceList
          list={[
            {
              spaceImage: ImagePickupSpace1,
              spaceImageAlt: 'img-space1',
              spaceImageprice: '5,000円〜',
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
                  price: '5,000円',
                },
                {
                  title: '1/4程度のスペースの月額料金',
                  price: '10,000円',
                },
                {
                  title: '1/4程度のスペースの月額料金',
                  price: '18,000円',
                },
              ],
              spaceId: 2278,
            },
            {
              spaceImage: ImagePickupSpace1,
              spaceImageAlt: 'img-space1',
              spaceImageprice: '5,000円〜',
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
                  price: '5,000円',
                },
                {
                  title: '1/4程度のスペースの月額料金',
                  price: '10,000円',
                },
                {
                  title: '1/4程度のスペースの月額料金',
                  price: '18,000円',
                },
              ],
              spaceId: 2278,
            },
            {
              spaceImage: ImagePickupSpace1,
              spaceImageAlt: 'img-space1',
              spaceImageprice: '5,000円〜',
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
                  price: '5,000円',
                },
                {
                  title: '1/4程度のスペースの月額料金',
                  price: '10,000円',
                },
                {
                  title: '1/4程度のスペースの月額料金',
                  price: '18,000円',
                },
              ],
              spaceId: 2278,
            },
          ]}
        />
      </div>
    )),
  );
