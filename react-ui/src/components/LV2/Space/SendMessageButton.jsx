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
    min-width: 185px;
  `};
`;

export default ({ isSP, loading, onClick, onKeyDown, disabled, text }) => (
  <Wrap isSP={isSP}>
    <Button
      center
      primary
      fontbold
      fill={1}
      disabled={disabled}
      loading={loading}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {text || 'リクエスト申請'}
    </Button>
  </Wrap>
);
