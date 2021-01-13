import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import CatchPhraseSub from './index';

CatchPhraseSub.displayName = 'CatchPhraseSub';

storiesOf('Atoms(LV1)/Texts/CatchPhraseSub', module).add(
  'Normal',
  withInfo(`
    ### コンポーネント概要
    サブキャッチフレーズ
  `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <CatchPhraseSub>
        モノオクは空きスペースを活用できる、
        <br />
        物置きシェアサービスです。
      </CatchPhraseSub>
    </div>
  )),
);
