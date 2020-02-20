import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Attribute from './Attribute';
import Address from './Address';
import Description from './Description';
import InfoHost from './InfoHost';
import Image from './Image';
import Price from './Price';
import Receive from './Receive';
import InfoUser from './InfoUser';

Address.displayName = 'Address';
Attribute.displayName = 'Attribute';
Description.displayName = 'Description';
InfoHost.displayName = 'InfoHost';
Image.displayName = 'Image';
Price.displayName = 'Price';
Receive.displayName = 'Receive';
InfoUser.displayName = 'InfoUser';

storiesOf('Molecules(LV2)/Space', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Address',
    withInfo(`
      ### コンポーネント概要
      スペース情報(所在地)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Address content="東京都渋谷区渋谷" />
      </div>
    )),
  )
  .add(
    'Attribute',
    withInfo(`
      ### コンポーネント概要
      スペース情報(各項)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Attribute
          title="タイトル"
          content={
            <div>
              <div>内容1</div>
              <div>内容2</div>
            </div>
          }
        />
        <Attribute
          title="タイトル"
          content={
            <div>
              <div>内容1</div>
              <div>内容2</div>
            </div>
          }
        />
        <Attribute
          title="タイトル"
          content={
            <div>
              <div>内容1</div>
              <div>内容2</div>
            </div>
          }
        />
      </div>
    )),
  )
  .add(
    'Description',
    withInfo(`
      ### コンポーネント概要
      スペース情報(スペースの説明文)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Description content="Description Text." />
      </div>
    )),
  )
  .add(
    'InfoHost',
    withInfo(`
      ### コンポーネント概要
      スペース情報(ホストの情報)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <InfoHost
          id={100}
          name="ものおくほすと"
          profile="よろしくお願いします！"
          imageUrl="http://placehold.jp/500x500.png"
        />
      </div>
    )),
  )
  .add(
    'InfoUser',
    withInfo(`
      ### コンポーネント概要
      スペース情報(ホストの情報)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <InfoUser
          id={100}
          name="ものおくげすと"
          profile="よろしくお願いします！"
          imageUrl="http://placehold.jp/500x500.png"
          infoHost
          message
        />
      </div>
    )),
  )
  .add(
    'Image',
    withInfo(`
      ### コンポーネント概要
      スペース情報(スペース画像)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Image
          images={[
            {
              original: 'http://placehold.jp/200x100.png',
              thumbnail: 'http://placehold.jp/200x100.png',
            },
            {
              original: 'http://placehold.jp/200x100.png',
              thumbnail: 'http://placehold.jp/200x100.png',
            },
            {
              original: 'http://placehold.jp/200x100.png',
              thumbnail: 'http://placehold.jp/200x100.png',
            },
            {
              original: 'http://placehold.jp/200x100.png',
              thumbnail: 'http://placehold.jp/200x100.png',
            },
            {
              original: 'http://placehold.jp/200x100.png',
              thumbnail: 'http://placehold.jp/200x100.png',
            },
          ]}
          description="これは説明です"
        />
      </div>
    )),
  )
  .add(
    'Price',
    withInfo(`
      ### コンポーネント概要
      スペース情報(料金)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Price full price="¥40,000" />
        <Price half price="¥20,000" />
        <Price quarter price="¥10,000" />
      </div>
    )),
  )
  .add(
    'Receive',
    withInfo(`
      ### コンポーネント概要
      スペース情報(受取り方法)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Receive />
        <br />
        <Receive isDelivery />
        <br />
        <Receive isMeeting />
        <br />
        <Receive isDelivery isMeeting />
      </div>
    )),
  );
