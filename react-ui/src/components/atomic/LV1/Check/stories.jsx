// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import Check from './index';

storiesOf('Atoms/Forms/Check', module).add('Normal', () => (
  <div>
    <div>
      <Check checked>タンス</Check>
    </div>
    <div>
      <Check>本棚</Check>
    </div>
    <div>
      <Check checked>クローゼット</Check>
    </div>
  </div>
));
