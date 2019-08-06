// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ImageHero from './index';

ImageHero.displayName = 'ImageHero';

storiesOf('Atoms(LV1)/Images/ImageHero', module).add(
  'Normal',
  withInfo(`
    ### コンポーネント概要
    ヒーロイメージ(大・中・小)
  `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <div style={{ marginLeft: '32px', verticalAlign: 'top' }}>
        <ImageHero large src="http://placehold.jp/700x500.png" alt="name" />
      </div>
      <div style={{ marginLeft: '32px', verticalAlign: 'top' }}>
        <ImageHero medium src="http://placehold.jp/700x500.png" alt="name" />
      </div>
      <div style={{ marginLeft: '32px', verticalAlign: 'top' }}>
        <ImageHero small src="http://placehold.jp/700x500.png" alt="name" />
      </div>
    </div>
  )),
);
