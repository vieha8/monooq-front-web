import React from 'react';
import styled from 'styled-components';
import { Header, Title, ImageDrop } from '../index';

const Container = styled.div`
`;

export default () => (
  <Container>
    <Header
      header="スペースを登録する"
      subHeader="どんなスペースを掲載しますか？"
    />
    <Title
      title="スペースの様子を写真で登録しよう"
      subTitle="最大4枚まで登録可能です。"
    />
    <ImageDrop />
  </Container>
);
