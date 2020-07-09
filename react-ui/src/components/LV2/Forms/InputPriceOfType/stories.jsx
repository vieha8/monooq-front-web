import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';
import ErrorList from 'components/LV2/Lists/ErrorList';
import InputPriceOfType from './index';

const imageFurnitureFull =
  'https://monooq.imgix.net/img%2Fservice%2Fimg-furniture-full.svg?auto=compress';
const imageFurnitureTatami =
  'https://monooq.imgix.net/img%2Fservice%2Fimg-furniture-tatami.svg?auto=compress';

InputPriceOfType.displayName = 'InputPriceOfType';

storiesOf('Molecules(LV2)/Forms/InputPriceOfType', module).add(
  'Enabled',
  withInfo(`
      ### コンポーネント概要
      スペース区分別料金設定
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <InputPriceOfType
        image={imageFurnitureFull}
        title="スペースまるごと"
        caption="あなたのスペースのほとんどを使用する荷物の場合の料金"
        placeholder="3000"
        price="3000"
        onChange=""
        error={<ErrorList keyName="price_errors_1" errors={['error1', 'error2', 'error3']} />}
      />
      <br />
      <InputPriceOfType
        image={imageFurnitureTatami}
        title="スペース半分"
        caption="あなたのスペースの「半分」を使用する荷物の場合の料金"
        placeholder="4000"
        price="4000"
        onChange=""
        error={<ErrorList keyName="price_errors_2" errors={['error1', 'error2', 'error3']} />}
      />
    </div>
  )),
);
