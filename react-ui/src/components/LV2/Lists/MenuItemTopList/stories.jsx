import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import MenuItemTopList from './index';

const BgImageAbout =
  'https://monooq.imgix.net/img%2Fservice%2Fbg-top-menu-sub-about.png?auto=compress';
const BgImageHowto =
  'https://monooq.imgix.net/img%2Fservice%2Fbg-top-menu-sub-howto.png?auto=compress';
const BgImageQa = 'https://monooq.imgix.net/img%2Fservice%2Fbg-top-menu-sub-qa.png?auto=compress';

MenuItemTopList.displayName = 'MenuItemTopList';

storiesOf('Molecules(LV2)/Lists/MenuItemTopList', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        安心取引リスト
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <MenuItemTopList
          list={[
            {
              link: 'https://monooq.com/',
              bgImage: BgImageAbout,
              titleSub: '置き場に困った荷物がある方へ',
              titleMain: 'モノオクをはじめよう',
            },
            {
              link: 'https://monooq.com/',
              bgImage: BgImageHowto,
              type: 'howto',
              titleSub: '実際にモノオクを使ってみよう',
              titleMain: 'ご利用の流れ',
            },
            {
              link: 'https://monooq.com/',
              bgImage: BgImageQa,
              type: 'qa',
              titleSub: '使い方がわからない人へ',
              titleMain: 'よくあるご質問',
              isLinkBlank: true,
            },
          ]}
        />
      </div>
    )),
  );
