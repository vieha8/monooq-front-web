import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import Button from 'components/LV1/Forms/Button';

const Wrap = styled.div`
  margin: ${Dimens.medium_20}px auto 0;
  pointer-events: auto !important;
  ${props =>
    props.isSP &&
    `
    margin: auto;
    display: inline-block;
    min-width: 165px;
  `};
`;

const ButtonStyled = styled(Button)`
  font-size: 13px;
`;

export default ({ isSP, loading, onClick, onKeyDown, disabled, text }) => (
  <Wrap isSP={isSP}>
    <ButtonStyled
      center
      primary
      fontbold
      fill={1}
      disabled={disabled}
      loading={loading}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {text || 'リクエスト送信'}
    </ButtonStyled>
  </Wrap>
);
