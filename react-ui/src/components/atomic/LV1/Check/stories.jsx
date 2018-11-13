// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Check from './index';

Check.displayName = 'Check';

storiesOf('Atoms(LV1)/Forms/Check', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      チェックボックス
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <div>
        <Check checked>タンス</Check>
      </div>
      <div>
        <Check>本棚</Check>
      </div>
      <div>
        <Check checked>クローゼット</Check>
      </div>
    </div>
  )),
);
