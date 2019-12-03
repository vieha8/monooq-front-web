import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Lp123Guest from './index';

Lp123Guest.displayName = 'Lp123Guest';

storiesOf('Organisms(LV3)/Lp123Guest', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
          ### コンポーネント概要
          ゲスト向けLP(1,2,3)
        `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Lp123Guest />
      </div>
    )),
  );
