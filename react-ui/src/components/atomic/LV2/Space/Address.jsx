// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
import { Colors, Dimens, FontSizes } from 'variables';

type PropTypes = {
  content: string,
};

const Wrap = styled.div`
  margin: ${Dimens.medium2}px auto 0;
  padding: ${Dimens.medium2}px 0 20px;
  border-top: 1px solid ${Colors.borderGray};
`;

export default (props: PropTypes) => (
  <Wrap>
    <div>
      <div>
        <InlineText.Base fontSize={`${FontSizes.small}`} bold>
          {props.content}
        </InlineText.Base>
      </div>
      <div>
        <InlineText.EmphasisTiny>詳しい住所はお支払い後にお知らせします。</InlineText.EmphasisTiny>
      </div>
    </div>
  </Wrap>
);
