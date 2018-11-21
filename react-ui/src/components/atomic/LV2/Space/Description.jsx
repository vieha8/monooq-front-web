// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
import { Colors, Dimens } from 'variables';

type PropTypes = {
  content: string,
};

const Wrap = styled.div`
  margin: ${Dimens.medium2}px auto 0;
  padding: ${Dimens.medium2}px 0;
  border-top: 1px solid ${Colors.borderGray};
`;

export default (props: PropTypes) => (
  <Wrap>
    <InlineText.Base>{props.content}</InlineText.Base>
  </Wrap>
);
