import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import PageDefault from './index';
import PageDefaultStyled from './PageDefaultStyled';

PageDefault.displayName = 'PageDefault';
PageDefault.PageDefaultStyled = 'PageDefaultStyled';

storiesOf('Atoms(LV1)/PageDefault', module)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        Defaultコンテナ
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <PageDefault>Default Page.</PageDefault>
      </div>
    )),
  )
  .add(
    'Styled',
    withInfo(`
        ### コンポーネント概要
        Styled Defaultコンテナ
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <PageDefaultStyled>Styled Default Page.</PageDefaultStyled>
      </div>
    )),
  );
