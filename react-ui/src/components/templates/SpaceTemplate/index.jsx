// @flow

import React from 'react';
import styled from 'styled-components';
import ClearfixContainer from 'components/LV1/ClearfixContainer';
import { media } from 'helpers/style/media-query';
import { Colors, Dimens } from 'variables';
import Page from '../Page';

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

type PropTypes = {
  header: React.Element<*>,
  meta: React.Element<*>,
  map: React.Element<*>,
  detail: React.Element<*>,
  price: React.Element<*>,
  message: React.Element<*>,
  note: React.Element<*>,
};

export default ({ header, meta, map, detail, price, message, note }: PropTypes) => (
  <SpaceTemplateContainer>
    {header}
    {meta}
    {map}
    <Page fillPhone smallMargin>
      <Container>
        <ClearfixContainer>
          <DetailContainer>{detail}</DetailContainer>
          <PriceContainer>
            {price}
            <MarginTop>{message}</MarginTop>
            <MarginTop>{note}</MarginTop>
          </PriceContainer>
        </ClearfixContainer>
      </Container>
    </Page>
  </SpaceTemplateContainer>
);
