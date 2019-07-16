// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Service from './index';

Service.displayName = 'Service';

storiesOf('Organisms(LV3)/Service', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
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
