// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import CancellationPolicies from './index';

CancellationPolicies.displayName = 'CancellationPolicies';

storiesOf('Organisms(LV3)/CancellationPolicies', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
          ### コンポーネント概要
          CancellationPolicies
        `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <CancellationPolicies />
      </div>
    )),
  );
