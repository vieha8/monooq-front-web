// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
import SlideImage from 'components/atomic/LV1/SlideImage';
import { Dimens } from 'variables';

const Desc = styled.div`
  margin-top: ${Dimens.medium}px;
  white-space: pre-wrap;
`;

type PropTypes = {
  images: Array<{
    original: string,
    thumbnail: string,
  }>,
  description: string,
};

export default ({ images, description }: PropTypes) => (
  <div>
    <SlideImage images={images} />
    <Desc>
      <InlineText.Base>{description}</InlineText.Base>
    </Desc>
  </div>
);
