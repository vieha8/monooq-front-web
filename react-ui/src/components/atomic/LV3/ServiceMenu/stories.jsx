// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';
import Path from 'config/path';

import ServiceMenu from './index';

ServiceMenu.displayName = 'ServiceMenu';

const user = { name: 'AAA', image: '' };

storiesOf('Organisms(LV3)/ServiceMenu', module)
  .addDecorator(StoryRouter())
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
          editProfile={{ to: Path.editProfile() }}
          help={{ href: 'https://help.monooq.com/' }}
          inquiry={{ to: Path.inquiry() }}
          howToUse={{ to: Path.howToUse() }}
          other={{ to: Path.other() }}
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
          editProfile={{ to: Path.editProfile() }}
          help={{ href: 'https://help.monooq.com/' }}
          inquiry={{ to: Path.inquiry() }}
          howToUse={{ to: Path.howToUse() }}
          other={{ to: Path.other() }}
          userName="モノオク タロウ"
          userImage="http://placehold.jp/500x500.png"
          isPhone
        />
      </div>
    )),
  );
