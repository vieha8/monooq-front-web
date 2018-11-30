// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
import Button from 'components/atomic/LV1/Button';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';

const ButtonWrap = styled.div`
  margin-top: ${Dimens.medium2}px;
  ${media.phone`
    display: block;
    width: 100%;
    position: absolute;
    left: 0px;
    bottom: 0px;
    text-align: center;
    margin-top: auto;
    padding: 0 15px 15px;
  `};
`;

const CaptionWrap = styled.div`
  margin: ${Dimens.medium}px auto;
`;

export default (props: PropTypes) => (
  <Fragment>
    <CaptionWrap>
      <InlineText.Base fontSize={18} bold>
        {props.captionHead}
      </InlineText.Base>
    </CaptionWrap>
    <CaptionWrap>
      <InlineText.Base>{props.caption}</InlineText.Base>
    </CaptionWrap>
    <ButtonWrap>
      <Button primary fontbold center onClick={props.onClick}>
        {props.buttonText}
      </Button>
    </ButtonWrap>
  </Fragment>
);
