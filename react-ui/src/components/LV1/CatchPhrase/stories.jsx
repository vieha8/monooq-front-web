// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import CatchPhrase from './index';

CatchPhrase.displayName = 'CatchPhrase';

storiesOf('Atoms(LV1)/Text/CatchPhrase', module).add(
  'Normal',
  withInfo(`
    ### コンポーネント概要
    キャッチフレーズ
  `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <CatchPhrase>
        個人間だからできる、
        <br />
        荷物を置くための新しい方法。
      </CatchPhrase>
    </div>
  )),
);
