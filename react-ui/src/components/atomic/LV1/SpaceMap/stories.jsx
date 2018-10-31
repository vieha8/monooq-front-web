// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SpaceMap from './index';

SpaceMap.displayName = 'SpaceMap';

storiesOf('Atoms/SpaceMap', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      スペースマップ
    `)(() => (
    <div style={{ width: '100%' }}>
      <SpaceMap lat={35.691638} lng={139.704616} />
    </div>
  )),
);
