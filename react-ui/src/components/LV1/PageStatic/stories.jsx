import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import PageStaticPage from './index';

PageStaticPage.displayName = 'PageStaticPage';

storiesOf('Atoms(LV1)/StaticPage', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      静的ページコンテナ
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <StaticPage>StoryBook</StaticPage>
    </div>
  )),
);
