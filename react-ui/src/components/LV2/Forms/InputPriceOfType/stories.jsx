// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';
import imageFurnitureFull from 'images/furniture-full.svg';
import imageFurnitureHalf from 'images/furniture-half.svg';
import imageFurnitureQuarter from 'images/furniture-quarter.svg';
import ErrorList from 'components/LV2/Lists/ErrorList';

import InputPriceOfType from './index';

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
        image={imageFurnitureHalf}
        title="スペース半分"
        caption="あなたのスペースの「半分」を使用する荷物の場合の料金"
        placeholder="4000"
        price="4000"
        onChange=""
        error={<ErrorList keyName="price_errors_2" errors={['error1', 'error2', 'error3']} />}
      />
      <br />
      <InputPriceOfType
        image={imageFurnitureQuarter}
        title="スペース1/4"
        caption="あなたのスペースの「4分の1」を使用する荷物の場合の料金"
        placeholder="5000"
        price="5000"
        onChange=""
        error={<ErrorList keyName="price_errors_3" errors={['error1', 'error2', 'error3']} />}
      />
    </div>
  )),
);
