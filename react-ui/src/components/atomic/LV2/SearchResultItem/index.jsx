// @flow

import React from 'react';
import styled from 'styled-components';
import numeral from 'numeral';
import Card from 'components/atomic/LV1/Card';
import HeroImage from 'components/atomic/LV1/HeroImage';
import InlineText from 'components/atomic/LV1/InlineText';
import { Colors } from 'variables';

const Container = styled.div`
  max-width: 165px;
  cursor: pointer;
  margin: auto;
`;

const Content = styled.div`
  padding: 5px;
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
  address: string,
  priceFull: number,
  priceQuarter: number,
  onClick: Function,
};

export default ({ onClick, title, image, address, priceQuarter, priceFull }: PropTypes) => (
  <Container onClick={onClick}>
    <Card noPadding noBorder customStyle={CardShadowStyle}>
      <HeroImage src={image} alt={title} height={120} />
      <Content>
        <Row>
          <InlineText.Base singleLine fontSize={14} color={Colors.brandPrimary} bold>
            {address}
          </InlineText.Base>
        </Row>
        <Row>
          <InlineText.Base noWrap lineheight={1} bold>
            {priceQuarter ? numeral(priceQuarter).format('0,0') : numeral(priceFull).format('0,0')}
            円から
          </InlineText.Base>
        </Row>
      </Content>
    </Card>
  </Container>
);
