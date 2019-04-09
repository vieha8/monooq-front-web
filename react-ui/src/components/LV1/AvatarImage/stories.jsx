// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import AvatarImage from './index';

AvatarImage.displayName = 'AvatarImage';

storiesOf('Atoms(LV1)/Images/AvaterImage', module).add(
  'Normal',
  withInfo(`
    ### コンポーネント概要
    - ・アバター画像
    - ・sizeを指定することで、円のサイズを指定することが可能(指定単位:px)
  `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <div
        style={{
          marginLeft: '32px',
          display: 'inline-block',
          verticalAlign: 'top',
          padding: `${Dimens.storyBookPadding}`,
        }}
      >
        <AvatarImage size={92} src="http://placehold.jp/500x500.png" alt="name" />
      </div>
      <div
        style={{
          marginLeft: '32px',
          display: 'inline-block',
          verticalAlign: 'top',
          padding: `${Dimens.storyBookPadding}`,
        }}
      >
        <AvatarImage size={64} src="http://placehold.jp/500x500.png" alt="name" />
      </div>
      <div
        style={{
          marginLeft: '32px',
          display: 'inline-block',
          verticalAlign: 'top',
          padding: `${Dimens.storyBookPadding}`,
        }}
      >
        <AvatarImage size={32} src="http://placehold.jp/500x500.png" alt="name" />
      </div>
    </div>
  )),
);
