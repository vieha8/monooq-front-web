// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Image16x9 from './index';

Image16x9.displayName = 'Image16x9';

storiesOf('Atoms/Images/Image16x9', module).add(
  'Normal',
  withInfo(`
    ### コンポーネント概要
    画像(比率16x9)
  `)(() => (
    <div style={{ width: '100%', maxWidth: '650px' }}>
      <Image16x9
        src="https://images.pexels.com/photos/209037/pexels-photo-209037.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb"
        alt="name"
      />
    </div>
  )),
);
