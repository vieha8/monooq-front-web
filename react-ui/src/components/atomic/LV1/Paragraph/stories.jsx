// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import P from './index';

P.displayName = 'P';

const text = `
  山路（やまみち）を登りながら、こう考えた。知に働けば角が立つ。情に棹させば流される。意地を通せば窮屈だ。
  とかくに人の世は住みにくい。住みにくさが高じると、安いところへ引き越したくなる。
`;

storiesOf('Atoms(LV1)/Text/Paragraph', module)
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      Paragraph(通常ver)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '380px', padding: `${Dimens.storyBookPadding}` }}>
        <P>{text}</P>
      </div>
    )),
  )
  .add(
    'Small',
    withInfo(`
      ### コンポーネント概要
      Paragraph(Smallver)
    `)(() => (
      <div style={{ width: '100%', maxWidth: '380px', padding: `${Dimens.storyBookPadding}` }}>
        <P small>{text}</P>
      </div>
    )),
  );
