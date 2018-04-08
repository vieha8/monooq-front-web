// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import MenuPageTemplate from './index';

storiesOf('Templates/MenuPageTemplate', module)
  .add('Normal', () => (
    <MenuPageTemplate
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
      headline="headline here"
      leftContent={(
        <div
          style={{
            width: '100%',
            height: '500px',
            background: 'green',
          }}
        >
          left content section
        </div>
      )}
      rightContent={(
        <div
          style={{
            width: '100%',
            height: '500px',
            background: 'yellow',
          }}
        >
          right content section
        </div>
      )}
      footer={(
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'blue',
          }}
        >
          footer section
        </div>
      )}
    />
  ))
  .add('Has Caption', () => (
    <MenuPageTemplate
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
      headline="headline here"
      caption="caption here"
      leftContent={(
        <div
          style={{
            width: '100%',
            height: '500px',
            background: 'green',
          }}
        >
          left content section
        </div>
      )}
      rightContent={(
        <div
          style={{
            width: '100%',
            height: '500px',
            background: 'yellow',
          }}
        >
          right content section
        </div>
      )}
      footer={(
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'blue',
          }}
        >
          footer section
        </div>
      )}
    />
  ));
