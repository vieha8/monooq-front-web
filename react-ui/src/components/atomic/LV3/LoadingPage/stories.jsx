// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import LoadingPage from './index';

LoadingPage.displayName = 'LoadingPage';

storiesOf('Organisms/LoadingPage', module).add(
  'Normal',
  withInfo(`
        ### コンポーネント概要
        ページローディング
        - ・StoryBookではページローティングをそのまま表示させている。
      `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      コンテンツ
      <LoadingPage />
    </div>
  )),
);
