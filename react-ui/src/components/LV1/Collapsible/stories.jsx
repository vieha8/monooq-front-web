// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Collapsible from './index';
import NoCollapsible from './NoCollapsible';

Collapsible.displayName = 'Collapsible';
NoCollapsible.displayName = 'NoCollapsible';

storiesOf('Atoms(LV1)/Util/Collapsible', module)
  .add(
    'Collapsible',
    withInfo(`
        ### コンポーネント概要
        アコーディオンコンポーネント
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Collapsible />
      </div>
    )),
  )
  .add(
    'No Collapsible',
    withInfo(`
        ### コンポーネント概要
        非アコーディオンコンポーネント(折りたたみ不可)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <NoCollapsible />
      </div>
    )),
  );
