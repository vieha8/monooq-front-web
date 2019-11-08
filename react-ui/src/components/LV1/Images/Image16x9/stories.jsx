import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Image16x9 from './index';

Image16x9.displayName = 'Image16x9';

storiesOf('Atoms(LV1)/Images/Image16x9', module).add(
  'Normal',
  withInfo(`
    ### コンポーネント概要
    画像(比率16x9)
  `)(() => (
    <div style={{ width: '100%', maxWidth: '730px', padding: `${Dimens.storyBookPadding}` }}>
      <Image16x9
        src="https://images.pexels.com/photos/209037/pexels-photo-209037.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb"
        alt="name"
      />
    </div>
  )),
);
