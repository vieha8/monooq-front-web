// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';
import DefaultContainer from 'components/LV1/DefaultContainer';
import { Height as HeaderHeight } from 'components/LV3/Header';
import Hr from 'components/LV1/HorizontalRule';
import MainTitle from 'components/LV1/StaticMainTitle';
import Text from 'components/LV1/StaticText';

const MainTitleContainer = styled(DefaultContainer)`
  margin-top: calc(${HeaderHeight}px + ${Dimens.large2}px);
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
    margin-top: ${Dimens.medium3_40}px;
  `};
`;

export type PropTypes = {
  mainTitle: string,
  mainTitleSub?: string,
  text?: string,
  isHr?: boolean,
};

export default ({ mainTitle, mainTitleSub, text, isHr, sub }: PropTypes) => (
  <MainTitleContainer sub={sub}>
    <MainTitle>
      {mainTitle}
      {mainTitleSub && (
        <Fragment>
          <br />
          {mainTitleSub}
        </Fragment>
      )}
    </MainTitle>
    {text && <Text>{text}</Text>}
    {isHr && <Hr />}
  </MainTitleContainer>
);
