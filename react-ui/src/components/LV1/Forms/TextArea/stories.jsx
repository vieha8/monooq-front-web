import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import TextArea from './index';

TextArea.displayName = 'TextArea';

storiesOf('Atoms(LV1)/Forms/TextArea', module)
  .add(
    'Available',
    withInfo(`
    ### コンポーネント概要
    - ・テキストエリア(活性ver)
    - ・rowsで行数を指定することが可能。
    `)(() => (
      <div style={{ width: '380px', padding: `${Dimens.storyBookPadding}` }}>
        <TextArea rows={5} />
      </div>
    )),
  )
  .add(
    'Disable',
    withInfo(`
      ### コンポーネント概要
      - ・テキストエリア(活性ver)
      - ・rowsで行数を指定することが可能。
    `)(() => (
      <div style={{ width: '380px', padding: `${Dimens.storyBookPadding}` }}>
        <TextArea rows={5} disabled="disabled" />
      </div>
    )),
  );
