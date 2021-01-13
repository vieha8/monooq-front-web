import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SpaceMap from './index';

SpaceMap.displayName = 'SpaceMap';

storiesOf('Atoms(LV1)/SpaceMap', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      スペースマップ
    `)(() => (
    <div style={{ width: '100%', padding: `${Dimens.storyBookPadding}` }}>
      <SpaceMap lat={35.691638} lng={139.704616} />
    </div>
  )),
);
