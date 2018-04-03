// @flow

import React from 'react';
import styled from 'styled-components';
import Card from 'components/atomic/atoms/Card';
import HeroImage from 'components/atomic/atoms/HeroImage';
import InlineText from 'components/atomic/atoms/InlineText';
import { media } from 'helpers/style/media-query';
import { Colors, Dimens } from 'variables';

const Container = styled.div`
  width: 230px;
  cursor: pointer;
  ${media.phone`
    width: 100%;
    margin: 0;
  `}
`;

const Content = styled.div`
  padding: ${Dimens.medium}px;
  text-align: left;
`;

const Row = styled.div`
  margin-top: ${props => props.marginTop || 0}px;
`;

const CardShadowStyle = `
  box-shadow: none;
  transition: 0.3s;
  &:hover {
    box-shadow: 0 2px 4px rgba(0,0,0,0.4);
    transition: 0.3s; 
  }
  width: 100%;
`;

type PropTypes = {
  image: string,
  title: string,
  addressTown: string,
  isFurniture: boolean,
  priceFull: number,
  priceHalf: number,
  priceQuarter: number,
  onClick: Function,
}

export default (props: PropTypes) => (
  <Container
    onClick={props.onClick}
  >
    <Card noPadding customStyle={CardShadowStyle}>
      <HeroImage
        src={props.image}
        alt={props.title}
        height={160}
      />
      <Content>
        <Row>
          <InlineText.Base
            singleLine
            color={Colors.brandPrimary}
          >
            {props.addressTown}
          </InlineText.Base>
        </Row>
        <Row marginTop={Dimens.small}>
          <InlineText.Base singleLine>
            {props.title}
          </InlineText.Base>
        </Row>
        {props.isFurniture &&
          <Row marginTop={Dimens.small}>
            <InlineText.Bold>
              家具・家電OK
            </InlineText.Bold>
          </Row>
        }
        <Row marginTop={Dimens.small}>
          <InlineText.Base>
            料金目安
          </InlineText.Base>
        </Row>
        <Row marginTop={Dimens.small}>
          <InlineText.Base>
            {`
              ${props.priceFull}
              ${props.priceHalf > 0 ? `/ ${props.priceHalf}` : ''}
              ${props.priceQuarter > 0 ? `/ ${props.priceQuarter}` : ''}
            `}円
          </InlineText.Base>
        </Row>
      </Content>
    </Card>
  </Container>
);
