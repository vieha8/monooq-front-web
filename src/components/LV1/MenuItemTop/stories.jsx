import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import MenuItemTop from './index';

const BgImageAbout =
  'https://monooq.imgix.net/img%2Fservice%2Fbg-top-menu-sub-about.png?auto=compress';
const BgImageHowto =
  'https://monooq.imgix.net/img%2Fservice%2Fbg-top-menu-sub-howto.png?auto=compress';
const BgImageQa = 'https://monooq.imgix.net/img%2Fservice%2Fbg-top-menu-sub-qa.png?auto=compress';

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
            bgImage={BgImageAbout}
            titleSub="置き場に困った荷物がある方へ"
            titleMain="モノオクをはじめよう"
          />
          <br />
          <MenuItemTop
            link={() => console.log('OnClickHowto')}
            bgImage={BgImageHowto}
            type="howto"
            titleSub="実際にモノオクを使ってみよう"
            titleMain="ご利用の流れ"
          />
          <br />
          <MenuItemTop
            link={() => console.log('OnClickQa')}
            bgImage={BgImageQa}
            type="qa"
            titleSub="使い方がわからない人へ"
            titleMain="よくあるご質問"
          />
        </div>
      </div>
    )),
  );
