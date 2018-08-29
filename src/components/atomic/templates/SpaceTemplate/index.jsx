// @flow

import React from 'react';
import styled from 'styled-components';
import ClearfixContainer from 'components/atomic/LV1/ClearfixContainer';
import { media } from 'helpers/style/media-query';
import { Colors, Dimens } from 'variables';
import Page from '../Page';

const Map = styled.div`
  height: 360px;
  ${media.tablet`
    height: 240px;  
  `};
`;

const SpaceTemplateContainer = styled.div`
  background-color: ${Colors.lightGray1Bg};
  ${media.tablet`
      background-color: ${Colors.white};
  `};
`;

const Container = styled.div`
  margin: ${Dimens.medium3}px 0;
  ${media.tablet`
    margin: 0;
  `};
`;

const DetailContainer = styled.div`
  max-width: 700px;
  width: 60%;
  padding-bottom: 80px;
  float: left;

  ${media.tablet`
    float: none;
    width: 100%;
    max-width: 100%;
    margin: 0;
  `};
`;

const PriceContainer = styled.div`
  max-width: 300px;
  width: 40%;
  margin-left: ${Dimens.medium2}px;
  float: left;

  ${media.tablet`
    float: none;
    margin: 0;
    width: 100%;
    max-width: 100%;
    padding-bottom: 40px;
  `};
`;

const MarginTop = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const Footer = styled.div`
  ${media.tablet`
    display: none;
  `};
`;

type PropTypes = {
  helmet: React.Element<*>,
  header: React.Element<*>,
  map: React.Element<*>,
  detail: React.Element<*>,
  price: React.Element<*>,
  message: React.Element<*>,
  note: React.Element<*>,
  footer: React.Element<*>,
};

export default (props: PropTypes) => (
  <SpaceTemplateContainer>
    {props.header}
    {props.helmet}
    <Map>{props.map}</Map>
    <Page fillPhone smallMargin>
      <Container>
        <ClearfixContainer>
          <DetailContainer>{props.detail}</DetailContainer>
          <PriceContainer>
            {props.price}
            <MarginTop>{props.message}</MarginTop>
            <MarginTop>{props.note}</MarginTop>
          </PriceContainer>
        </ClearfixContainer>
      </Container>
    </Page>
    <Footer>{props.footer}</Footer>
  </SpaceTemplateContainer>
);
