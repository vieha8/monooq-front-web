import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import PrefectureList from './index';

PrefectureList.displayName = 'PrefectureList';

storiesOf('Molecules(LV2)/Lists/PrefectureList', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      利用例リスト
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <PrefectureList
        list={[
          {
            region: '北海道・東北',
            prefectureList: [
              { name: '北海道', link: '1' },
              { name: '青森', link: '2' },
              { name: '山形', link: '3' },
              { name: '秋田', link: '4' },
              { name: '岩手', link: '5' },
              { name: '宮城', link: '6' },
              { name: '福島', link: '7' },
            ],
          },
        ]}
      />
    </div>
  )),
);
