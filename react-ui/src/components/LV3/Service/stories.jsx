// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Service from './index';

Service.displayName = 'Service';

storiesOf('Organisms(LV3)/Service', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        その他
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Service
          logout={{
            onClick: () => {
              console.log('onClick');
            },
          }}
        />
      </div>
    )),
  );
