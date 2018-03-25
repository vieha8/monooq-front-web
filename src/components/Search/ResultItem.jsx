import React from 'react';
import styled from 'styled-components';
import { Card } from 'semantic-ui-react';
import { media } from 'helpers/style/media-query';
import { Colors, FontSizes, Dimens } from 'variables';

const Container = styled.div`
  width: 230px;
  cursor: pointer;
  margin: ${Dimens.medium3}px ${Dimens.medium}px 0 ${Dimens.medium}px;
  ${media.phone`
    width: 160px;
    margin: ${Dimens.xsmall}px;
  `}

  box-shadow: none;
  transition: 0.3s;
  &:hover {
    box-shadow: 0 2px 4px rgba(0,0,0,0.4);
    transition: 0.3s; 
  }
`;

const Content = styled.div`
  padding: ${Dimens.medium}px;
  text-align: left;
`;

const Image = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const Text = styled.span`
  display: block;
  font-size: ${FontSizes.small}px;
  line-height: 1.3;
  margin-top: ${Dimens.medium}px;
  ${media.phone`
    font-size: ${FontSizes.xsmall}px;
  `}
`;

const PlaceText = Text.extend`
  color: ${Colors.brandPrimary};
  margin-top: 0;
`;

const TypeOK = Text.extend`
  font-weight: bold;
  margin-top: ${Dimens.medium1}px;
  ${media.phone`
    margin-top: ${Dimens.small}px;
  `}
`;

const PriceTitle = Text.extend`
  margin-top: ${Dimens.medium1}px;
  ${media.phone`
    margin-top: ${Dimens.small}px;
  `}
`;

const Price = Text.extend`
  margin-top: ${Dimens.small2}px;
`;

export default props => (
  <Container
    onClick={() => props.history.push(`/space/${props.ID}`)}
  >
    <Card>
      {(props.Images && props.Images.length > 0) ? (
        <Image
          src={props.Images[0].ImageUrl}
          alt={props.Title}
          width="200"
          height="150"
        />
      ) : (
        <Image
          src="http://placehold.jp/200x150.png"
          alt=""
        />
      )}

      <Content>
        <PlaceText>{props.AddressTown || '未設定'}</PlaceText>
        <Text>{props.Title || 'タイトル未入力'}</Text>
        {props.IsFurniture ? <TypeOK>家具・家電OK</TypeOK> : null}
        <PriceTitle>料金目安（30日間）</PriceTitle>
        <Price>
          {`
            ${props.PriceFull}
            ${props.PriceQuarter > 0 ? `/ ${props.PriceQuarter}` : ''}
            ${props.PriceHalf > 0 ? `/ ${props.PriceHalf}` : ''}
          `}円</Price>
      </Content>
    </Card>
  </Container>
);