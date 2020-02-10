import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import NoneData from './index';

NoneData.displayName = 'NoneData';

storiesOf('Molecules(LV2)/NoneData', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        データ無し画面で利用するコンポーネント
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <NoneData
          captionHead="登録したスペースがありません"
          caption="スペースの登録がありません。以下のボタンからスペースを登録して荷物を預る準備をしましょう。"
          buttonText="スペースを登録する"
          onClick={() => console.log('onClick Button')}
        />
      </div>
    )),
  );
