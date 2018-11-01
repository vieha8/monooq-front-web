// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ServiceMenu from './ServiceMenu';
import HelpMenu from './HelpMenu';

ServiceMenu.displayName = 'ServiceMenu';
HelpMenu.displayName = 'HelpMenu';

storiesOf('Molecules/MenuItem', module)
  .addDecorator(StoryRouter())
  .add(
    'ServiceMenu',
    withInfo(`
      ### コンポーネント概要
      サービスメニュー(通知カウンター付き)
    `)(() => (
      <div style={{ width: '320px', padding: `${Dimens.storyBookPadding}` }}>
        <ServiceMenu href="#" title="メッセージ" notificationCount={10} />
      </div>
    )),
  )
  .add(
    'HelpMenu',
    withInfo(`
      ### コンポーネント概要
      ヘルプメニュー
    `)(() => (
      <div style={{ width: '320px', padding: `${Dimens.storyBookPadding}` }}>
        <HelpMenu onClick={() => console.log('onClick')} title="ナビゲーション" angleRight show />
        <HelpMenu
          onClick={() => console.log('onClick')}
          title="ナビゲーション"
          angleDown
          open
          show
        />
        <HelpMenu onClick={() => console.log('onClick')} title="サービスについて" fillColor show />
      </div>
    )),
  );
