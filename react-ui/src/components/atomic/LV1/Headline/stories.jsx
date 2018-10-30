// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { H1, H2, H3 } from './index';

H1.displayName = 'H1';
H2.displayName = 'H2';
H3.displayName = 'H3';

storiesOf('Atoms/Text/Headline', module).add(
  'Headline',
  withInfo(`
      ### コンポーネント概要
      ヘッドライン(H1/H2/H3)
    `)(() => (
    <div>
      <H1>Headline Level 1</H1>
      <H2>Headline Level 2</H2>
      <H3>Headline Level 3</H3>
    </div>
  )),
);
