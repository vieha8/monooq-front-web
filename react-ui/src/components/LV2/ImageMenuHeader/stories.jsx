// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ImageMenuHeader from './index';

ImageMenuHeader.displayName = 'ImageMenuHeader';

storiesOf('Molecules(LV2)/ImageMenuHeader', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'SP',
    withInfo(`
      ### コンポーネント概要
      ヘッダーメニュー
    `)(() => (
      <div style={{ width: '100%', maxWidth: '320px', padding: `${Dimens.storyBookPadding}` }}>
        <ImageMenuHeader iconRight />
      </div>
    )),
  );
