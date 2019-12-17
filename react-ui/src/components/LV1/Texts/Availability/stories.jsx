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
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <Availability />
      <br />
      <br />
      <Availability status="full" />
      <br />
      <br />
      <Availability status="consultation" />
      <br />
      <br />
      <Availability status="draft" />
    </div>
  )),
);
