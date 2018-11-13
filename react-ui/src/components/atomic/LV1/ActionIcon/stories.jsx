// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import {
  SearchIcon,
  MessageIcon,
  PictureIcon,
  AngleRight,
  AngleDown,
  CircleRight,
  CircleDown,
} from './index';

storiesOf('Atoms(LV1)/Util/ActionIcon', module)
  .add(
    'SearchIcon',
    withInfo(`
      ### コンポーネント概要
      検索アイコン
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <SearchIcon />
      </div>
    )),
  )
  .add(
    'MessageIcon',
    withInfo(`
      ### コンポーネント概要
      メッセージアイコン
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <MessageIcon />
      </div>
    )),
  )
  .add(
    'PictureIcon',
    withInfo(`
      ### コンポーネント概要
      画像アイコン
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <PictureIcon />
      </div>
    )),
  )
  .add(
    'AngleRight',
    withInfo(`
      ### コンポーネント概要
      右矢印アイコン
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <AngleRight />
      </div>
    )),
  )
  .add(
    'AngleDown',
    withInfo(`
      ### コンポーネント概要
      下矢印アイコン
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <AngleDown />
      </div>
    )),
  )
  .add(
    'CircleRight',
    withInfo(`
      ### コンポーネント概要
      右矢印アイコン(円形)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <CircleRight />
      </div>
    )),
  )
  .add(
    'CircleDown',
    withInfo(`
      ### コンポーネント概要
      下矢印アイコン(円形)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <CircleDown />
      </div>
    )),
  );
