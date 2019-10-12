// @flow

import React from 'react';
import styled from 'styled-components';
import Button from 'components/LV1/Forms/Button';
import { Dimens, Colors } from 'variables';
import { media } from 'helpers/style/media-query';

const SendMessageWrap = styled.div`
  display: none;
  width: 100%;
  position: fixed;
  left: 0px;
  bottom: 0px;
  z-index: 2000;
  text-align: center;
  padding: ${Dimens.medium}px;
  background-color: rgba(255, 255, 255, 0.8);
  border-top: 1px solid ${Colors.borderGray};
  ${media.tablet`
    display: block;
  `};
`;

const ButtonWrap = styled.div`
  display: inline-block;
  min-width: 300px;
  ${media.phone`
    display: block;
    min-width: auto;
  `};
`;

type PropTypes = {
  text: string,
  disabled: boolean,
  loading: boolean,
  onClick: Function,
  onKeyDownButton: Function,
};

export default ({ text, disabled, loading, onClick, onKeyDownButton }: PropTypes) => (
  <SendMessageWrap>
    <ButtonWrap>
      <Button
        center
        primary
        fontbold
        fill={1}
        disabled={disabled}
        loading={loading}
        onClick={onClick}
        onKeyDown={onKeyDownButton}
      >
        {text}
      </Button>
    </ButtonWrap>
  </SendMessageWrap>
);
