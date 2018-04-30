// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import ProfileTemplate from './index';

storiesOf('Templates/ProfileTemplate', module).add('Normal', () => (
  <ProfileTemplate
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
    profile={
      <div
        style={{
          width: '100%',
          height: '400px',
          background: 'yellow',
        }}
      >
        profile section
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
