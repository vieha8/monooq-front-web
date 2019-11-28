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

export default ({ images, description }) => (
  <ImageWrapper>
    <ImageSlide images={images} />
    {description && (
      <Desc>
        <InlineText.Base>{description}</InlineText.Base>
      </Desc>
    )}
  </ImageWrapper>
);
