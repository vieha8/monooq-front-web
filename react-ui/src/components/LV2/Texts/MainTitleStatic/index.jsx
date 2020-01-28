import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';
import Hr from 'components/LV1/HorizontalRule';
import MainTitle from 'components/LV1/Texts/MainTitleStatic';
import Text from 'components/LV1/Texts/TextStatic';
import { Height as HeaderHeight } from 'components/LV3/Header/view';

const MainTitleWrap = styled.div`
  ${props =>
    !props.noMarginTop &&
    `
    margin-top: calc(${HeaderHeight}px + ${Dimens.medium3_40}px);
  `};
  ${props =>
    props.sub &&
    `
      width: 100%;
      padding: 0;
      margin-top: ${Dimens.large2}px;
  `};
  ${media.tablet`
    ${props =>
      !props.noMarginTop &&
      `
        margin-top: ${HeaderHeight}px;
    `};
  `};
  ${media.phone`
    ${props =>
      props.sub &&
      `
        width: 100%;
        padding: 0;
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

export default ({ mainTitle, mainTitleSub, text, isHr, sub, noMarginTop, fontSizeSp }) => (
  <MainTitleWrap sub={sub} noMarginTop={noMarginTop}>
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
  </MainTitleWrap>
);
