// @flow

import React from 'react';
import styled from 'styled-components';
import { Colors, Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import InlineText from 'components/LV1/Texts/InlineText';

const Container = styled.div`
  width: 100%;
  float: left;
  ${props =>
    props.position === 'left' &&
    `
    `};
  ${props =>
    props.position === 'right' &&
    `
      margin-top: 25px;
    `};
  cursor: pointer;
  ${media.phone`
    width: 100%;
    float: none;
    height: 100%;
    &:not(:first-child) {
      margin-top: ${Dimens.medium}px;
    }
  `};
`;

const Card = styled.div`
  padding: ${Dimens.medium}px;
  width: 100%;
  border: 1px solid ${Colors.borderGray};
  border-radius: 6px;
  overflow: hidden;
  ${props =>
    props.selected &&
    `
      background: ${Colors.pink};
    `};
  ${media.phone`
    padding: ${Dimens.small2}px;
    height: 100%;
  `};
`;

const Text = styled.div`
  width: 60%;
  float: left;
  font-weight: bold;
  ${props =>
    props.body &&
    `
      margin-top: ${Dimens.xxsmall}px;
    `};
  ${media.phone`
    display: inline-block;
    vertical-align: middle;
    width: 60%;
  `};
`;

const Image = styled.img`
  display: block;
  margin-top: ${Dimens.medium}px;
  width: 100%;
  max-width: 200px;
  float: right;
  ${media.phone`
    display: inline-block;
    vertical-align: middle;
    width: 40%;
    height: 100%;
  `};
`;

type PropTypes = {
  position: number,
  selected: boolean,
  onClick: Function,
  textHead: string,
  textBody: string,
  image: string,
};

export default ({ position, selected, onClick, textHead, textBody, image }: PropTypes) => (
  <Container position={position} selected={selected} onClick={onClick}>
    <Card selected={selected}>
      <Text>
        <InlineText.Base fontSizeSp={FontSizes.medium_18}>{textHead}</InlineText.Base>
      </Text>
      <Text body>
        <InlineText.Base fontSize={FontSizes.small_12}>{textBody}</InlineText.Base>
      </Text>
      <Image src={image} alt="" />
    </Card>
  </Container>
);
