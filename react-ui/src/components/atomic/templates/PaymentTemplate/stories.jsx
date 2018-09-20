// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import PaymentTemplate from './index';

storiesOf('Templates/PaymentTemplate', module).add('Normal', () => (
  <PaymentTemplate
    header={
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'pink',
        }}
      >
        header section
      </div>
    }
    left={
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'red',
        }}
      >
        left section
      </div>
    }
    right={
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'blue',
        }}
      >
        right section
      </div>
    }
  />
));
