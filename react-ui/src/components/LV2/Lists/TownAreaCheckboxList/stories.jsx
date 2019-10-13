// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens, Colors } from 'variables';

import TownAreaCheckboxList from './index';

TownAreaCheckboxList.displayName = 'TownAreaCheckboxList';

storiesOf('Molecules(LV2)/Lists/TownAreaCheckboxList', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      町域・エリアチェックボックスリスト
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <TownAreaCheckboxList
          caption="地域から選ぶ"
          captionColor={Colors.lightGray3}
          cityName="目黒区"
          areaAroundList={[
            {
              text: '代々木神園町',
              link: '/1111',
            },
            {
              text: '宇田川町',
              link: '/2222',
            },
            {
              text: '上原',
              link: '/333',
            },
            {
              text: '東',
              link: '/333',
            },
            {
              text: '代々木神園町',
              link: '/1111',
            },
            {
              text: '宇田川町',
              link: '/2222',
            },
            {
              text: '上原',
              link: '/333',
            },
            {
              text: '東',
              link: '/333',
            },
            {
              text: '代々木神園町',
              link: '/1111',
            },
            {
              text: '宇田川町',
              link: '/2222',
            },
            {
              text: '上原',
              link: '/333',
            },
            {
              text: '東',
              link: '/333',
            },
            {
              text: '代々木神園町',
              link: '/1111',
            },
            {
              text: '宇田川町',
              link: '/2222',
            },
            {
              text: '上原',
              link: '/333',
            },
            {
              text: '東',
              link: '/333',
            },
          ]}
        />
      </div>
    )),
  );
