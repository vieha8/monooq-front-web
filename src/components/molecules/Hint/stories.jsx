// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import Hint from './index';

storiesOf('Molecules/Hint', module)
  .add('Normal', () => (
    <div style={{ width: '100%', maxWidth: '300px', height: '100%', maxHeight: '300px' }}>
      <Hint
        title="お見積もりのヒント"
        content={['メッセージの相談内容を元に最終的な見積もりを相手に提示しましょう。', '思っていたより荷物が少なかったり、期間が短い場合はちょっぴり値下げすると喜ばれます。']}
      />
    </div>
  ));
