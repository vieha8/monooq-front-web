// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';
import DefaultContainer from 'components/atomic/containers/DefaultContainer';
import { Height as HeaderHeight } from 'components/atomic/LV3/Header';
import Hr from 'components/atomic/LV1/HorizontalRule';
import MainTitle from 'components/atomic/LV1/StaticMainTitle';
import Text from 'components/atomic/LV1/StaticText';

const MainTitleContainer = styled(DefaultContainer)`
  margin-top: calc(${HeaderHeight}px + ${Dimens.large2}px);
  ${props =>
    props.sub &&
    `
      padding: 0;
      margin-top: ${Dimens.large2}px;
    `};
  ${media.phone`
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
