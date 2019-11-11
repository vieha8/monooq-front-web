import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ButtonBottom from './index';

ButtonBottom.displayName = 'ButtonBottom';

storiesOf('Molecules(LV2)/Forms/SearchNarrowButton', module).add(
  'Public',
  withInfo(`
    ### コンポーネント概要
    画面下部固定ボタン(TAB/SPのみ表示)
  `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <ButtonBottom
        text="地域を絞り込む"
        disabled={false}
        loading={false}
        onClick={() => console.log('onClick')}
        onKeyDownButton={() => console.log('onKeyDownButton')}
      />
    </div>
  )),
);
