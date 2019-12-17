import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import TagCheckboxList from './index';

TagCheckboxList.displayName = 'TagCheckboxList';

const TagList = () => [
  {
    text: '4畳以上',
    isChecked: true,
    onClickCheckTown: () => console.log('onClickCheckTown'),
    options: { code: 1 },
  },
  {
    text: 'エレベータあり',
    isChecked: true,
    onClickCheckTown: () => console.log('onClickCheckTown'),
    options: { code: 2 },
  },
  {
    text: '1階',
    isChecked: true,
    onClickCheckTown: () => console.log('onClickCheckTown'),
    options: { code: 3 },
  },
  {
    text: '駐車スペースあり',
    isChecked: false,
    onClickCheckTown: () => console.log('onClickCheckTown'),
    options: { code: 4 },
  },
  {
    text: '換気可',
    isChecked: false,
    onClickCheckTown: () => console.log('onClickCheckTown'),
    options: { code: 5 },
  },
  {
    text: '出し入れ可',
    isChecked: true,
    onClickCheckTown: () => console.log('onClickCheckTown'),
    options: { code: 6 },
  },
];

storiesOf('Molecules(LV2)/Lists/TagCheckboxList', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      設備・条件チェックボックスリスト
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <TagCheckboxList tagList={TagList()} />
      </div>
    )),
  );
