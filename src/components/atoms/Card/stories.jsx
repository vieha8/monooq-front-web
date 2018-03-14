// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import Card from './index';

storiesOf('Atoms/Util/Card', module)
  .add('Block', () => (
    <div>
      <Card block>
        <span>ほげほげほげ</span>
      </Card>
      <Card block>
        <span>ほげほげほげ</span>
      </Card>
    </div>
  ))
  .add('InlineBlock', () => (
    <div>
      <Card>
        <span>ほげほげほげ</span>
      </Card>
      <Card>
        <span>ほげほげほげ</span>
      </Card>
    </div>
  ));
