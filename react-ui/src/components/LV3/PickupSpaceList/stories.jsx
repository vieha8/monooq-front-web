// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import PickupSpaceList from './index';

import PickupStaffSpaceList from 'components/LV3/Top/pickup';
const displayPickupFeatureSpaceList = shuffleArray(PickupStaffSpaceList);

function shuffleArray(array) {
  const result = array;
  for (let i = array.length - 1; i > 0; i -= 1) {
    const rand = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    result[i] = array[rand];
    result[rand] = temp;
  }

  return result;
}

PickupSpaceList.displayName = 'PickupSpaceList';

const moreFeature_true = true;
const moreFeature_false = false;
const isMore_true = true;
const isMore_false = false;

storiesOf('Organisms(LV3)/PickupSpaceList', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        ピックアップスペースリスト
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <PickupSpaceList
          title="特徴でピックアップ"
          spaceList={displayPickupFeatureSpaceList.slice(0, 4 + (moreFeature_false ? 4 : 0))}
          noMore={isMore_true}
          onClickMoreView={() => {}}
        />
      </div>
    )),
  )
  .add(
    'Normal isMore',
    withInfo(`
        ### コンポーネント概要
        ピックアップスペースリスト(MoreVer)
        - ・MoreVerは現状、利用していない。
        - ・「もっと見る」ボタンはCSSでdisplay:none指定されており、見えないため注意。
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <PickupSpaceList
          title="特徴でピックアップ"
          spaceList={displayPickupFeatureSpaceList.slice(0, 4 + (moreFeature_true ? 4 : 0))}
          noMore={isMore_false}
          onClickMoreView={() => {}}
        />
      </div>
    )),
  );
