import React, { Fragment } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import HowToUseList from './index';

HowToUseList.displayName = 'HowToUseList';

const howtouse01 =
  'https://monooq.imgix.net/img%2Fservice%2Fhowtouse_01%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format';
const howtouse02 =
  'https://monooq.imgix.net/img%2Fservice%2Fhowtouse_02%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format';
const howtouse03 =
  'https://monooq.imgix.net/img%2Fservice%2Fhowtouse_03%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format';
const howtouse04 =
  'https://monooq.imgix.net/img%2Fservice%2Fhowtouse_04%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format';

storiesOf('Molecules(LV2)/Lists/HowToUseList', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      利用の流れリスト
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <HowToUseList
          HowToUseList={[
            [
              {
                image: howtouse01,
                contentNo: '01',
                title: '登録・相談',
                detail:
                  'ユーザー登録をしてスペースを検索！気になるスペースを見つけたら、ホストに預けたい荷物の内容や利用期間を伝え、相談を開始しましょう。',
              },
              {
                image: howtouse02,
                contentNo: '02',
                title: '見積もり確認・お支払い',
                detail: (
                  <Fragment>
                    ホストと相談し利用が確定したら、ホストから見積りが届きます。見積もり内容に問題がなければ、お支払いをして取り引き成立です！
                    <br />
                    WEB上で決済できるので、面倒な手続きはありません。
                  </Fragment>
                ),
              },
            ],
            [
              {
                image: howtouse03,
                contentNo: '03',
                title: '荷物の搬入',
                detail:
                  '利用開始日になったらホストのスペースへ荷物を運び入れます。ご自身での搬入、または配送業者の手配を行いましょう。',
              },
              {
                image: howtouse04,
                contentNo: '04',
                title: '荷物の搬出',
                detail:
                  '利用終了日になったら荷物を引き取ります。もし延長を希望する場合は、ホストに相談し延長契約を結ぶことができます。',
              },
            ],
          ]}
        />
      </div>
    )),
  );
