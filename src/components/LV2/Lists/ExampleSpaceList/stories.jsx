import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';
import ExampleSpaceList from './index';

const ImageExample1 =
  'https://monooq.imgix.net/img%2Fservice%2Flp1host%2Fexample-1.jpg?alt=media&auto=format&auto=compress';

ExampleSpaceList.displayName = 'ExampleSpaceList';

storiesOf('Molecules(LV2)/Lists/ExampleSpaceList', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        Pickupスペースリスト
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <ExampleSpaceList
          list={[
            {
              spaceImage: ImageExample1,
              spaceImageAlt: 'img-example-1',
              spaceAddress: '千葉県市川市',
              spacePrice: '96,000',
              spacePriceDtail: '40,000×3ヶ月-手数料',
              examplePriceMonth: '40,000',
              exampleSpace: '6畳(部屋3畳 + 押入れ3畳)',
              exampleTerm: '3ヶ月',
              exampleItem: '引っ越しに伴う荷物',
              exampleItemDetail:
                '一人暮らし用の小さめの洗濯機、冷蔵庫、電子レンジ、トースター、炊飯器、テレビ、組み立て式のベッド、ソファ、棚、本棚、ダンボールがいくつか',
            },
            {
              spaceImage: ImageExample1,
              spaceImageAlt: 'img-example-1',
              spaceAddress: '東京都世田谷区',
              spacePrice: '32,000',
              spacePriceDtail: '10,000×4ヶ月-手数料',
              examplePriceMonth: '10,000',
              exampleSpace: '2畳',
              exampleTerm: '4ヶ月',
              exampleItem: '海外就学に伴う単身荷物',
              exampleItemDetail: '布団、衣装タンス、スーツケース(衣装入り)、本、他ダンボール',
            },
            {
              spaceImage: ImageExample1,
              spaceImageAlt: 'img-example-1',
              spaceAddress: '大阪府大阪市',
              spacePrice: '60,000',
              spacePriceDtail: '60,000×10ヶ月-手数料',
              examplePriceMonth: '6,000',
              exampleSpace: '1畳',
              exampleTerm: '10ヶ月',
              exampleItem: '趣味用品',
              exampleItemDetail: 'グッズ',
            },
          ]}
        />
      </div>
    )),
  );
