// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Other from './index';

Other.displayName = 'Other';

storiesOf('Organisms(LV3)/Other', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        その他
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Other
          logout={{
            onClick: () => {
              console.log('onClick');
            },
          }}
        />
      </div>
    )),
  );
