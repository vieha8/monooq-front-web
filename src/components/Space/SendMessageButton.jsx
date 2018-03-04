import React from 'react';
import styled from 'styled-components';
import { media, isMobileWindow } from 'helpers/style/media-query';
import { FontSizes, Colors, Dimens, ZIndexes } from 'variables';
import Card from './Card';

const DefaultCard = props => (
  <Card
    customStyle={`
      margin-top: ${Dimens.medium2}px;
      padding: ${Dimens.medium}px;
    `}
  >
    {props.children}
  </Card>
);

const MobileCard = props => (
  <Card
    customStyle={`
      padding-top: ${Dimens.small2}px;
      padding-bottom: ${Dimens.small2}px;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: ${ZIndexes.topmost};
    `}
  >
    {props.children}
  </Card>
);

const ButtonContainer = styled.div`
  text-align: center;
  ${media.phone`
    display: table;
    text-align: center;
    width: 100%;
  `}
`;

const Button = styled.button`
  display: inline-block;
  background: ${Colors.brandPrimary};
  padding: 9px 70px;
  font-size: ${FontSizes.medium}px;
  color: ${Colors.white};
  border-radius: 6px;
  &:hover {
    background: ${Colors.brandTerciary};
  }
  cursor: pointer;
  border: none;
  outline:none;

  ${media.phone`
    display: table-cell;
    padding: 9px 20px;
    vertical-align: middle;
  `}
`;

const SubText = styled.span`
  display: inline-block;
  font-size: ${FontSizes.xsmall}px;
  color: ${Colors.darkGray2};
  margin-top: ${Dimens.medium}px;

  ${media.phone`
    display: table-cell;
    vertical-align: middle;
  `}
`;

export default (props) => {
  const CardComponent = isMobileWindow() ? MobileCard : DefaultCard;
  return (
    <CardComponent>
      {isMobileWindow() &&
        <ButtonContainer>
          <SubText>ご請求はまだ発生しません</SubText>
          <Button onClick={props.onClickSendMessage}>メッセージを送る</Button>
        </ButtonContainer>
      }
      {!isMobileWindow() &&
        <ButtonContainer>
          <Button onClick={props.onClickSendMessage}>メッセージを送る</Button>
          <SubText>ご請求はまだ発生しません</SubText>
        </ButtonContainer>
      }
    </CardComponent>
  );
};
