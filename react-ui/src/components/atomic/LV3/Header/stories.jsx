// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import Header from './index';
import HeaderMock from './mock/header';

const BodyMock = styled.div`
  background-image: url('http://placehold.jp/1000x500.png');
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

storiesOf('Organisms/Header', module)
  .add('Logged In', () => (
    <BodyMock>
      <HeaderMock />
    </BodyMock>
  ))
  .add('Anonymouse', () => (
    <BodyMock>
      <Header homeUri="#" user={null} loginUri="#" signupUri="#" />
    </BodyMock>
  ))
  .add('Logged In Top', () => (
    <BodyMock>
      <HeaderMock top />
    </BodyMock>
  ))
  .add('Anonymouse Top', () => (
    <BodyMock>
      <Header homeUri="#" user={null} loginUri="#" signupUri="#" top />
    </BodyMock>
  ))
  .add('Logged In Help', () => (
    <BodyMock>
      <HeaderMock help />
    </BodyMock>
  ))
  .add('Anonymouse Help', () => (
    <BodyMock>
      <Header homeUri="#" user={null} loginUri="#" signupUri="#" help />
    </BodyMock>
  ));
