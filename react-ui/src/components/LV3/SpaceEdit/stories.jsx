import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Completion from './Completion';

Step1.displayName = 'Step1';
Step2.displayName = 'Step2';
Step3.displayName = 'Step3';
Completion.displayName = 'Completion';

storiesOf('Organisms(LV3)/SpaceEdit', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Step2',
    withInfo(`
        ### コンポーネント概要
        スペース編集フォーム(荷物の内容)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Step2
          errors={[]}
          addressMethod="addressMethod text"
          onChangeStep2={() => console.log('onChangeStep2')}
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
    'Step1',
    withInfo(`
        ### コンポーネント概要
        スペース新規登録フォーム(基本情報)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Step1
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
          onClickNext={() => console.log('onClickNext')}
          onKeyDownButtonNext={() => console.log('onKeyDownButtonNext')}
          buttonNextDisabled={false}
        />
      </div>
    )),
  )
  .add(
    'Step1 edit',
    withInfo(`
        ### コンポーネント概要
        スペース編集フォーム(基本情報)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Step1
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
          onClickNext={() => console.log('onClickNext')}
          onKeyDownButtonNext={() => console.log('onKeyDownButtonNext')}
          buttonNextDisabled={false}
        />
      </div>
    )),
  )
  .add(
    'Step3',
    withInfo(`
        ### コンポーネント概要
        スペース編集フォーム(スペースの料金[スペース区分別])
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Step3
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
  );
