// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Save from './index';

Save.displayName = 'Save';

storiesOf('Molecules(LV2)/Save', module)
  .add(
    'Enabled',
    withInfo(`
      ### コンポーネント概要
      保存するボタン(活性ver)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '300px', padding: `${Dimens.storyBookPadding}` }}>
        <Save onClickSave={() => console.log('onClickSave')} />
      </div>
    )),
  )
  .add(
    'Disabled',
    withInfo(`
      ### コンポーネント概要
      保存するボタン(非活性ver)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '300px', padding: `${Dimens.storyBookPadding}` }}>
        <Save onClickSave={() => console.log('onClickSave')} disabled />
      </div>
    )),
  );
