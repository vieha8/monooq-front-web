// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes } from 'variables';
import TextCard from 'components/LV1/Texts/TextCard';

const Container = styled.div`
  width: 100%;
  margin-bottom: ${Dimens.medium2}px;
`;

const Header = styled.div`
  width: 100%;
  padding: ${Dimens.small}px 0 ${Dimens.medium}px 0;
  font-size: ${FontSizes.medium_18}px;
  font-weight: bold;
`;

type PropTypes = {
  header: String,
  data1: String,
  data2: String,
  data3: String,
};

export default ({ header, data1, data2, data3 }: PropTypes) => (
  <Container>
    <Header>{header}</Header>
    <TextCard data={data1} />
    <TextCard data={data2} />
    <TextCard data={data3} />
  </Container>
);
