import React from 'react';
import styled from 'styled-components';
import SendMessage from 'components/LV2/Space/SendMessage';
import { Colors, Dimens, ZIndexes } from 'variables';

const SendMessageWrap = styled.div`
  display: block;
  width: 100%;
  position: fixed;
  left: 0px;
  bottom: 0px;
  z-index: ${ZIndexes.frontPartsOverFooter};
  text-align: center;
  padding: ${Dimens.medium}px;
  background-color: ${Colors.white};
  border-top: 1px solid ${Colors.borderGray};
`;

export default ({ disabled, loading, onClick, onKeyDownButtonMessage }) => (
  <SendMessageWrap>
    <SendMessage
      disabled={disabled}
      loading={loading}
      onClick={onClick}
      onKeyDownButtonMessage={onKeyDownButtonMessage}
    />
  </SendMessageWrap>
);
