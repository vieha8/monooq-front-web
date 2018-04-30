// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookRouter from 'storybook-router';

import PaidComplete from './index';

storiesOf('Organisms/PaidComplete', module)
  .addDecorator(StorybookRouter())
  .add('Normal', () => (
    <div>
      <PaidComplete spaceName="素敵なものおき！" />
    </div>
  ));
