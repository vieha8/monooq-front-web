import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SelectFormMock from './mock/SelectForm';

SelectFormMock.displayName = 'SelectFormMock';

storiesOf('Molecules(LV2)/Forms/SelectForm', module).add(
  'Normal',
  withInfo(`
    ### コンポーネント概要
    プルダウン(スペースの種類)
  `)(() => (
    <div style={{ width: '100%', maxWidth: '800px', padding: `${Dimens.storyBookPadding}` }}>
      <SelectFormMock
        label="スペースの種類は？"
        options={[
          { text: 'クローゼット', value: '1' },
          { text: '物置', value: '2' },
          { text: '部屋', value: '3' },
          { text: 'その他', value: '4' },
        ]}
      />
    </div>
  )),
);
