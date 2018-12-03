// @flow

import React from 'react';
import styled from 'styled-components';
import Button from 'components/atomic/LV1/Button';
import InlineText from 'components/atomic/LV1/InlineText';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Caption = styled.div`
  display: inline-block;
  text-align: center;
  margin-top: ${Dimens.small}px;
  margin-left: ${Dimens.medium1}px;
  ${media.phone`
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
  onClick: Function,
  loading: boolean,
  disabled: boolean,
};

export default (props: PropTypes) => (
  <div>
    <ButtonWrap>
      <Button
        center
        primary
        fontbold
        fill={1}
        disabled={props.disabled}
        loading={props.loading}
        onClick={props.onClick}
      >
        このホストに相談する
      </Button>
    </ButtonWrap>
    <Caption>
      <InlineText.EmphasisTiny>ご請求はまだ発生しません</InlineText.EmphasisTiny>
    </Caption>
  </div>
);
