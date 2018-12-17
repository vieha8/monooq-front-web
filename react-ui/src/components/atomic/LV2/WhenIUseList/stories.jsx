// @flow

import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import useImage1 from 'images/about_use1@2x.jpg';
import useImage2 from 'images/about_use2@2x.jpg';
import useImage3 from 'images/about_use3@2x.jpg';
import useImage4 from 'images/about_use4@2x.jpg';
import useImage5 from 'images/about_use5@2x.jpg';
import useImage6 from 'images/about_use6@2x.jpg';

import WhenIUseList from './index';

WhenIUseList.displayName = 'WhenIUseList';

storiesOf('Molecules(LV2)/WhenIUseList', module).add(
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
            text: '引越しで一時的に荷物を置きたい。',
          },
          {
            image: useImage2,
            text: '自宅リフォーム中の家具を置く場所がない。',
          },
          {
            image: useImage3,
            text: '出張・転勤・留学で荷物の保管をしたい。',
          },
          {
            image: useImage4,
            text: '仕事場をもっと広く使いたい。',
          },
          {
            image: useImage5,
            text: 'トランクルームの代わりに。',
          },
          {
            image: useImage6,
            text: '生活空間を広げるため。',
          },
        ]}
      />
    </div>
  )),
);
