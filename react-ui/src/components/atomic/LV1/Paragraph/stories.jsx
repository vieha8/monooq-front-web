// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import P from './index';

const text = `
  山路（やまみち）を登りながら、こう考えた。知に働けば角が立つ。情に棹させば流される。意地を通せば窮屈だ。
  とかくに人の世は住みにくい。住みにくさが高じると、安いところへ引き越したくなる。
`;

storiesOf('Atoms/Text/Paragraph', module)
  .add('Normal', () => (
    <div style={{ width: '100%', maxWidth: '300px' }}>
      <P>{text}</P>
    </div>
  ))
  .add('Small', () => (
    <div style={{ width: '100%', maxWidth: '300px' }}>
      <P small>{text}</P>
    </div>
  ));
