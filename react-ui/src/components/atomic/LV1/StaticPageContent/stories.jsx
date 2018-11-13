// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import StaticPageContent from './index';

StaticPageContent.displayName = 'StaticPageContent';

storiesOf('Atoms(LV1)/Util/StaticPageContent', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      静的ページコンテンツ枠
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <StaticPageContent>StoryBook</StaticPageContent>
    </div>
  )),
);
