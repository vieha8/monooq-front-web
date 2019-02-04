// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import DefaultContainer from './index';
import StyledDefaultContainer from './StyledDefaultContainer';

DefaultContainer.displayName = 'DefaultContainer';
DefaultContainer.StyledDefaultContainer = 'StyledDefaultContainer';

storiesOf('Atoms(LV1)/Util/DefaultContainer', module)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        Defaultコンテナ
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <DefaultContainer>Default Container.</DefaultContainer>
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
        <StyledDefaultContainer>Styled Default Container.</StyledDefaultContainer>
      </div>
    )),
  );
