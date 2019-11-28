import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import SendMessage from 'components/LV2/Space/SendMessage';
import { Colors, Dimens, ZIndexes } from 'variables';

const SendMessageWrap = styled.div`
  display: none;
  width: 100%;
  min-width: 320px;
  position: fixed;
  left: 0px;
  bottom: 0px;
  z-index: ${ZIndexes.frontPartsOverFooter};
  text-align: center;
  padding: ${Dimens.small2}px ${Dimens.medium}px;
  background-color: ${Colors.white};
  border-top: 1px solid ${Colors.borderGray};
  ${media.tablet`
    display: block;
  `};
`;

export default ({ priceTatami, disabled, loading, onClick, onKeyDownButtonMessage }) => (
  <SendMessageWrap>
    <SendMessage
      priceTatami={priceTatami}
      disabled={disabled}
      loading={loading}
      onClick={onClick}
      onKeyDownButtonMessage={onKeyDownButtonMessage}
    />
  </SendMessageWrap>
);
