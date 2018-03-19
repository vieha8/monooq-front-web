// @flow

import React from 'react';
import styled from 'styled-components';
import { Colors } from 'variables';
import InlineText from 'components/atomic/atoms/InlineText';
import HeroImage from 'components/atomic/atoms/HeroImage';

const Row = styled.div`
  display: table;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  display: table-cell;
  vertical-align: top;
  width: 100px;
`;

const ContentWrapper = styled.div`
  display: table-cell;
  vertical-align: top;
  padding-left: 16px;
`;

const AddressText = InlineText.Small.extend`
  display: block;
  color: ${Colors.brandPrimary};
`;

const ContentText = InlineText.Small.extend`
  display: block;
  margin-top: 8px;
  max-height: ${1.6 * 3}em;
  overflow: hidden;
`;

type PropTypes = {
  image: {
    src: string,
    alt: string,
  },
  address: string,
  content: string,
  onClick: Function,
}

export default (props: PropTypes) => (
  <Row onClick={props.onClick}>
    <ImageWrapper>
      <HeroImage small {...props.image} />
    </ImageWrapper>
    <ContentWrapper>
      <AddressText>{props.address}</AddressText>
      <ContentText>{props.content}</ContentText>
    </ContentWrapper>
  </Row>
);
