import React, { Fragment } from 'react';
import styled from 'styled-components';
import Button from 'components/LV1/Forms/Button';
import InlineText from 'components/LV1/Texts/InlineText';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';

const ButtonWrap = styled.div`
  margin: ${Dimens.medium2}px auto;
  max-width: 240px;
  ${media.phone`
    display: block;
    width: 100%;
    max-width: 100%
    position: relative;
    left: 0px;
    bottom: 0px;
    text-align: center;
    padding: 0 0px 15px;
  `};
`;

const CaptionWrap = styled.div`
  margin: ${Dimens.medium}px auto;
  ${media.phone`
    margin: ${Dimens.medium1}px auto 0;
    ${props =>
      props.sub &&
      `
      margin: ${Dimens.small_10}px auto 0;
    `};
  `};
`;

export default ({ captionHead, caption, buttonText, onClick, onKeyDown }) => (
  <Fragment>
    <CaptionWrap>
      <InlineText.Base fontSize={18} bold>
        {captionHead}
      </InlineText.Base>
    </CaptionWrap>
    <CaptionWrap sub>
      <InlineText.Base>{caption}</InlineText.Base>
    </CaptionWrap>
    <ButtonWrap>
      <Button primary fontbold center fill={1} onClick={onClick} onKeyDown={onKeyDown}>
        {buttonText}
      </Button>
    </ButtonWrap>
  </Fragment>
);
