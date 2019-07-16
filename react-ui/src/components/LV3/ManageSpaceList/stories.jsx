// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ManageSpaceList from './index';

ManageSpaceList.displayName = 'ManageSpaceList';

const getData = () => {
  const spaces = [];
  for (let i = 0; i <= 5; i += 1) {
    spaces.push({
      image: {
        src: 'http://placehold.jp/500x500.png',
        alt: 'name',
      },
      address: '六本木',
      content:
        '東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！',
      furniture: true,
      prices: [20000, 10000, 5000],
      onClickSpace: () => console.log('onClickSpace'),
      onClickRemove: () => console.log('onClickRemove'),
    });
  }
  return spaces;
};

storiesOf('Organisms(LV3)/ManageSpaceList', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        管理スペースリスト
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <ManageSpaceList spaces={getData()} />
      </div>
    )),
  );
