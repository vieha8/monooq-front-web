// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import RegisterProfileImage from './RegisterProfileImage';

RegisterProfileImage.displayName = 'RegisterProfileImage';

storiesOf('Atoms/Util/DragAndDrop', module).add(
  'RegisterProfileImage',
  withInfo(`
      ### コンポーネント概要
      画像登録用コンポーネント
    `)(() => (
    <div>
      <RegisterProfileImage onDrop={data => console.log(data)} />
    </div>
  )),
);
