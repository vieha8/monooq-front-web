// @flow

import React from 'react';
import styled from 'styled-components';
import SendMessage from 'components/LV2/Space/SendMessage';
import { Colors, Dimens } from 'variables';

const SendMessageWrap = styled.div`
  display: block;
  width: 100%;
  position: fixed;
  left: 0px;
  bottom: 0px;
  z-index: 100;
  text-align: center;
  padding: ${Dimens.medium}px;
  background-color: ${Colors.white};
  border-top: 1px solid ${Colors.borderGray};
`;

type PropTypes = {
  disabled: boolean,
  loading: boolean,
  onClick: Function,
  onKeyDownButtonMessage: Function,
};

export default ({ disabled, loading, onClick, onKeyDownButtonMessage }: PropTypes) => (
  <SendMessageWrap>
    <SendMessage
      disabled={disabled}
      loading={loading}
      onClick={onClick}
      onKeyDownButtonMessage={onKeyDownButtonMessage}
    />
  </SendMessageWrap>
);
