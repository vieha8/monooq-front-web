// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import ClearfixContainer from './index';

ClearfixContainer.displayName = 'ClearfixContainer';

storiesOf('Atoms/Util/ClearfixContainer', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      Clearfixコンテナ
    `)(() => <ClearfixContainer>StoryBook</ClearfixContainer>),
);
