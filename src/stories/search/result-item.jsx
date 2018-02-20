import React from 'react';
import styled from 'styled-components';
import { media } from '../../helpers/style/media-query';
import { Colors, FontSizes, Dimens } from '../../variables';

const Container = styled.div`
  border-radius: 3px;
  border: 1px solid ${Colors.borderGray};
  width: 237px;
  height: 331px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.4);
  cursor: pointer;
  margin: ${Dimens.medium3}px ${Dimens.medium}px 0 ${Dimens.medium}px;

  ${media.phone`
    width: 160px;
    margin: ${Dimens.xsmall}px;
  `}
`;

const Content = styled.div`
  padding: ${Dimens.small}px ${Dimens.medium}px;
  text-align: left;
`;

const Image = styled.img`
  width: 100%;
  height: 160px;
`;

const Text = styled.span`
  display: block;
  font-size: ${FontSizes.xsmall}px;
  margin-top: ${Dimens.medium}px;
`;

const PlaceText = Text.extend`
  color: ${Colors.pink};
  margin-top: ${Dimens.small}px;
`;

const TypeOK = Text.extend`
  font-weight: bold;
  margin-top: ${Dimens.medium1}px;
`;

const PriceTitle = Text.extend`
  margin-top: ${Dimens.medium1}px;
`;

const Price = Text.extend`
  margin-top: ${Dimens.small2}px;
`;

export default props => (
  <Container
    onClick={() => window.open('/space/1')}
  >
    <Image
      src="http://placehold.jp/200x150.png"
      alt=""
    />
    <Content>
      <PlaceText>{props.place}</PlaceText>
      <Text>{props.name}</Text>
      {props.typeOK && <TypeOK>家具・家電OK</TypeOK>}
      <PriceTitle>料金目安（30日間）</PriceTitle>
      <Price>{props.price}</Price>
    </Content>
  </Container>
);
