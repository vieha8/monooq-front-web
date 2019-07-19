// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Asct from './index';

Asct.displayName = 'Asct';

storiesOf('Organisms(LV3)/Asct', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
          ### コンポーネント概要
          Asct
        `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Asct />
      </div>
    )),
  );
