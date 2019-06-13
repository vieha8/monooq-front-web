// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import AboutMonooq from './index';

AboutMonooq.displayName = 'AboutMonooq';

storiesOf('Organisms(LV3)/AboutMonooq', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        その他
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <AboutMonooq
          logout={{
            onClick: () => {
              console.log('onClick');
            },
          }}
        />
      </div>
    )),
  );
