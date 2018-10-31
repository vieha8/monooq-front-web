// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SquareImage from './index';

SquareImage.displayName = 'SquareImage';

storiesOf('Atoms/Images/SquareImage', module).add(
  'Normal',
  withInfo(`
    ### コンポーネント概要
    画像(正方形)
  `)(() => (
    <div style={{ width: '100%', maxWidth: '650px' }}>
      <SquareImage
        size={500}
        src="https://images.pexels.com/photos/209037/pexels-photo-209037.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb"
        alt="name"
      />
    </div>
  )),
);
