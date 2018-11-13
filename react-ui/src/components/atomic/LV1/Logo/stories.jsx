// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';
import styled from 'styled-components';
import { Colors } from 'variables';

import Logo from './index';

const DivBgBlack = styled.div`
  background-color: ${Colors.black};
`;
Logo.displayName = 'Logo';
DivBgBlack.displayName = 'div';

storiesOf('Atoms(LV1)/Images/Logo', module)
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      ロゴ(ベース)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Logo.Base />
      </div>
    )),
  )
  .add(
    'Header',
    withInfo(`
      ### コンポーネント概要
      ロゴ(Header)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Logo.Header />
      </div>
    )),
  )
  .add(
    'Footer',
    withInfo(`
      ### コンポーネント概要
      ロゴ(Footer)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Logo.Footer />
      </div>
    )),
  )
  .add(
    'NormalWhite',
    withInfo(`
      ### コンポーネント概要
      ロゴ(ベース)(白)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <DivBgBlack>
          <Logo.BaseWhite />
        </DivBgBlack>
      </div>
    )),
  )
  .add(
    'HeaderWhite',
    withInfo(`
      ### コンポーネント概要
      ロゴ(Header)(白)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <DivBgBlack>
          <Logo.HeaderWhite />
        </DivBgBlack>
      </div>
    )),
  );
