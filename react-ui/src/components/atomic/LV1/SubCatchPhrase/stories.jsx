// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SubCatchPhrase from './index';

SubCatchPhrase.displayName = 'SubCatchPhrase';

storiesOf('Atoms(LV1)/Text/SubCatchPhraserd', module).add(
  'Normal',
  withInfo(`
    ### コンポーネント概要
    サブキャッチフレーズ
  `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <SubCatchPhrase>
        モノオクは空きスペースを活用できる、
        <br />
        物置きシェアサービスです。
      </SubCatchPhrase>
    </div>
  )),
);
