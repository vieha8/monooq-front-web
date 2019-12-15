import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Payment from './index';

Payment.displayName = 'Payment';

const space = {
  id: 143,
  userId: 135,
  user: {
    id: 135,
    name: 'モノオク太郎',
    imageUrl: 'http://placehold.jp/200x200.png',
  },
  images: [
    {
      id: 561,
      spaceId: 143,
      imageUrl: 'http://placehold.jp/200x200.png',
    },
  ],
  title: 'スペースタイトル',
  type: 3,
  introduction: 'スペース紹介文',
  about: 'iroiro',
  isFurniture: false,
  receiptType: 1,
  receiptAbout: 'いつもでOK',
  sizeType: 0,
  priceFull: 5000,
  priceHalf: 3000,
  priceQuarter: 3000,
  addressPref: '東京都',
  addressCity: '渋谷区',
  addressTown: '東',
  status: 'public',
  lat: 35.6574437,
  lng: 139.7099656,
  address: '東京都渋谷区東1-1',
};

storiesOf('Organisms(LV3)/Payment', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Select CreditCard',
    withInfo(`
        ### コンポーネント概要
        決済フォーム(クレジットカードを選択した状態)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Payment
          space={space}
          onChangeIsHost={value => this.handleChangeUI('paymentMethod', value)}
          paymentMethod={0}
          payment={{
            beginAt: '2019/07/12',
            endAt: '2019/07/31',
            duration: 20,
            price: 5000,
          }}
          errors=""
          paidError=""
          errMsgPayment=""
          onChangeName={() => console.log('onChangeName')}
          name="name"
          onChangeNumber={() => console.log('onChangeNumber')}
          number="1234567890123456"
          onChangeYear={() => console.log('onChangeYear')}
          year="2020"
          onChangeMonth={() => console.log('onChangeMonth')}
          month="10"
          onChangeCvc={() => console.log('onChangeCvc')}
          cvc={123}
          buttonDisabled={false}
          buttonLoading={false}
          onKeyDownBack={() => console.log('onKeyDownBack')}
          onKeyDownPay={() => console.log('onKeyDownPay')}
          backButton={() => console.log('backButton')}
          submitButton={() => console.log('submitButton')}
          backButtonText="戻る"
          submitButtonText="確認する"
        />
      </div>
    )),
  )
  .add(
    'Select Econtext',
    withInfo(`
        ### コンポーネント概要
        決済フォーム(イーコンテキストを選択した状態)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Payment
          space={space}
          onChangeIsHost={value => this.handleChangeUI('paymentMethod', value)}
          paymentMethod={1}
          payment={{
            beginAt: '2019/07/12',
            endAt: '2019/07/31',
            duration: 20,
            price: 5000,
          }}
          errors=""
          paidError=""
          errMsgPayment=""
          onChangeName={() => console.log('onChangeName')}
          name="name"
          onChangeNumber={() => console.log('onChangeNumber')}
          number="1234567890123456"
          onChangeYear={() => console.log('onChangeYear')}
          year="2020"
          onChangeMonth={() => console.log('onChangeMonth')}
          month="10"
          onChangeCvc={() => console.log('onChangeCvc')}
          cvc={123}
          buttonDisabled={false}
          buttonLoading={false}
          onKeyDownBack={() => console.log('onKeyDownBack')}
          onKeyDownPay={() => console.log('onKeyDownPay')}
          backButton={() => console.log('backButton')}
          submitButton={() => console.log('submitButton')}
          backButtonText="戻る"
          submitButtonText="確認する"
        />
      </div>
    )),
  )
  .add(
    'Confirm CreditCard',
    withInfo(`
        ### コンポーネント概要
        決済フォーム(クレジットカードの確認画面)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Payment
          confirm
          space={space}
          onChangeIsHost={value => this.handleChangeUI('paymentMethod', value)}
          paymentMethod={0}
          payment={{
            beginAt: '2019/07/12',
            endAt: '2019/07/31',
            duration: 20,
            price: 5000,
          }}
          errors=""
          paidError=""
          errMsgPayment=""
          onChangeName={() => console.log('onChangeName')}
          name="name"
          onChangeNumber={() => console.log('onChangeNumber')}
          number="1234567890123456"
          onChangeYear={() => console.log('onChangeYear')}
          year="2020"
          onChangeMonth={() => console.log('onChangeMonth')}
          month="10"
          onChangeCvc={() => console.log('onChangeCvc')}
          cvc={123}
          buttonDisabled={false}
          buttonLoading={false}
          onKeyDownBack={() => console.log('onKeyDownBack')}
          onKeyDownPay={() => console.log('onKeyDownPay')}
          backButton={() => console.log('backButton')}
          submitButton={() => console.log('submitButton')}
          backButtonText="戻る"
          submitButtonText="確認する"
        />
      </div>
    )),
  )
  .add(
    'Confirm Econtext',
    withInfo(`
        ### コンポーネント概要
        決済フォーム(イーコンテキストの確認画面)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Payment
          confirm
          space={space}
          onChangeIsHost={value => this.handleChangeUI('paymentMethod', value)}
          paymentMethod={1}
          payment={{
            beginAt: '2019/07/12',
            endAt: '2019/07/31',
            duration: 20,
            price: 5000,
          }}
          errors=""
          paidError=""
          errMsgPayment=""
          onChangeName={() => console.log('onChangeName')}
          name="name"
          onChangeNumber={() => console.log('onChangeNumber')}
          number="1234567890123456"
          onChangeYear={() => console.log('onChangeYear')}
          year="2020"
          onChangeMonth={() => console.log('onChangeMonth')}
          month="10"
          onChangeCvc={() => console.log('onChangeCvc')}
          cvc={123}
          buttonDisabled={false}
          buttonLoading={false}
          onKeyDownBack={() => console.log('onKeyDownBack')}
          onKeyDownPay={() => console.log('onKeyDownPay')}
          backButton={() => console.log('backButton')}
          submitButton={() => console.log('submitButton')}
          backButtonText="戻る"
          submitButtonText="確認する"
        />
      </div>
    )),
  );
