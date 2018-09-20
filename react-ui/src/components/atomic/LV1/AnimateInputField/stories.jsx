// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import AnimateInputField from './index';

storiesOf('Atoms/AnimateInputField', module).add('Normal', () => (
  <div style={{ width: '100%', maxWidth: '320px' }}>
    <AnimateInputField iconRight show placeholder="プレースホルダー" />
  </div>
));
