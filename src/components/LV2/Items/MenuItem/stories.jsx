import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ServiceMenu from './index';
ServiceMenu.displayName = 'ServiceMenu';

storiesOf('Molecules(LV2)/Items/MenuItem', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'ServiceMenu',
    withInfo(`
      ### コンポーネント概要
      サービスメニュー(通知カウンター付き)
    `)(() => (
      <div style={{ width: '320px', padding: `${Dimens.storyBookPadding}` }}>
        <ServiceMenu to="#" title="メッセージ" notificationCount={10} />
      </div>
    )),
  )
  .add(
    'ServiceMenu blank',
    withInfo(`
      ### コンポーネント概要
      サービスメニュー(通知カウンター付き)(新ウィンドウで開く)
    `)(() => (
      <div style={{ width: '320px', padding: `${Dimens.storyBookPadding}` }}>
        <ServiceMenu href="https://monooq.com" title="メッセージ" notificationCount={10} blank />
      </div>
    )),
  );
