// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import PickupStaffSpaceList from 'components/LV3/Top/pickup';
import PickupSpaceList from './index';

const shuffleArray = array => {
  const result = array;
  for (let i = array.length - 1; i > 0; i -= 1) {
    const rand = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    result[i] = array[rand];
    result[rand] = temp;
  }

  return result;
};
const displayPickupFeatureSpaceList = shuffleArray(PickupStaffSpaceList);

PickupSpaceList.displayName = 'PickupSpaceList';

const moreFeatureTrue = true;
const moreFeatureFalse = false;
const isMoreTrue = true;
const isMoreFalse = false;

storiesOf('Organisms(LV3)/PickupSpaceList', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        ピックアップスペースリスト
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <PickupSpaceList
          title="特徴でピックアップ"
          spaceList={displayPickupFeatureSpaceList.slice(0, 4 + (moreFeatureFalse ? 4 : 0))}
          noMore={isMoreTrue}
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
        - ・「もっとみる」ボタンはCSSでdisplay:none指定されており、見えないため注意。
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <PickupSpaceList
          title="特徴でピックアップ"
          spaceList={displayPickupFeatureSpaceList.slice(0, 4 + (moreFeatureTrue ? 4 : 0))}
          noMore={isMoreFalse}
          onClickMoreView={() => {}}
        />
      </div>
    )),
  );
