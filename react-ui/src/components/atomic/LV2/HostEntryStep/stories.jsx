// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import HostEntryStep from './index';

HostEntryStep.displayName = 'HostEntryStep';

storiesOf('Molecules(LV2)/HostEntryStep', module)
  .add(
    'Step 1',
    withInfo(`
      ### コンポーネント概要
      登録の流れ(ステップ1)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '300px', padding: `${Dimens.storyBookPadding}` }}>
        <HostEntryStep step={0} />
      </div>
    )),
  )
  .add(
    'Step 2',
    withInfo(`
      ### コンポーネント概要
      登録の流れ(ステップ2)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '300px', padding: `${Dimens.storyBookPadding}` }}>
        <HostEntryStep step={1} />
      </div>
    )),
  )
  .add(
    'Step 3',
    withInfo(`
      ### コンポーネント概要
      登録の流れ(ステップ3)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '300px', padding: `${Dimens.storyBookPadding}` }}>
        <HostEntryStep step={2} />
      </div>
    )),
  )
  .add(
    'Step 4',
    withInfo(`
      ### コンポーネント概要
      登録の流れ(ステップ4)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '300px', padding: `${Dimens.storyBookPadding}` }}>
        <HostEntryStep step={3} />
      </div>
    )),
  );
