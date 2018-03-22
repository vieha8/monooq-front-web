import React from 'react';
import styled from 'styled-components';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Container = styled.div`
  margin-top: ${Dimens.medium3}px;
  width: 48%;
  ${props => (props.position === 'left' && `
    float: left;
  `)}
  ${props => (props.position === 'right' && `
    float: right;
  `)}
  cursor: pointer;
  ${media.phone`
    width: 100%;
    float: none;
    height: 100px;
    &:not(:first-child) {
      margin-top: ${Dimens.medium}px;
    }
  `}
`;

const Card = styled.div`
  padding: ${Dimens.medium}px;
  width: 100%;
  border: 1px solid ${Colors.borderGray};
  border-radius: 6px;
  ${props => props.selected && `
    background: ${Colors.pink};
  `}
  ${media.phone`
    height: 100px;
  `}
`;

const Text = styled.div`
  color: ${Colors.darkGray1};
  font-size: ${FontSizes.medium}px;
  line-height: 1.5;
  ${media.phone`
    display: inline-block;
    vertical-align: middle;
    width: 50%;
    font-size: ${FontSizes.xsmall}px;
  `}
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
  `}
`;

export default props => (
  <Container
    position={props.position}
    selected={props.selected}
    onClick={props.onClick}
  >
    <Card selected={props.selected}>
      <Text>{props.text}</Text>
      <Image src={props.image} alt={props.text} />
    </Card>
  </Container>
);
