// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import AnimateSearchInputField from './index';

AnimateSearchInputField.displayName = 'AnimateSearchInputField';

storiesOf('Molecules(LV2)/AnimateSearchInputField', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'IconRightPhone',
    withInfo(`
      ### コンポーネント概要
      検索条件入力欄(検索ボタン右配置)(phone) ※検索欄廃止済み
    `)(() => (
      <div style={{ width: '100%', maxWidth: '320px', padding: `${Dimens.storyBookPadding}` }}>
        <AnimateSearchInputField iconRight searchConditionUri="" isPhone />
      </div>
    )),
  )
  .add(
    'IconRightPC',
    withInfo(`
      ### コンポーネント概要
      検索条件入力欄(検索ボタン右配置)(pc) ※検索欄廃止済み
    `)(() => (
      <div style={{ width: '100%', maxWidth: '320px', padding: `${Dimens.storyBookPadding}` }}>
        <AnimateSearchInputField iconRight searchConditionUri="" />
      </div>
    )),
  );
