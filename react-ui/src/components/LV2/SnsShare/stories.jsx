import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SnsShare from './index';

SnsShare.displayName = 'SnsShare';

storiesOf('Molecules(LV2)/SnsShare', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      SNSシェアアイコン
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <SnsShare id="1234" name="モノオク太郎" />
      </div>
    )),
  )
  .add(
    'TabSp ver',
    withInfo(`
      ### コンポーネント概要
      SNSシェアアイコン(TabSp ver)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <SnsShare id="1234" name="モノオク太郎" isOnlyTabSp />
      </div>
    )),
  );
