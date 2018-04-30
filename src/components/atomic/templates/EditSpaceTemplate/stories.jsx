// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import EditSpaceTemplate from './index';

storiesOf('Templates/EditSpaceTemplate', module).add('Normal', () => (
  <EditSpaceTemplate
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
    leftContent={
      <div
        style={{
          width: '100%',
          height: '500px',
          background: 'green',
        }}
      >
        left content section
      </div>
    }
    rightContent={
      <div
        style={{
          width: '100%',
          height: '500px',
          background: 'yellow',
        }}
      >
        right content section
      </div>
    }
  />
));
