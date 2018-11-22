// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import NoDataView from './index';

NoDataView.displayName = 'NoDataView';

storiesOf('Organisms(LV3)/NoDataView', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        データ無し画面で利用するコンポーネント
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <NoDataView
          captionHead="登録したスペースがありません"
          caption="スペースの登録がありません。以下のボタンからスペースを登録して荷物を預る準備をしましょう。"
          buttonText="スペースを登録する"
          onClick={() => console.log('onClick Button')}
        />
      </div>
    )),
  );
