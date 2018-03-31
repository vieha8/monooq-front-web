// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import AccountTemplate from './index';

storiesOf('Templates/AccountPageTemplate', module)
  .add('Normal', () => (
    <AccountTemplate
      header={(
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'red',
          }}
        >
          header section
        </div>
      )}
      form={(
        <div
          style={{
            width: '100%',
            height: '400px',
            background: 'white',
          }}
        >
          form section
        </div>
      )}
    />
  ));
