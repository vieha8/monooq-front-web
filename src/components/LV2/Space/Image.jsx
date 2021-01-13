import React from 'react';
import styled from 'styled-components';
import { Dimens, Colors } from 'variables';
import { media, mediaMin } from 'helpers/style/media-query';
import InlineText from 'components/LV1/Texts/InlineText';
import ImageSlide from 'components/LV1/Images/ImageSlide';

const Wrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;
  margin: auto;

  ${media.tablet`
    width: 80%;
    max-width: 500px;
  `};
  ${media.phone`
    width: 100%;
  `};

  ${mediaMin.phone`
    &::before,
    &::after {
      content: '';
      position: absolute;
      z-index: 1;
      width: calc((100vw - 100%) / 2);
      height: 100%;
      top: 0;
      background-color: ${Colors.white};
      opacity: 0.3;
    }
    &::before {
      left: calc(-1 * (100vw - 100%) / 2);
    }
    &::after {
      right: calc(-1 * (100vw - 100%) / 2);
    }
  `}
`;

const Desc = styled.div`
  margin-top: ${Dimens.medium}px;
  white-space: pre-wrap;
`;

export default ({ images, description }) => (
  <Wrap>
    <ImageSlide images={images} />
    {description && (
      <Desc>
        <InlineText.Base>{description}</InlineText.Base>
      </Desc>
    )}
  </Wrap>
);
