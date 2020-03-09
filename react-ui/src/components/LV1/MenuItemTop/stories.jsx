import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import BgImageAbout from 'images/bg-top-menu-sub-about.png';
import BgImageHowto from 'images/bg-top-menu-sub-howto.png';
import BgImageQa from 'images/bg-top-menu-sub-qa.png';

import MenuItemTop from './index';

MenuItemTop.displayName = 'MenuItemTop';

storiesOf('Atoms(LV1)/MenuItemTop', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      メニューアイテム(Top)
    `)(() => (
      <div style={{ width: '100%', padding: `${Dimens.storyBookPadding}` }}>
        <div>
          <MenuItemTop
            link={() => console.log('OnClickAbout')}
            titleSub="置き場に困った荷物がある方へ"
            titleMain="モノオクをはじめよう"
            paddingTitle="40px 0"
            bgImage={BgImageAbout}
          />
          <br />
          <MenuItemTop
            link={() => console.log('OnClickHowto')}
            titleSub="実際にモノオクを使ってみよう"
            titleMain="ご利用の流れ"
            paddingTitle="0 16px 16px 0"
            bgImage={BgImageHowto}
            type="howto"
          />
          <br />
          <MenuItemTop
            link={() => console.log('OnClickQa')}
            titleSub="使い方がわからない人へ"
            titleMain="よくあるご質問"
            paddingTitle="16px 0 0 16px"
            bgImage={BgImageQa}
            type="qa"
          />
        </div>
      </div>
    )),
  );
