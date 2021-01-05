import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import PageDefault from './index';

PageDefault.displayName = 'PageDefault';

storiesOf('Atoms(LV1)/PageDefault', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      Defaultコンテナ
  `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <PageDefault>Default Page.</PageDefault>
    </div>
  )),
);
