// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';
import styled from 'styled-components';

import Header from './index';
import HeaderMock from './mock/header';

HeaderMock.displayName = 'HeaderMock';
Header.displayName = 'Header';

const BodyMock = styled.div`
  background-image: url('http://placehold.jp/1000x500.png');
`;

storiesOf('Organisms(LV3)/Header', module)
  .addDecorator(StoryRouter())
  .add(
    'Logged In',
    withInfo(`
        ### コンポーネント概要
        共通ヘッダ(ログイン中)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <BodyMock>
          <HeaderMock />
        </BodyMock>
      </div>
    )),
  )
  .add(
    'Anonymouse',
    withInfo(`
        ### コンポーネント概要
        共通ヘッダ(未ログイン)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <BodyMock>
          <Header homeUri="#" user={null} loginUri="#" signupUri="#" storys />
        </BodyMock>
      </div>
    )),
  )
  .add(
    'Logged In Top',
    withInfo(`
        ### コンポーネント概要
        共通ヘッダ(トップ)(ログイン中)(ロゴ白文字)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <BodyMock>
          <HeaderMock top />
        </BodyMock>
      </div>
    )),
  )
  .add(
    'Anonymouse Top',
    withInfo(`
        ### コンポーネント概要
        共通ヘッダ(トップ)(未ログイン)(ロゴ白文字)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <BodyMock>
          <Header homeUri="#" user={null} loginUri="#" signupUri="#" top storys />
        </BodyMock>
      </div>
    )),
  )
  .add(
    'Logged In Help',
    withInfo(`
        ### コンポーネント概要
        共通ヘッダ(ヘルプ)(ログイン中)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <BodyMock>
          <HeaderMock help />
        </BodyMock>
      </div>
    )),
  )
  .add(
    'Anonymouse Help',
    withInfo(`
        ### コンポーネント概要
        共通ヘッダ(ヘルプ)(未ログイン)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <BodyMock>
          <Header homeUri="#" user={null} loginUri="#" signupUri="#" help storys />
        </BodyMock>
      </div>
    )),
  );
