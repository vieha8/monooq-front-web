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
    schedule={
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'blue',
        }}
      >
        schedule section
      </div>
    }
    price={
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'green',
        }}
      >
        price section
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
    button={
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'pink',
        }}
      >
        button section
      </div>
    }
  />
));
