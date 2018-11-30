// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
import { Colors, Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';

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
  overflow: hidden;
  ${props =>
    props.selected &&
    `
      background: ${Colors.pink};
    `};
  ${media.phone`
    padding: ${Dimens.small2}px;
    height: 100px;
  `};
`;

const Text = styled.div`
  width: 60%;
  float: left;
  font-weight: bold;
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
    padding-bottom: ${Dimens.small2}px;
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

export default (props: PropTypes) => (
  <Container position={props.position} selected={props.selected} onClick={props.onClick}>
    <Card selected={props.selected}>
      <Text>
        <InlineText.Base>{props.textHead}</InlineText.Base>
        <br />
        <InlineText.Base fontSize={FontSizes.small} fontSizeSp={FontSizes.small_12}>
          {props.textBody}
        </InlineText.Base>
      </Text>
      <Image src={props.image} alt="" />
    </Card>
  </Container>
);
