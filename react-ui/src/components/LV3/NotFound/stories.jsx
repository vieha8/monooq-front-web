// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import NotFound from './index';

NotFound.displayName = 'NotFound';

storiesOf('Organisms(LV3)/NotFound', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
          ### コンポーネント概要
          NotFound
        `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <NotFound />
      </div>
    )),
  );
