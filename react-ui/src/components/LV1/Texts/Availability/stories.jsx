import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Availability from './index';

Availability.displayName = 'Availability';

storiesOf('Atoms(LV1)/Texts/Availability', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      空室状況
      ・ステータス(1:満室,2:要相談,これ以外:空室)
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <Availability />
      <br />
      <br />
      <Availability status={1} />
      <br />
      <br />
      <Availability status={2} />
    </div>
  )),
);
