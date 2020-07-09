import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';
import WhenIUseList from './index';

const moneyMetapher =
  'https://monooq.imgix.net/img%2Fservice%2Fmoney_metapher%402x.png?alt=media&auto=format&auto=compress';
const scheduleMetapher =
  'https://monooq.imgix.net/img%2Fservice%2Fschedule_metapher%402x.png?alt=media&auto=format&auto=compress';
const timeMetapher =
  'https://monooq.imgix.net/img%2Fservice%2Ftime_metapher%402x.png?alt=media&auto=format&auto=compress';

WhenIUseList.displayName = 'WhenIUseList';

storiesOf('Molecules(LV2)/Lists/WhenIUseList', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      利用例リスト
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <WhenIUseList
        list={[
          {
            image: moneyMetapher,
            title: 'リフォームに',
            text: '自宅リフォーム中の家具を置く場所がない。',
          },
          {
            image: scheduleMetapher,
            title: '仕事に',
            text: '仕事場をもっと広く使いたい。',
          },
          {
            image: timeMetapher,
            title: 'リーズナブルに',
            text: '費用の高いトランクルームの代わりに。',
          },
        ]}
      />
    </div>
  )),
);
