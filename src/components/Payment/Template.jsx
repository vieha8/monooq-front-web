import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Container = styled.div`
  padding: 80px 0;
  max-width: 1024px;
  margin: 0 auto;
  ${media.tablet`
    padding: ${Dimens.medium}px;
  `}
`;

const ContentContainer = styled.div`
  display: table-cell;
  width: 60%;
  vertical-align: top;
  ${media.tablet`
    display: block;
    width: 100%;
  `}
`;

const TitleContainer = styled.div`
`;

const Row = styled.div`
  margin-top: ${Dimens.medium2}px;
  ${props => props.alignRight && `
    text-align: right;
  `}
  ${props => props.mobile && `
    display: none;
  `}
  ${media.tablet`
    ${props => props.mobile && `
      display: block;
    `}
  `}
`;

const SideContainer = styled.div`
  display: table-cell;
  padding-top: 100px;
  width: 30%;
  padding-left: ${Dimens.large}px;
  ${media.tablet`
    display: none;
  `}
`;

export default props => (
  <Container>
    <ContentContainer>
      <TitleContainer>
        {props.title}
      </TitleContainer>
      <Row>
        {props.paidError}
      </Row>
      <Row>
        {props.subtitle}
      </Row>
      <Row>
        {props.inputName}
      </Row>
      <Row>
        {props.inputNumber}
      </Row>
      <Row>
        {props.inputExpires}
      </Row>
      <Row>
        {props.inputCvc}
      </Row>
      <Row mobile>
        {props.mobileEstimate}
      </Row>
      <Row>
        {props.cancelDetail}
      </Row>
      <Row alignRight>
        {props.aboutCancel}
      </Row>
      <Row>
        {props.button}
      </Row>
    </ContentContainer>
    <SideContainer>
      {props.sideContent}
    </SideContainer>
  </Container>
);
