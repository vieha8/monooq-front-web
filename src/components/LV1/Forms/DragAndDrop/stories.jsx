import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import RegisterProfileImage from './RegisterProfileImage';

RegisterProfileImage.displayName = 'RegisterProfileImage';

storiesOf('Atoms(LV1)/Forms/DragAndDrop', module).add(
  'RegisterProfileImage',
  withInfo(`
      ### コンポーネント概要
      画像登録用コンポーネント
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <RegisterProfileImage onDrop={data => console.log(data)} />
    </div>
  )),
);
