import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import CancelPolicy from './index';

CancelPolicy.displayName = 'CancelPolicy';

storiesOf('Organisms(LV3)/CancelPolicy', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
          ### コンポーネント概要
          CancelPolicy
        `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <CancelPolicy />
      </div>
    )),
  );
