// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import AnimateSearchInputField from './index';

AnimateSearchInputField.displayName = 'AnimateSearchInputField';

storiesOf('Molecules(LV2)/AnimateSearchInputField', module)
  .add(
    'IconLeft',
    withInfo(`
      ### コンポーネント概要
      検索条件入力欄(検索ボタン左配置)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '320px', padding: `${Dimens.storyBookPadding}` }}>
        <AnimateSearchInputField
          iconLeft
          show
          placeholder="プレースホルダー"
          onClickIcon={() => console.log('onClickIcon')}
        />
      </div>
    )),
  )
  .add(
    'IconRight',
    withInfo(`
      ### コンポーネント概要
      検索条件入力欄(検索ボタン右配置)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '320px', padding: `${Dimens.storyBookPadding}` }}>
        <AnimateSearchInputField
          iconRight
          show
          placeholder="プレースホルダー"
          onClickIcon={() => console.log('onClickIcon')}
          onKeyDownInputField={e => console.log(e)}
        />
      </div>
    )),
  );
