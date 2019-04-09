// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import InlineText from 'components/LV1/InlineText';
import { Dimens, FontSizes } from 'variables';

type PropTypes = {
  content: string,
};

const Wrap = styled.div`
  margin: ${Dimens.medium2}px auto 0;
  ${media.phone`
    margin: ${Dimens.small_10}px auto 0;
  `};
`;

const AddressContent = styled.div`
  ${props =>
    props.detail &&
    `
    margin-top: ${Dimens.xxsmall}px;
  `};
`;

export default (props: PropTypes) => (
  <Wrap>
    <AddressContent>
      <InlineText.Base fontSize={`${FontSizes.small_15}`} bold>
        {props.content}
      </InlineText.Base>
    </AddressContent>
    <AddressContent detail>
      <InlineText.EmphasisTiny>詳しい住所はお支払い後にお知らせします。</InlineText.EmphasisTiny>
    </AddressContent>
  </Wrap>
);
