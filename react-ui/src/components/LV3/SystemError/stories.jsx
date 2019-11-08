import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SystemError from './index';

SystemError.displayName = 'SystemError';

storiesOf('Organisms(LV3)/SystemError', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        システムエラー
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <SystemError />
      </div>
    )),
  );
