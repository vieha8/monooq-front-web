// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';
import ContainerDefault from 'components/LV1/ContainerDefault';
import Hr from 'components/LV1/HorizontalRule';
import MainTitle from 'components/LV1/Texts/StaticMainTitle';
import Text from 'components/LV1/Texts/StaticText';
import { Height as HeaderHeight } from 'components/LV3/Header';

const MainTitleContainer = styled(ContainerDefault)`
  ${props =>
    !props.noMarginTop &&
    `
    margin-top: calc(${HeaderHeight}px + ${Dimens.large2}px);
  `};
  ${props =>
    props.sub &&
    `
      width: 100%;
      padding: 0;
      margin-top: ${Dimens.large2}px;
  `};
  ${media.phone`
    ${props =>
      props.sub &&
      `
        width: 100%;
        padding: 0;
      `};
    ${props =>
      !props.noMarginTop &&
      `
        margin-top: ${Dimens.medium3_40}px;
    `};    
  `};
`;

const MainTitleStyled = styled(MainTitle)`
  ${media.phone`
    ${props =>
      props.fontSizeSp &&
      `
        font-size: ${props.fontSizeSp}px;
      `};
  `};
`;

export type PropTypes = {
  mainTitle: string,
  mainTitleSub?: string,
  text?: string,
  isHr?: boolean,
  noMarginTop?: boolean,
  fontSizeSp?: number,
};

export default ({
  mainTitle,
  mainTitleSub,
  text,
  isHr,
  sub,
  noMarginTop,
  fontSizeSp,
}: PropTypes) => (
  <MainTitleContainer sub={sub} noMarginTop={noMarginTop}>
    <MainTitleStyled fontSizeSp={fontSizeSp}>
      {mainTitle}
      {mainTitleSub && (
        <Fragment>
          <br />
          {mainTitleSub}
        </Fragment>
      )}
    </MainTitleStyled>
    {text && <Text>{text}</Text>}
    {isHr && <Hr />}
  </MainTitleContainer>
);
