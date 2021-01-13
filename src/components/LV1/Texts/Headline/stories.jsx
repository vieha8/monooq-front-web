import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import { H1, H2, H3 } from './index';

H1.displayName = 'H1';
H2.displayName = 'H2';
H3.displayName = 'H3';

storiesOf('Atoms(LV1)/Texts/Headline', module).add(
  'Headline',
  withInfo(`
      ### コンポーネント概要
      ヘッドライン(H1/H2/H3)
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <H1>Headline Level 1</H1>
      <H2 as="h2">Headline Level 2</H2>
      <H3 as="h3">Headline Level 3</H3>
    </div>
  )),
);
