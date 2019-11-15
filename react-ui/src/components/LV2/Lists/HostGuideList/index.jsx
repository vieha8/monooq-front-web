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

export default ({ header, guideList }) => (
  <Container>
    <Header>{header}</Header>
    {guideList.map((item, i) => (
      <TextCard key={i.toString()} text={item.text} />
    ))}
  </Container>
);
