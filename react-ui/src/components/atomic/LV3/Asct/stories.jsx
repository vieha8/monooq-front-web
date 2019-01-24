// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Asct from './index';

Asct.displayName = 'Asct';

storiesOf('Organisms(LV3)/Asct', module)
  .addDecorator(StoryRouter())
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
