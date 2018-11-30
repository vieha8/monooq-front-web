// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
import { Dimens, FontSizes } from 'variables';

type PropTypes = {
  content: string,
};

const Wrap = styled.div`
  margin: 0 auto ${Dimens.medium2}px;
  padding: 0 0 ${Dimens.medium2}px;
`;

export default (props: PropTypes) => (
  <Wrap>
    <div>
      <InlineText.Base fontSize={`${FontSizes.small_12}`}>カテゴリ</InlineText.Base>
    </div>
    <div>
      <InlineText.Base fontSize={`${FontSizes.small}`} bold>
        {props.content}
      </InlineText.Base>
    </div>
  </Wrap>
);
