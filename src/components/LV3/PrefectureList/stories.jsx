import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';
import { MemoryRouter } from 'react-router-dom';

import PrefectureList from './index';

PrefectureList.displayName = 'PrefectureList';

storiesOf('Organisms(LV3)/PrefectureList', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
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
            {
              region: '甲信越・北陸',
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
            {
              region: '関東',
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
            {
              region: '東海',
              prefectureList: [
                { name: '北海道', link: '1' },
                { name: '青森', link: '2' },
                { name: '山形', link: '3' },
                { name: '秋田', link: '4' },
              ],
            },
            {
              region: '関西',
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
            {
              region: '四国',
              prefectureList: [
                { name: '北海道', link: '1' },
                { name: '青森', link: '2' },
                { name: '山形', link: '3' },
                { name: '秋田', link: '4' },
              ],
            },
            {
              region: '中国',
              prefectureList: [
                { name: '北海道', link: '1' },
                { name: '青森', link: '2' },
                { name: '山形', link: '3' },
                { name: '秋田', link: '4' },
                { name: '岩手', link: '5' },
              ],
            },
            {
              region: '九州・沖縄',
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
