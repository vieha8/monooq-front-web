// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ManageSpaceListItem from './index';

ManageSpaceListItem.displayName = 'Hint';

storiesOf('Molecules/ManageSpaceListItem', module)
  .addDecorator(StoryRouter())
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      スペース管理リストアイテム
      - ・削除ボタン押下時はConfirmをPOPUPで表示。
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <ManageSpaceListItem
          image={{
            src: 'http://placehold.jp/500x500.png',
            alt: 'name',
          }}
          address="六本木"
          content="東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！東京タワーに近くて便利！大きい荷物も何人分でもOK！"
          furniture
          prices={[20000, 10000, 5000]}
          onClickSpace={() => console.log('onClickSpace')}
        />
      </div>
    )),
  );
