// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';
import Path from 'config/path';

import ServiceMenu from './index';

ServiceMenu.displayName = 'ServiceMenu';

storiesOf('Organisms(LV3)/ServiceMenu', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'PC',
    withInfo(`
        ### コンポーネント概要
        サービスメニュー(PC)
      `)(() => (
      <div style={{ width: '400px', padding: `${Dimens.storyBookPadding}` }}>
        <ServiceMenu
          home={{ to: Path.home() }}
          message={{ to: Path.messages(), notificationCount: 0 }}
          schedule={{ to: Path.schedule(), notificationCount: 0 }}
          spaces={{ to: Path.spaces() }}
          addSpace={{ to: Path.createSpaceInfo() }}
          sales={{ to: Path.sales() }}
          paymentHistory={{ to: Path.paid() }}
          profileEdit={{ to: Path.profileEdit() }}
          help={{ href: 'https://help.monooq.com/' }}
          inquiry={{ to: Path.inquiry() }}
          howToUse={{ to: Path.howToUse() }}
          service={{ to: Path.service() }}
          isLogin
        />
      </div>
    )),
  )
  .add(
    'PC_nologin',
    withInfo(`
        ### コンポーネント概要
        サービスメニュー(PC)(未ログイン)
      `)(() => (
      <div style={{ width: '400px', padding: `${Dimens.storyBookPadding}` }}>
        <ServiceMenu
          home={{ to: Path.home() }}
          message={{ to: Path.messages(), notificationCount: 0 }}
          schedule={{ to: Path.schedule(), notificationCount: 0 }}
          spaces={{ to: Path.spaces() }}
          addSpace={{ to: Path.createSpaceInfo() }}
          sales={{ to: Path.sales() }}
          paymentHistory={{ to: Path.paid() }}
          profileEdit={{ to: Path.profileEdit() }}
          help={{ href: 'https://help.monooq.com/' }}
          inquiry={{ to: Path.inquiry() }}
          howToUse={{ to: Path.howToUse() }}
          service={{ to: Path.service() }}
        />
      </div>
    )),
  )
  .add(
    'Phone',
    withInfo(`
        ### コンポーネント概要
        サービスメニュー(Phone)
      `)(() => (
      <div style={{ width: '400px', padding: `${Dimens.storyBookPadding}` }}>
        <ServiceMenu
          home={{ to: Path.home() }}
          message={{ to: Path.messages(), notificationCount: 0 }}
          schedule={{ to: Path.schedule(), notificationCount: 0 }}
          spaces={{ to: Path.spaces() }}
          addSpace={{ to: Path.createSpaceInfo() }}
          sales={{ to: Path.sales() }}
          paymentHistory={{ to: Path.paid() }}
          profileEdit={{ to: Path.profileEdit() }}
          help={{ href: 'https://help.monooq.com/' }}
          inquiry={{ to: Path.inquiry() }}
          howToUse={{ to: Path.howToUse() }}
          service={{ to: Path.service() }}
          userName="モノオク タロウ"
          userImage="http://placehold.jp/500x500.png"
          isPhone
          isLogin
        />
      </div>
    )),
  )
  .add(
    'Phone_nologin',
    withInfo(`
        ### コンポーネント概要
        サービスメニュー(Phone)(未ログイン)
      `)(() => (
      <div style={{ width: '400px', padding: `${Dimens.storyBookPadding}` }}>
        <ServiceMenu
          home={{ to: Path.home() }}
          message={{ to: Path.messages(), notificationCount: 0 }}
          schedule={{ to: Path.schedule(), notificationCount: 0 }}
          spaces={{ to: Path.spaces() }}
          addSpace={{ to: Path.createSpaceInfo() }}
          sales={{ to: Path.sales() }}
          paymentHistory={{ to: Path.paid() }}
          profileEdit={{ to: Path.profileEdit() }}
          help={{ href: 'https://help.monooq.com/' }}
          inquiry={{ to: Path.inquiry() }}
          howToUse={{ to: Path.howToUse() }}
          service={{ to: Path.service() }}
          userName="モノオク タロウ"
          userImage="http://placehold.jp/500x500.png"
          isPhone
        />
      </div>
    )),
  );
