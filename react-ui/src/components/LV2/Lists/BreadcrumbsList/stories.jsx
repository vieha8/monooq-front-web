import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import BreadcrumbsList from './index';

BreadcrumbsList.displayName = 'BreadcrumbsList';

storiesOf('Molecules(LV2)/Lists/BreadcrumbsList', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      パンくずリスト
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <BreadcrumbsList
          breadcrumbsList={[
            {
              text: 'TOP',
              link: '/',
            },
            {
              text: '東京都',
              link: '/tokyo',
            },
            {
              text: '渋谷区のスペース一覧',
            },
          ]}
        />
      </div>
    )),
  );
