// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens, Colors } from 'variables';
import imageFurnitureFull from 'images/furniture-full.svg';
import imageFurnitureHalf from 'images/furniture-half.svg';
import imageFurnitureQuarter from 'images/furniture-quarter.svg';

import InlineText from 'components/atomic/LV1/InlineText';
import InputPriceOfType from './index';

InputPriceOfType.displayName = 'InputPriceOfType';

function displayErrors(key: string, errors: Array<string>) {
  return (
    Array.isArray(errors) &&
    errors.map((e, i) => (
      <div key={`${key}_${i}`}>
        <InlineText.Small color={Colors.error}>{e}</InlineText.Small>
      </div>
    ))
  );
}

storiesOf('Molecules/InputPriceOfType', module).add(
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
        error={displayErrors('price_errors_1', 'error1')}
      />
      <br />
      <InputPriceOfType
        image={imageFurnitureHalf}
        title="スペース半分"
        caption="あなたのスペースの「半分」を使用する荷物の場合の料金"
        placeholder="4000"
        price="4000"
        onChange=""
        error={displayErrors('price_errors_2', 'error2')}
      />
      <br />
      <InputPriceOfType
        image={imageFurnitureQuarter}
        title="スペース1/4"
        caption="あなたのスペースの「4分の1」を使用する荷物の場合の料金"
        placeholder="5000"
        price="5000"
        onChange=""
        error={displayErrors('price_errors_3', 'error3')}
      />
    </div>
  )),
);
