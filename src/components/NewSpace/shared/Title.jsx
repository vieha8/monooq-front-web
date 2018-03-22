import React from 'react';
import styled from 'styled-components';
import { Colors, FontSizes, Dimens } from 'variables';

const Container = styled.div`
  margin-top: ${Dimens.large}px;
`;

const Title = styled.h3`
  display: block;
  color: ${Colors.darkGray1};
  font-size: ${FontSizes.medium}px;
  line-height: 2;
`;

const SubTitle = styled.span`
  display: block;
  color: ${Colors.darkGray2};
  font-size: ${FontSizes.small}px;
  margin-top: ${Dimens.xsmall}px;
  line-height: 1.5;
`;

export default (props) => {
  const titles = props.title.split('¥n');
  return (
    <Container>
      {titles.map((title, i) => <Title key={`title${i}`}>{title}</Title>)}
      {props.subTitle && <SubTitle>{props.subTitle}</SubTitle>}
    </Container>
  );
};
