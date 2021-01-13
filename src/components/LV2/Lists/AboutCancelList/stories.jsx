import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import AboutCancelList from './index';

AboutCancelList.displayName = 'AboutCancelList';

storiesOf('Molecules(LV2)/Lists/AboutCancelList', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      キャンセルについて一覧(静的画面向け)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <AboutCancelList
          cancelContentList={[
            {
              header: '15日前まで',
              data: '決済金額の0％（決済金額の100％を返金）',
            },
            {
              header: '15日前',
              data: '決済金額の25％（決済金額の75％を返金）',
            },
            {
              header: '7日前',
              data: '決済金額の50％（決済金額の50％を返金）',
            },
            {
              header: '利用開始日以降',
              data: '決済金額の100％（返金はありません）',
            },
          ]}
        />
      </div>
    )),
  );
