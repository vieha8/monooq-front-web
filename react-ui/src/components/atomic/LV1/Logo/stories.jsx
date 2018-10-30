// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import styled from 'styled-components';
import { Colors } from 'variables';

import Logo from './index';

const DivBgBlack = styled.div`
  background-color: ${Colors.black};
`;
Logo.displayName = 'Logo';
DivBgBlack.displayName = 'div';

storiesOf('Atoms/Images/Logo', module)
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      ロゴ(ベース)
    `)(() => <Logo.Base />),
  )
  .add(
    'Header',
    withInfo(`
      ### コンポーネント概要
      ロゴ(Header)
    `)(() => <Logo.Header />),
  )
  .add(
    'Footer',
    withInfo(`
      ### コンポーネント概要
      ロゴ(Footer)
    `)(() => <Logo.Footer />),
  )
  .add(
    'NormalWhite',
    withInfo(`
      ### コンポーネント概要
      ロゴ(ベース)(白)
    `)(() => (
      <DivBgBlack>
        <Logo.BaseWhite />
      </DivBgBlack>
    )),
  )
  .add(
    'HeaderWhite',
    withInfo(`
      ### コンポーネント概要
      ロゴ(Header)(白)
    `)(() => (
      <DivBgBlack>
        <Logo.HeaderWhite />
      </DivBgBlack>
    )),
  );
