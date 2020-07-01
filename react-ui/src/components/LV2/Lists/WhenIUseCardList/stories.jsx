import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';
import WhenIUseCardList from './index';

const moneyMetapher =
  'https://monooq.imgix.net/img%2Fservice%2Fmoney_metapher%402x.png?alt=media&auto=format&auto=compress';
const scheduleMetapher =
  'https://monooq.imgix.net/img%2Fservice%2Fschedule_metapher%402x.png?alt=media&auto=format&auto=compress';
const timeMetapher =
  'https://monooq.imgix.net/img%2Fservice%2Ftime_metapher%402x.png?alt=media&auto=format&auto=compress';

WhenIUseCardList.displayName = 'WhenIUseCardList';

storiesOf('Molecules(LV2)/Lists/WhenIUseCardList', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      利用例リスト
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <WhenIUseCardList
        list={[
          {
            image: moneyMetapher,
            text: '引越しで一時的に荷物を置きたい。',
          },
          {
            image: scheduleMetapher,
            text: '自宅リフォーム中の家具を置く場所がない。',
          },
          {
            image: timeMetapher,
            text: '仕事場をもっと広く使いたい。',
          },
        ]}
      />
    </div>
  )),
);
