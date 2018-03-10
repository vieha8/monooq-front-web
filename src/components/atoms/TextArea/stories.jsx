// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import TextArea from './index';

storiesOf('Atoms/Forms/TextArea', module)
  .add('Available', () => (
    <div style={{ width: '300px' }}>
      <TextArea rows={5} />
    </div>
  ))
  .add('Disable', () => (
    <div style={{ width: '300px' }}>
      <TextArea rows={5} disabled="disabled" />
    </div>
  ));
