import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import InlineText from 'components/LV1/Texts/InlineText';
import { Dimens, FontSizes } from 'variables';

const Wrap = styled.div`
  margin: ${Dimens.medium_20}px auto 0;
  ${media.phone`
    margin: ${Dimens.small_10}px auto 0;
  `};
`;

const AddressContent = styled.div`
  ${props =>
    props.detail &&
    `
    margin: ${Dimens.small}px auto ${Dimens.small2}px;
  `};
`;

export default ({ content }) => (
  <Wrap>
    <AddressContent>
      <InlineText.Base fontSize={`${FontSizes.medium}`} bold>
        {content}
      </InlineText.Base>
    </AddressContent>
    <AddressContent detail>
      <InlineText.EmphasisTiny>詳しい住所はお支払い後にお知らせします。</InlineText.EmphasisTiny>
    </AddressContent>
  </Wrap>
);
