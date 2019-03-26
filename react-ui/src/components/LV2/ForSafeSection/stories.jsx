// @flow

import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ForSafeSection from './index';

ForSafeSection.displayName = 'ForSafeSection';

storiesOf('Molecules(LV2)/ForSafeSection', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      安心シェアsection
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <ForSafeSection
        iconClass="far fa-heart"
        title="はじめての方へ"
        description="まずは自分に合う物置きスペースを探し、メッセージで荷物を置かせてもらえるかホストに相談をします。サービスの使い方がよくわからない、お困りの方はこちら。"
        buttonText="使い方について"
        onClick={console.log('Clicked')}
      />
    </div>
  )),
);
