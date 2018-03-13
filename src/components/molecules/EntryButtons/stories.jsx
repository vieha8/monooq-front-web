// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from 'components/atoms/Button';
import EntryButtons from './index';

storiesOf('Molecules/EntryButtons', module)
  .add('Enabled', () => (
    <div>
      <EntryButtons
        backButton={(
          <Button.Secondary>戻る</Button.Secondary>
        )}
        enabledButton={(
          <Button.Primary>次へ</Button.Primary>
        )}
        disabledButton={(
          <Button.Primary disabled>次へ</Button.Primary>
        )}
        enabled
      />
    </div>
  ))
  .add('Disabled', () => (
    <div>
      <EntryButtons
        backButton={(
          <Button.Secondary>戻る</Button.Secondary>
        )}
        enabledButton={(
          <Button.Primary>次へ</Button.Primary>
        )}
        disabledButton={(
          <Button.Primary disabled>次へ</Button.Primary>
        )}
      />
    </div>
  ));
