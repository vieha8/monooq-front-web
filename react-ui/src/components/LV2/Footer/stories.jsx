// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens, Colors } from 'variables';

import Footer from './index';
import ListItem from './ListItem';
import CompanyInfo from './CompanyInfo';

Footer.displayName = 'Footer';
ListItem.displayName = 'ListItem';
CompanyInfo.displayName = 'CompanyInfo';

storiesOf('Molecules(LV2)/Footer', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      共通フッタ
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Footer />
      </div>
    )),
  )
  .add(
    'ListItem',
    withInfo(`
      ### コンポーネント概要
      共通フッタ リストアイテム
    `)(() => (
      <div style={{ background: `${Colors.black4}`, padding: `${Dimens.storyBookPadding}` }}>
        <ListItem
          list={[
            { name: 'モノオクとは', link: '1' },
            { name: '利用の流れ', link: '2' },
            { name: 'ホストを始める', link: '3' },
            { name: 'よくある質問', link: '4' },
          ]}
        />
      </div>
    )),
  )
  .add(
    'CompanyInfo',
    withInfo(`
      ### コンポーネント概要
      共通フッタ 会社情報
    `)(() => (
      <div style={{ background: `${Colors.black4}`, padding: `${Dimens.storyBookPadding}` }}>
        <CompanyInfo />
      </div>
    )),
  );
