import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Inquiry from './index';

Inquiry.displayName = 'Inquiry';

storiesOf('Organisms(LV3)/Inquiry', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        お問い合わせ
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Inquiry />
      </div>
    )),
  );
