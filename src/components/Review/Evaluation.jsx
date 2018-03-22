import React from 'react';
import styled from 'styled-components';
import { Colors, Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import evaluate1 from 'images/monooq_logo_mark.svg';
import evaluate2 from 'images/monooq_logo_mark.svg';
import evaluate3 from 'images/monooq_logo_mark.svg';

const evaluateImages = [
  evaluate1,
  evaluate2,
  evaluate3,
];

const evaluateTitles = [
  '良い',
  'ふつう',
  '悪い',
];

const Container = styled.div`
  width: 180px;
  min-height: 140px;
  border: 1px solid ${Colors.borderGray};
  border-radius: 6px;
  text-align: center;
  padding: ${Dimens.medium}px;
  cursor: pointer;

  ${props => props.selected && `
    border: 1px solid ${Colors.brandTerciary};
    background: ${Colors.brandTerciary};    
  `}

  ${media.phone`
    width: 100%;
    min-height: 80px;
    display: table;
  `}
`;

const Text = styled.span`
  display: block;
  font-size: ${FontSizes.small};
  color: ${Colors.black};

  ${media.phone`
    display: table-cell;
    vertical-align: middle;
  `}
`;

const ImageWrapper = styled.span`
  display: block;
  width: 60px;
  height: 60px;
  margin: ${Dimens.medium}px auto 0;

  ${media.phone`
    display: table-cell;
    vertical-align: middle;
    margin: 0;
    text-align: right;
  `}
`;

const Image = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
`;

const Count = styled.div`
  display: block;
  font-size: ${FontSizes.small};
  color: ${Colors.black};
  text-align: center;
  margin-top: ${Dimens.medium}px;
  ${media.phone`
    padding: 0;
    display: table-cell;
    vertical-align: middle;
    width: 60px;
  `}
`;

export default props => (
  <Container
    selected={props.selected}
    onClick={() => props.onClick && props.onClick(props.evaluate)}
  >
    <Text>{evaluateTitles[props.evaluate]}</Text>
    <ImageWrapper>
      <Image src={evaluateImages[props.evaluate]} alt={props.title} />
    </ImageWrapper>
    {props.count && (
      <Count>{props.count}</Count>
    )}
  </Container>
);
