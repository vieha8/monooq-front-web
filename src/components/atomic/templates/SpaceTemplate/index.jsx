// @flow

import React from 'react';
import styled from 'styled-components';
import ClearfixContainer from 'components/atomic/atoms/ClearfixContainer';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';
import Page from '../Page';

const Map = styled.div`
  height: 360px;
  ${media.tablet`
    height: 240px;  
  `}
`;

const Container = styled.div`
  margin: ${Dimens.medium3}px 0;
  ${media.tablet`
    margin: 0;
  `}
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
  `}
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
  `}
`;

const MarginTop = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const Footer = styled.div`
  ${media.tablet`
    display: none;
  `}
`;

type PropTypes = {
  header: React.Element<*>,
  map: React.Element<*>,
  detail: React.Element<*>,
  price: React.Element<*>,
  message: React.Element<*>,
  footer: React.Element<*>,
};

export default (props: PropTypes) => (
  <div>
    {props.header}
    <Map>{props.map}</Map>
    <Page fillPhone>
      <Container>
        <ClearfixContainer>
          <DetailContainer>
            {props.detail}
          </DetailContainer>
          <PriceContainer>
            {props.price}
            <MarginTop>
              {props.message}
            </MarginTop>
          </PriceContainer>
        </ClearfixContainer>
      </Container>
    </Page>
    <Footer>
      {props.footer}
    </Footer>
  </div>
);
