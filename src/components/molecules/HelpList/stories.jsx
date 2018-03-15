// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import HelpList from './index';

storiesOf('Molecules/HelpList', module)
  .add('Close', () => (
    <div>
      <HelpList
        title="荷物を置く場所を探しています！モノオクの使い方を教えてください。"
        content="スペースによって立地や環境、広さや高さなどが異なるからです。あなたの荷物に対して最適な料金を見積もりできるように、ホストは料金の目安を提示しています。"
        onClick={() => console.log('onClick')}
      />
    </div>
  ))
  .add('Open', () => (
    <div>
      <HelpList
        title="荷物を置く場所を探しています！モノオクの使い方を教えてください。"
        content="スペースによって立地や環境、広さや高さなどが異なるからです。あなたの荷物に対して最適な料金を見積もりできるように、ホストは料金の目安を提示しています。"
        onClick={() => console.log('onClick')}
        open
      />
    </div>
  ));
