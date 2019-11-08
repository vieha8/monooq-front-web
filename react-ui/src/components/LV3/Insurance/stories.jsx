import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Insurance from './index';

Insurance.displayName = 'Insurance';

storiesOf('Organisms(LV3)/Insurance', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
          ### コンポーネント概要
          Insurance
        `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Insurance />
      </div>
    )),
  );
