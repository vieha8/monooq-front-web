// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StorybookRouter from 'storybook-router';

import InboxItem from './index';

storiesOf('Molecules/InboxItem', module)
  .addDecorator(StorybookRouter())
  .add('Normal', () => (
    <div>
      <InboxItem
        image="http://placehold.jp/500x500.png"
        name="モノオク太郎さん"
        spaceName="ほげほげスペース"
        receivedAt={new Date()}
      />
    </div>
  ));
