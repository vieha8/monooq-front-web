// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import HeroImage from './index';

HeroImage.displayName = 'HeroImage';

storiesOf('Atoms(LV1)/Images/HeroImage', module).add(
  'Normal',
  withInfo(`
    ### コンポーネント概要
    ヒーロイメージ(大・中・小)
  `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <div style={{ marginLeft: '32px', verticalAlign: 'top' }}>
        <HeroImage large src="http://placehold.jp/700x500.png" alt="name" />
      </div>
      <div style={{ marginLeft: '32px', verticalAlign: 'top' }}>
        <HeroImage medium src="http://placehold.jp/700x500.png" alt="name" />
      </div>
      <div style={{ marginLeft: '32px', verticalAlign: 'top' }}>
        <HeroImage small src="http://placehold.jp/700x500.png" alt="name" />
      </div>
    </div>
  )),
);
