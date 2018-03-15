// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import HelpButton from './index';

storiesOf('Molecules/HelpButton', module)
  .add('Normal', () => (
    <div>
      <HelpButton
        title="サービスについて"
        onClick={() => console.log('onClick')}
      />
    </div>
  ));
