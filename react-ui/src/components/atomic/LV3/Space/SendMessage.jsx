// @flow

import React from 'react';
import styled from 'styled-components';
import SendMessage from 'components/atomic/LV2/Space/SendMessage';
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
  onClick: Function,
  loading: boolean,
  disabled: boolean,
};

export default (props: PropTypes) => (
  <SendMessageWrap>
    <SendMessage onClick={props.onClick} loading={props.loading} disabled={props.disabled} />
  </SendMessageWrap>
);
