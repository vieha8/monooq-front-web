import React from 'react';
import styled from 'styled-components';
import { FontSizes, Colors, Dimens } from '../../variables';

const Container = styled.div`
  width: 100%;
  min-height: 20px;
  padding: ${Dimens.medium}px 0;
  &:not(:first-child) {
    border-top: 1px solid ${Colors.borderGray};
  }
`;

const Title = styled.span`
  display: inline-block;
  width: 120px;
  vertical-align: top;
  font-size: ${FontSizes.medium}px;
  text-align: left;
`;

const ContentContainer = styled.div`
  display: inline-block;
`;

export default props => (
  <Container>
    <Title>{props.title}</Title>
    <ContentContainer>
      {props.renderContent()}
    </ContentContainer>
  </Container>
);
