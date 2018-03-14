// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/atoms/InlineText';
import Image16x9 from 'components/atoms/Image16x9';

const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 6px;
  img {
    position: absolute;
    top: -100%;
    bottom: -100%;
    margin: auto;
  }
`;

const DateWrapper = styled.div`
  text-align: right;
  margin-top: 8px;
`;

type PropTypes = {
  src: string,
  alt: string,
  receivedAt: string,
}

export default (props: PropTypes) => (
  <div>
    <ImageWrapper>
      <Image16x9
        src={props.src}
        alt={props.alt}
      />
    </ImageWrapper>
    <DateWrapper>
      <InlineText.Emphasis>{props.receivedAt}</InlineText.Emphasis>
    </DateWrapper>
  </div>
);
