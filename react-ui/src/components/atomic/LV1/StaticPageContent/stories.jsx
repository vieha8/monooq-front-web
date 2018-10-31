// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import StaticPageContent from './index';

StaticPageContent.displayName = 'StaticPageContent';

storiesOf('Atoms/Util/StaticPageContent', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      静的ページコンテンツ枠
    `)(() => <StaticPageContent>StoryBook</StaticPageContent>),
);
