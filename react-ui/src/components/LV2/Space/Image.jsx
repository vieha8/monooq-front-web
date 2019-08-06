// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/LV1/Texts/InlineText';
import ImageSlide from 'components/LV1/Images/ImageSlide';
import { Dimens } from 'variables';

const ImageWrapper = styled.div``;

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
  <ImageWrapper>
    <ImageSlide images={images} />
    <Desc>
      <InlineText.Base>{description}</InlineText.Base>
    </Desc>
  </ImageWrapper>
);
