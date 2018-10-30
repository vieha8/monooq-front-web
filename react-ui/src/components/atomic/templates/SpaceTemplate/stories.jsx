// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import SpaceTemplate from './index';

storiesOf('Templates/Space', module).add('Normal', () => (
  <SpaceTemplate
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
    map={
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'yellow',
        }}
      >
        map section
      </div>
    }
    detail={
      <div
        style={{
          width: '100%',
          height: '500px',
          background: 'green',
        }}
      >
        detail section
      </div>
    }
    price={
      <div
        style={{
          width: '100%',
          height: '300px',
          background: 'gray',
        }}
      >
        price section
      </div>
    }
    message={
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'orange',
        }}
      >
        message section
      </div>
    }
    footer={
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'blue',
        }}
      >
        footer section
      </div>
    }
  />
));
