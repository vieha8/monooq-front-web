import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Rule from './index';

Rule.displayName = 'Rule';

storiesOf('Organisms(LV3)/Rule', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
          ### コンポーネント概要
          Rule
        `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Rule />
      </div>
    )),
  );
