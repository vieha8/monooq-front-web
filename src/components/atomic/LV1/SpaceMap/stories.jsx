// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import SpaceMap from './index';

storiesOf('Atoms/SpaceMap', module).add('Normal', () => (
  <div style={{ width: '100%' }}>
    <SpaceMap lat={35.691638} lng={139.704616} />
  </div>
));
