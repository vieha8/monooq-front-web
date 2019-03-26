// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Hr from './index';

Hr.displayName = 'Hr';

storiesOf('Atoms(LV1)/Util/HorizontalRule', module).add(
  'Base',
  withInfo(`
    ### コンポーネント概要
    仕切り線
  `)(() => (
    <div style={{ width: '100%', maxWidth: '380px', padding: `${Dimens.storyBookPadding}` }}>
      <Hr />
    </div>
  )),
);
