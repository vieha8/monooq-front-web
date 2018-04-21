// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import EstimateTemplate from './index';

storiesOf('Templates/EstimateTemplate', module).add('Normal', () => (
  <EstimateTemplate
    header={
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'red',
        }}
      >
        header section
      </div>
    }
    form={
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'blue',
        }}
      >
        form section
      </div>
    }
    hint={
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'orange',
        }}
      >
        hint section
      </div>
    }
  />
));
