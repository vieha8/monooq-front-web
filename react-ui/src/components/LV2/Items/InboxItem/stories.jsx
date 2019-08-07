// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import InboxItem from './index';

InboxItem.displayName = 'InboxItem';

storiesOf('Molecules(LV2)/Items/InboxItem', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      IMBOXアイテム
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <InboxItem
          image="http://placehold.jp/500x500.png"
          name="モノオク太郎さん"
          spaceName="ほげほげスペース"
          receivedAt={new Date()}
        />
      </div>
    )),
  );
