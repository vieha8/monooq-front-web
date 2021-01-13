import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import PageClearfix from './index';

PageClearfix.displayName = 'PageClearfix';

storiesOf('Atoms(LV1)/PageClearfix', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      Clearfixコンテナ
  `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <PageClearfix>StoryBook</PageClearfix>
    </div>
  )),
);
