import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import useImage1 from 'images/img-packing-family.jpg';
import useImage2 from 'images/img-wood-houses.jpg';
import useImage3 from 'images/img-carry-case.jpg';
import useImage4 from 'images/img-work-desk.jpg';
import useImage5 from 'images/img-warehouses.jpg';
import useImage6 from 'images/img-family.jpg';

import WhenIUseList from './index';

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
            image: useImage1,
            title: '引っ越しに',
            text: '引越しで一時的に荷物を置きたい。',
          },
          {
            image: useImage2,
            title: 'リフォームに',
            text: '自宅リフォーム中の家具を置く場所がない。',
          },
          {
            image: useImage3,
            title: '転機に',
            text: '出張・転勤・留学で荷物の保管をしたい。',
          },
          {
            image: useImage4,
            title: '仕事に',
            text: '仕事場をもっと広く使いたい。',
          },
          {
            image: useImage5,
            title: 'リーズナブルに',
            text: '費用の高いトランクルームの代わりに。',
          },
          {
            image: useImage6,
            title: '快適に',
            text: '生活空間を広げるため。',
          },
        ]}
      />
    </div>
  )),
);
