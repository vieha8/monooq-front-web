// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import Radio from './index';

storiesOf('Atoms/Forms/Radio', module)
  .add('Normal', () => (
    <div>
      <div>
        <Radio checked>家具・家電あり</Radio>
      </div>
      <div>
        <Radio>なし</Radio>
      </div>
    </div>
  ));
