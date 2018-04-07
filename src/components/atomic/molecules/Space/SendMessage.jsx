// @flow

import React from 'react';
import styled from 'styled-components';
import Button from 'components/atomic/atoms/Button';
import InlineText from 'components/atomic/atoms/InlineText';
import { Dimens } from 'variables';

const Caption = styled.div`
  text-align: center;
  margin-top: ${Dimens.small}px;
`;

type PropTypes = {
  onClick: Function,
  loading: boolean,
  disabled: boolean,
};

export default (props: PropTypes) => (
  <div>
    <Button
      center
      primary
      height={40}
      disabled={props.disabled}
      loading={props.loading}
      onClick={props.onClick}
    >
      相談する
    </Button>
    <Caption>
      <InlineText.Emphasis>ご請求はまだ発生しません</InlineText.Emphasis>
    </Caption>
  </div>
);
