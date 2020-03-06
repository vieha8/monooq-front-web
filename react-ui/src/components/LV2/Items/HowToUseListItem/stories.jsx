import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import HowToUseListItem from './index';

HowToUseListItem.displayName = 'HowToUseListItem';

const howtouse01 =
  'https://monooq.imgix.net/img%2Fservice%2Fhowtouse_01%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format';

storiesOf('Molecules(LV2)/Items/HowToUseListItem', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      利用の流れリストアイテム
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <HowToUseListItem
          image={howtouse01}
          contentNo="01"
          title="登録・相談"
          detail="ユーザー登録をしてスペースを検索！気になるスペースを見つけたら、ホストに預けたい荷物の内容や利用期間を伝え、相談を開始しましょう。"
        />
      </div>
    )),
  );
