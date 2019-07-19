// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import HowToUse from './index';

HowToUse.displayName = 'HowToUse';

storiesOf('Organisms(LV3)/HowToUse', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        ご利用ガイド・よくある質問
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <HowToUse />
      </div>
    )),
  );
