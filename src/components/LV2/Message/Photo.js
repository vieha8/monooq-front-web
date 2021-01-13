import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/LV1/Texts/InlineText';
import Image16x9 from 'components/LV1/Images/Image16x9';
import { Dimens } from 'variables';

const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 4px;
  max-width: 400px;
  ${props =>
    props.align === 'right' &&
    `
      margin-right: 0;
      margin-left: auto;
    `};
`;

const DateWrapper = styled.div`
  text-align: right;
  margin-top: ${Dimens.small}px;
`;

export default ({ align, src, alt, self, receivedAt, isRead }) => (
  <div>
    <ImageWrapper align={align}>
      <a href={src} target="_blank" rel="noreferrer noopener">
        <Image16x9 src={src} alt={alt || ''} />
      </a>
    </ImageWrapper>
    {self && (
      <DateWrapper>
        <InlineText.EmphasisTiny>
          {receivedAt}
          <br />
          {isRead ? '既読' : null}
        </InlineText.EmphasisTiny>
      </DateWrapper>
    )}
  </div>
);
