// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Terms from './index';

Terms.displayName = 'Terms';

storiesOf('Organisms(LV3)/Terms', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        Terms
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Terms />
      </div>
    )),
  );
