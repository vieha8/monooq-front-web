// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
import Image16x9 from 'components/atomic/LV1/Image16x9';

const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 6px;
  max-width: 400px;
  img {
    position: absolute;
    top: -100%;
    bottom: -100%;
    margin: auto;
    object-fit: cover;
  }
  ${props =>
    props.align === 'right' &&
    `
      margin-right: 0;
      margin-left: auto;
    `};
`;

const DateWrapper = styled.div`
  text-align: right;
  margin-top: 8px;
`;

type PropTypes = {
  align: string,
  src: string,
  alt?: string,
  receivedAt: string,
};

export default (props: PropTypes) => (
  <div>
    <ImageWrapper align={props.align}>
      <Image16x9 src={props.src} alt={props.alt || ''} />
    </ImageWrapper>
    <DateWrapper>
      <InlineText.EmphasisTiny>
        {props.receivedAt}
        <br />
        {props.isRead ? '既読' : null}
      </InlineText.EmphasisTiny>
    </DateWrapper>
  </div>
);
