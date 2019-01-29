// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes, Colors } from 'variables';
import DefaultContainer from 'components/atomic/LV1/DefaultContainer';

const MovieContainer = styled(DefaultContainer)`
  padding-top: ${Dimens.large2_70}px;
  padding-bottom: ${Dimens.large2_70}px;
  display: flex;
  ${media.phone`
    flex-direction: column;
    padding-top: ${Dimens.medium2}px;
    padding-bottom: ${Dimens.medium2}px;
  `};
`;

const MovieFrameWrapper = styled.div`
  ${media.phone`
    position: relative;
    width: 100%;
    padding-top: 56.25%;
  `};
`;

const MovieFrame = styled.iframe`
  height: 281px;
  width: 500px;
  border-radius: 4px;
  ${media.phone`
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
  `};
`;

const MovieExplanContainer = styled.div`
  margin-left: ${Dimens.medium3_40}px;
  color: ${Colors.white};
  ${media.phone`
    margin-left: 0;
    & br {
      display: none;
    }
  `};
`;

const MovieExplanTitle = styled.div`
  margin: ${Dimens.medium2}px 0;
  font-size: ${FontSizes.medium2}px;
  line-height: ${FontSizes.medium2 * 1.5}px;
  font-weight: bold;
`;

const MovieExplanText = styled.div`
  font-size: ${FontSizes.medium}px;
  line-height: ${FontSizes.medium * 2}px;
`;

type PropTypes = {
  srcMovie: string,
  frameBorder: string,
  allow: string,
  allowFullScreen: booelan,
  ExplanTitle: React.Element<*>,
  ExplanText: React.Element<*>,
};

export default ({
  srcMovie,
  frameBorder,
  allow,
  allowFullScreen,
  ExplanTitle,
  ExplanText,
}: PropTypes) => (
  <MovieContainer>
    <MovieFrameWrapper>
      <MovieFrame
        src={srcMovie}
        frameBorder={frameBorder}
        allow={allow}
        allowFullScreen={allowFullScreen}
      />
    </MovieFrameWrapper>
    <MovieExplanContainer>
      <MovieExplanTitle>{ExplanTitle}</MovieExplanTitle>
      <MovieExplanText>{ExplanText}</MovieExplanText>
    </MovieExplanContainer>
  </MovieContainer>
);
