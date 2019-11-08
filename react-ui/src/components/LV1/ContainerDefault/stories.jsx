import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ContainerDefault from './index';
import ContainerDefaultStyled from './ContainerDefaultStyled';

ContainerDefault.displayName = 'ContainerDefault';
ContainerDefault.ContainerDefaultStyled = 'ContainerDefaultStyled';

storiesOf('Atoms(LV1)/ContainerDefault', module)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        Defaultコンテナ
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <ContainerDefault>Default Container.</ContainerDefault>
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
        <ContainerDefaultStyled>Styled Default Container.</ContainerDefaultStyled>
      </div>
    )),
  );
