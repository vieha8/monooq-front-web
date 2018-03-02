import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import Space from './Space';
import Buttons from './Buttons';

const Container = styled.div`
  width: 100%;
  max-width: 300px;
  &:after {
    clear: both;
    content: "";
    display: block;
  }
  margin-top: ${Dimens.medium2}px;
  margin-left: ${Dimens.medium2}px;
  float: left;
  ${media.phone`
    float: none;
    margin: ${Dimens.medium2}px auto 0;
  `}
`;

export default () => (
  <Container>
    <Space place="麻布" name="東京タワーもバッチリ見えます" typeOK price="1000/5000/20000" />
    <Buttons />
  </Container>
);
