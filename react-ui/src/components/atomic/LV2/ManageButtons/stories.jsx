// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ManageButtons from './index';

ManageButtons.displayName = 'ManageButtons';

storiesOf('Molecules(LV2)/ManageButtons', module)
  .add(
    'Public',
    withInfo(`
      ### コンポーネント概要
      管理ボタン(PuclicVer)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <ManageButtons
          onClickEdit={() => console.log('onClickEdit')}
          onClickPublic={() => console.log('onClickPublic')}
          onClickPrivate={() => console.log('onClickPrivate')}
          public
        />
      </div>
    )),
  )
  .add(
    'Private',
    withInfo(`
      ### コンポーネント概要
      管理ボタン(PrivateVer)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <ManageButtons
          onClickEdit={() => console.log('onClickEdit')}
          onClickPublic={() => console.log('onClickPublic')}
          onClickPrivate={() => console.log('onClickPrivate')}
          private
        />
      </div>
    )),
  );
