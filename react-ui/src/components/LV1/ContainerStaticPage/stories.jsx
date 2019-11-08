import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ContainerStaticPage from './index';

ContainerStaticPage.displayName = 'ContainerStaticPage';

storiesOf('Atoms(LV1)/ContainerStaticPage', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      静的ページコンテナ
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <ContainerStaticPage>StoryBook</ContainerStaticPage>
    </div>
  )),
);
