// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import AnimateInputField from './index';

AnimateInputField.displayName = 'AnimateInputField';

storiesOf('Atoms(LV1)/AnimateInputField', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      入力欄
    `)(() => (
    <div style={{ width: '100%', maxWidth: '400px', padding: `${Dimens.storyBookPadding}` }}>
      <AnimateInputField iconRight show placeholder="プレースホルダー" />
    </div>
  )),
);
