import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ContainerClearfix from './index';

ContainerClearfix.displayName = 'ContainerClearfix';

storiesOf('Atoms(LV1)/ContainerClearfix', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      Clearfixコンテナ
  `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <ContainerClearfix>StoryBook</ContainerClearfix>
    </div>
  )),
);
