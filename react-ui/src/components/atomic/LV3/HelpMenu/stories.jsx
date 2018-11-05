// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Menu from './index';

Menu.displayName = 'Menu';

storiesOf('Organisms/HelpMenu', module)
  .addDecorator(StoryRouter())
  .add(
    'Host',
    withInfo(`
        ### コンポーネント概要
        ヘルプメニュー
      `)(() => (
      <div style={{ width: '400px', padding: `${Dimens.storyBookPadding}` }}>
        <Menu
          howToUser={{ open: true }}
          onClickHowToUser={() => console.log('onClickHowToUser')}
          aboutService={{ href: '#', show: true }}
          aboutUserTransaction={{ href: '#', show: true }}
          howToBeHost={{ open: true }}
          onClickHowToBeHost={() => console.log('onClickHowToBeHost')}
          aboutHost={{ href: '#', show: true }}
          aboutRegisterSpace={{ href: '#', show: true }}
          aboutHostTransaction={{ href: '#', show: true }}
          aboutSalesTransfer={{ href: '#', show: true }}
          aboutLogin={{ href: '#' }}
          other={{ href: '#' }}
        />
      </div>
    )),
  );
