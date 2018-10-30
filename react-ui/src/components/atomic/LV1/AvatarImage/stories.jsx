// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import AvatarImage from './index';

AvatarImage.displayName = 'AvatarImage';

storiesOf('Atoms/Images/AvaterImage', module).add(
  'Normal',
  withInfo(`
    ### コンポーネント概要
    - ・アバター画像
    - ・sizeを指定することで、円のサイズを指定することが可能(指定単位:px)
  `)(() => (
    <div>
      <div style={{ marginLeft: '32px', display: 'inline-block', verticalAlign: 'top' }}>
        <AvatarImage size={92} src="http://placehold.jp/500x500.png" alt="name" />
      </div>
      <div style={{ marginLeft: '32px', display: 'inline-block', verticalAlign: 'top' }}>
        <AvatarImage size={64} src="http://placehold.jp/500x500.png" alt="name" />
      </div>
      <div style={{ marginLeft: '32px', display: 'inline-block', verticalAlign: 'top' }}>
        <AvatarImage size={32} src="http://placehold.jp/500x500.png" alt="name" />
      </div>
    </div>
  )),
);
