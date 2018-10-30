// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import {
  SearchIcon,
  MessageIcon,
  PictureIcon,
  AngleRight,
  AngleDown,
  CircleRight,
  CircleDown,
} from './index';

storiesOf('Atoms/Util/ActionIcon', module)
  .add(
    'SearchIcon',
    withInfo(`
      ### コンポーネント概要
      検索アイコン
    `)(() => (
      <div>
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
      <div>
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
      <div>
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
      <div>
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
      <div>
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
      <div>
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
      <div>
        <CircleDown />
      </div>
    )),
  );
