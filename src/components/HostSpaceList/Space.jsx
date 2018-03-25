import React from 'react';
import styled from 'styled-components';
import { Card } from 'semantic-ui-react';
import { Colors, FontSizes, Dimens } from 'variables';

const Container = styled.div`
  width: 140px;
  cursor: pointer;
  margin: 0 ${Dimens.medium}px 0 ${Dimens.medium}px;
  float: left;
`;

const Content = styled.div`
  padding: ${Dimens.small}px ${Dimens.medium}px;
  text-align: left;
`;

const Image = styled.img`
  width: 100%;
  height: 90px;
  object-fit: cover;
`;

const Text = styled.span`
  display: block;
  font-size: ${FontSizes.xsmall}px;
  margin-top: ${Dimens.xsmall}px;
`;

const PlaceText = Text.extend`
  color: ${Colors.brandPrimary};
  margin-top: 0;
`;

const TypeOK = Text.extend`
  font-weight: bold;
  margin-top: ${Dimens.small}px;
`;

const PriceTitle = Text.extend`
  margin-top: ${Dimens.small}px;
`;

const Price = Text.extend`
  margin-top: ${Dimens.xsmall}px;
`;

const Empty = () => (<span>&nbsp;</span>);

export default props => (
  <Container
    onClick={() => props.history.push(`/space/${props.id}`)}
  >
    <Card>
      <Image
        src={props.imageUrl}
        alt={props.name}
      />
      <Content>
        <PlaceText>{props.place || <Empty />}</PlaceText>
        <Text>{props.name || <Empty />}</Text>
        {props.typeOK ? <TypeOK>家具・家電OK</TypeOK> : <Empty />}
        <PriceTitle>料金目安（30日間）</PriceTitle>
        <Price>{props.price ? `${props.price} 円` : <Empty />}</Price>
      </Content>
    </Card>
  </Container>
);
