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
  margin: 0 auto ${Dimens.medium2}px;
  ${media.phone`
    margin: 0 auto ${Dimens.medium_20}px;
  `};
`;

const TypeContent = styled.div`
  ${props =>
    props.typeTitle &&
    `
    margin-top: ${Dimens.medium}px;
  `};
`;

export default (props: PropTypes) => (
  <Wrap>
    <TypeContent typeTitle>
      <InlineText.Base fontSize={`${FontSizes.small_12}`}>カテゴリ</InlineText.Base>
    </TypeContent>
    <TypeContent>
      <InlineText.Base fontSize={`${FontSizes.small_15}`} bold>
        {props.content}
      </InlineText.Base>
    </TypeContent>
  </Wrap>
);
