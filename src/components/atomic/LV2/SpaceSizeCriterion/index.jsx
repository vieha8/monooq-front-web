// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
import { Colors, Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';

const Container = styled.div`
  width: 48%;
  ${props =>
    props.position === 'left' &&
    `
      float: left;
    `};
  ${props =>
    props.position === 'right' &&
    `
      float: right;
    `};
  cursor: pointer;
  ${media.phone`
    width: 100%;
    float: none;
    height: 100px;
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
  ${props =>
    props.selected &&
    `
      background: ${Colors.pink};
    `};
  ${media.phone`
    height: 100px;
  `};
`;

const Text = styled.div`
  ${media.phone`
    display: inline-block;
    vertical-align: middle;
    width: 50%;
  `};
`;

const Image = styled.img`
  display: block;
  margin-top: ${Dimens.medium}px;
  width: 100%;
  ${media.phone`
    display: inline-block;
    vertical-align: middle;
    width: 40%;
    margin-top: 0;
    margin-left: ${Dimens.medium}px;
    height: 100%;
  `};
`;

type PropTypes = {
  position: number,
  selected: boolean,
  onClick: Function,
  text: string,
  image: string,
};

export default (props: PropTypes) => (
  <Container position={props.position} selected={props.selected} onClick={props.onClick}>
    <Card selected={props.selected}>
      <Text>
        <InlineText.Base fontSizeSp={FontSizes.small}>{props.text}</InlineText.Base>
      </Text>
      <Image src={props.image} alt="" />
    </Card>
  </Container>
);
