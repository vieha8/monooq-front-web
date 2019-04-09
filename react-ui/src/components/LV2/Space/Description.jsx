// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import InlineText from 'components/LV1/InlineText';
import { Colors, Dimens } from 'variables';

type PropTypes = {
  content: string,
};

const Wrap = styled.div`
  margin: ${Dimens.medium2}px auto 0;
  padding: ${Dimens.medium2}px 0;
  border-top: 1px solid ${Colors.borderGray};
  ${media.phone`
    margin: ${Dimens.medium_20}px auto 0;
    padding: ${Dimens.medium_20}px 0;
  `};
`;

export default (props: PropTypes) => (
  <Wrap>
    <InlineText.Base>{props.content}</InlineText.Base>
  </Wrap>
);
