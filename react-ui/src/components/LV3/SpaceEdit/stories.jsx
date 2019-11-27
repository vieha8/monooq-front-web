import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Information from './Information';
import Baggage from './Baggage';
import Receive from './Receive';
import InputPriceType from './InputPriceType';
import Completion from './Completion';

Information.displayName = 'Information';
Baggage.displayName = 'Baggage';
Receive.displayName = 'Receive';
InputPriceType.displayName = 'InputPriceType';
Completion.displayName = 'Completion';

storiesOf('Organisms(LV3)/SpaceEdit', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Baggage',
    withInfo(`
        ### コンポーネント概要
        スペース編集フォーム(荷物の内容)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Baggage
          errors={[]}
          baggage="baggage text"
          onChangeBaggage={() => console.log('onChangeBaggage')}
          checkedFurniture={false}
          onClickFurniture={() => console.log('onClickFurniture')}
          onKeyDownFurniture={() => console.log('onKeyDownFurniture')}
          onClickBack={() => console.log('onClickBack')}
          onKeyDownButtonBack={() => console.log('onKeyDownButtonBack')}
          onClickNext={() => console.log('onClickNext')}
          onKeyDownButtonNext={() => console.log('onKeyDownButtonNext')}
          buttonNextDisabled={false}
        />
      </div>
    )),
  )
  .add(
    'Completion create',
    withInfo(`
        ### コンポーネント概要
        スペース編集フォーム(基本情報)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Completion story space={{}} />
      </div>
    )),
  )
  .add(
    'Completion edit',
    withInfo(`
        ### コンポーネント概要
        スペース編集フォーム(基本情報)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Completion edit story space={{}} />
      </div>
    )),
  )
  .add(
    'Information',
    withInfo(`
        ### コンポーネント概要
        スペース新規登録フォーム(基本情報)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Information
          errors={[]}
          address="東京都渋谷区東1-1"
          onChangeAddress={() => console.log('onChangeAddress')}
          type={0}
          onChangeType={() => console.log('onChangeType')}
          title="スペースタイトル"
          onChangeTitle={() => console.log('onChangeTitle')}
          images=""
          onChangeImage={() => console.log('onChangeImage')}
          onClickDeleteImage={() => console.log('onClickDeleteImage')}
          isImageUploading={false}
          introduction="Space Introdiction"
          onChangeIntroduction={() => console.log('onChangeIntroduction')}
          OnClickRemove={() => console.log('OnClickRemove')}
          onClickNext={() => console.log('onClickNext')}
          onKeyDownButtonNext={() => console.log('onKeyDownButtonNext')}
          buttonNextDisabled={false}
        />
      </div>
    )),
  )
  .add(
    'Information edit',
    withInfo(`
        ### コンポーネント概要
        スペース編集フォーム(基本情報)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Information
          edit
          errors={[]}
          address="東京都渋谷区東1-1"
          onChangeAddress={() => console.log('onChangeAddress')}
          type={0}
          onChangeType={() => console.log('onChangeType')}
          title="スペースタイトル"
          onChangeTitle={() => console.log('onChangeTitle')}
          images=""
          onChangeImage={() => console.log('onChangeImage')}
          onClickDeleteImage={() => console.log('onClickDeleteImage')}
          isImageUploading={false}
          introduction="Space Introdiction"
          onChangeIntroduction={() => console.log('onChangeIntroduction')}
          OnClickRemove={() => console.log('OnClickRemove')}
          onClickNext={() => console.log('onClickNext')}
          onKeyDownButtonNext={() => console.log('onKeyDownButtonNext')}
          buttonNextDisabled={false}
        />
      </div>
    )),
  )
  .add(
    'InputPriceType',
    withInfo(`
        ### コンポーネント概要
        スペース編集フォーム(スペースの料金[スペース区分別])
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <InputPriceType
          errors={[]}
          priceFull={10000}
          onChangePriceFull={() => console.log('onChangePriceFull')}
          priceTatami={3123}
          onChangePriceTatami={() => console.log('onChangePriceTatami')}
          buttonLoading={false}
          onClickBack={() => console.log('onClickBack')}
          onKeyDownButtonBack={() => console.log('onKeyDownButtonBack')}
          onClickNext={() => console.log('onClickNext')}
          onKeyDownButtonNext={() => console.log('onKeyDownButtonNext')}
          buttonNextDisabled={false}
        />
      </div>
    )),
  )
  .add(
    'Receive',
    withInfo(`
        ### コンポーネント概要
        スペース編集フォーム(荷物の受け取り)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Receive
          errors={[]}
          receive={0}
          onChangeReceive={() => console.log('onChangeReceive')}
          receiveAbout="receive text"
          onChangeReceiveAbout={() => console.log('onChangeReceiveAbout')}
          onClickBack={() => console.log('onClickBack')}
          onKeyDownButtonBack={() => console.log('onKeyDownButtonBack')}
          onClickNext={() => console.log('onClickNext')}
          onKeyDownButtonNext={() => console.log('onKeyDownButtonNext')}
          buttonNextDisabled={false}
        />
      </div>
    )),
  );
