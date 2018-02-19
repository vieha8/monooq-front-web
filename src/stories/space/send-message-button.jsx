import React from 'react';
import styled from 'styled-components';
import Card from './card';
import { isMobile, isMobileWindow } from '../../helpers/style/media-query';
import { FontSizes, Colors, Dimens, ZIndexes } from '../../variables';

const DefaultCard = props => (
  <Card
    marginTop={`${Dimens.medium2}px`}
    paddingTop={`${Dimens.medium}px`}
    paddingLeft={`${Dimens.medium}px`}
    paddingRight={`${Dimens.medium}px`}
    paddingBottom={0}
  >
    {props.children}
  </Card>
);

const MobileCard = props => (
  <Card
    marginTop={`${Dimens.medium2}px`}
    paddingTop={`${Dimens.medium}px`}
    paddingLeft={0}
    paddingRight={0}
    paddingBottom={0}
    position="fixed"
    left={0}
    right={0}
    bottom={0}
    zIndex={ZIndexes.topmost}
  >
    {props.children}
  </Card>
);

const ButtonContainer = styled.div`
  text-align: center;
  ${isMobile(`
    display: table;
    text-align: center;
    width: 100%;
  `)}
`;

const Button = styled.button`
  display: inline-block;
  background: ${Colors.buttonPink};
  padding: 9px 70px;
  font-size: ${FontSizes.medium}px;
  color: ${Colors.white};
  border-radius: 3px;
  &:hover {
    background: ${Colors.buttonPinkHover};
  }
  cursor: pointer;
  border: none;
  outline:none;

  ${isMobile(`
    display: table-cell;
    padding: 9px 20px;
    vertical-align: middle;
  `)}
`;

const SubText = styled.span`
  display: inline-block;
  font-size: ${FontSizes.xsmall}px;
  color: ${Colors.gray};
  margin-top: ${Dimens.medium}px;

  ${isMobile(`
    display: table-cell;
    vertical-align: middle;
  `)}
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
