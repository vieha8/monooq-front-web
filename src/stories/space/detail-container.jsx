import React from 'react';
import styled from 'styled-components';
import { isMobile } from '../../helpers/style/media-query';
import { FontSizes, Colors, Dimens } from '../../variables';

const Container = styled.div`
  display: table;
  width: 100%;
  min-height: 20px;
  padding: ${Dimens.medium}px 0;
  &:not(:first-child) {
    border-top: 1px solid ${Colors.borderGray};
  }
  &::after {
    clear: both;
    content: "";
    display: block;
  }

  ${isMobile(`
    display: block;
  `)}
`;

const Title = styled.span`
  display: table-cell;
  width: 100px;
  vertical-align: top;
  font-size: ${FontSizes.medium}px;
  text-align: left;

  ${isMobile(`
    display: block;
    width: 100%;
  `)}
`;

const ContentContainer = styled.div`
  display: table-cell;
  vertical-align: top;
  padding-left: ${Dimens.medium2}px;
  ${isMobile(`
    display: block;
    padding-left: 0;
    margin-top: ${Dimens.medium}px;
  `)}
`;

export default props => (
  <Container>
    <Title>{props.title}</Title>
    <ContentContainer>
      {props.renderContent()}
    </ContentContainer>
  </Container>
);
