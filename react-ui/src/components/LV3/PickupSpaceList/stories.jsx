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
          spaceList={displayPickupFeatureSpaceList.slice(0, 4)}
        />
      </div>
    )),
  );
