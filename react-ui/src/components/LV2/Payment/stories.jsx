import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ConfirmText from './ConfirmText';
import Info from './Info';
import PaidText from './PaidText';

ConfirmText.displayName = 'ConfirmText';
Info.displayName = 'Info';
PaidText.displayName = 'PaidText';

const space = {
  id: 112,
  userId: 137,
  user: {
    id: 137,
    name: 'モノボーイ',
    imageUrl: 'http://placehold.jp/500x500.png',
  },
  images: [
    {
      imageUrl: 'http://placehold.jp/500x500.png',
    },
  ],
  postalCode: '1500036',
  addressPref: '東京都',
  addressCity: '渋谷区',
  addressTown: '南平台町',
};

storiesOf('Molecules(LV2)/Payment', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Confirm Text Credit',
    withInfo(`
        ### コンポーネント概要
        決済確認文(クレジットカード決済)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <ConfirmText paymentMethod={0} number="1234567890123456" name="TEST TARO" />
      </div>
    )),
  )
  .add(
    'Confirm Text Econtext',
    withInfo(`
        ### コンポーネント概要
        決済確認文(コンビニ決済)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <ConfirmText paymentMethod={1} />
      </div>
    )),
  )
  .add(
    'Info',
    withInfo(`
        ### コンポーネント概要
        決済情報
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Info space={space} />
      </div>
    )),
  )
  .add(
    'Paid Text Credit',
    withInfo(`
        ### コンポーネント概要
        支払完了文(クレジットカード決済)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <PaidText paymentMethod={0} />
      </div>
    )),
  )
  .add(
    'Paid Text Econtext',
    withInfo(`
        ### コンポーネント概要
        支払完了文(コンビニ決済)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <PaidText paymentMethod={1} paymentUrl="https://monooq.com" />
      </div>
    )),
  );
