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
  height: 140px;
  border: 1px solid ${Colors.borderGray};
  border-radius: 6px;
  text-align: center;
  padding: ${Dimens.medium}px;
  cursor: pointer;
`;

const Text = styled.span`
  display: block;
  font-size: ${FontSizes.small};
  color: ${Colors.black};
`;

const Image = styled.img`
  display: block;
  width: 60px;
  height: 60px;
  margin: ${Dimens.medium}px auto 0;
`;

export default props => (
  <Container>
    <Text>{evaluateTitles[props.evaluate]}</Text>
    <Image src={evaluateImages[props.evaluate]} alt={props.title} />
  </Container>
);
