import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ContentDescription from './index';

ContentDescription.displayName = 'ContentDescription';

storiesOf('Molecules(LV2)/Texts/ContentDescription', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      禁止行為一覧(静的画面向け)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <ContentDescription
          title="取り引き"
          dontActionList={[
            {
              header: 'モノオク以外で支払いを行うこと。',
              text:
                'モノオクではユーザーからお預かりした料金を、取引完了後にホストへ安全にお支払いします。直接の口座振込や現金のお支払いは一切行わないでください。もしも、このような行為を持ちかけられた場合は、モノオクカスタマーサポートまでご連絡ください。',
            },
            {
              header: '登録した本人以外が連絡や取引をすること。',
              text: '必ずアカウント登録を行ったご本人が取引を行ってください。',
            },
            {
              header: '申告と異なる荷物をホストへ強要すること。',
              text:
                'ホストが認識していない荷物を無理やりお願いすることは禁止です。事前にしっかりと内容を伝えましょう。',
            },
            {
              header: '無断でスペース利用の延長をすること。',
              text:
                '利用終了日に荷物を取りに来ない、連絡がとれない、などお互いが困る行為は禁止です。',
            },
            {
              header: '同意が取れていない方法で荷物を届けること。',
              text:
                '一方的に着払いをするなど、ホストが困る身勝手な行為は禁止です。荷物の配送方法に関してもお互いが同意の上で取り引きを進めてください。',
            },
          ]}
        />
      </div>
    )),
  );
