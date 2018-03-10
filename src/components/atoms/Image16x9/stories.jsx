// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import Image16x9 from './index';

storiesOf('Atoms/Images/Image16x9', module)
  .add('Normal', () => (
    <div>
      <Image16x9 src="https://images.pexels.com/photos/209037/pexels-photo-209037.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb" alt="name" />
    </div>
  ));
