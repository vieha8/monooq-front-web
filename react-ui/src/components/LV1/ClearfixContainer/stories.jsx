// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ClearfixContainer from './index';

ClearfixContainer.displayName = 'ClearfixContainer';

storiesOf('Atoms(LV1)/Util/ClearfixContainer', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      Clearfixコンテナ
  `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <ClearfixContainer>StoryBook</ClearfixContainer>
    </div>
  )),
);
