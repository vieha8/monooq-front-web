// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import EntryButtons from './index';

storiesOf('Molecules/EntryButtons', module)
  .add('Enabled', () => (
    <div>
      <EntryButtons
        backButton={{
          text: '戻る',
          onClick: () => console.log('戻る'),
        }}
        enabledButton={{
          text: '次へ',
          onClick: () => console.log('次へ'),
        }}
        disabledButton={{
          text: '次へ',
        }}
        enabled
      />
    </div>
  ))
  .add('Disabled', () => (
    <div>
      <EntryButtons
        backButton={{
          text: '戻る',
          onClick: () => console.log('戻る'),
        }}
        enabledButton={{
          text: '次へ',
          onClick: () => console.log('次へ'),
        }}
        disabledButton={{
          text: '次へ',
        }}
      />
    </div>
  ));
