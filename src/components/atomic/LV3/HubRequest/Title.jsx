import React from 'react';
import styled from 'styled-components';

import Logo from 'components/atomic/LV1/Logo';
import InlineText from 'components/atomic/LV1/InlineText';
import DefaultContainer from 'components/atomic/containers/DefaultContainer';
import { Colors, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import mainVisual from 'images/hub_bg_top.png';

const TopContainer = styled.div`
  height: 600px;
  background-image: url(${mainVisual});
  background-size: cover;
  background-repeat: no-repeat;
  color: ${Colors.white};
  text-align: center;
  ${media.phone`
    height: 380px;
    background-position: 60% 0;
  `};
`;

const TopViewFilter = styled.div`
  height: 100%;
  padding-top: 196px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.4);
  ${media.phone`
    padding-top: 108px;
  `};
`;

const TopViewContainer = styled(DefaultContainer)`
  text-align: center;
  margin: auto;
`;

const TextContainer = styled.div`
  font-weight: 900;
  position: relative;
  top: -20px;
`;

const CatchPhrase = styled.div`
  font-size: ${FontSizes.xxlarge}px;
  line-height: ${FontSizes.xxlarge * 1.5}px;
  font-weight: 900;
  margin-bottom: 10px;
  ${media.phone`
    font-size: ${FontSizes.medium1}px;
    line-height: ${FontSizes.medium1 * 1.75}px;
    width: 100%;
    height: auto;
    text-align: center;
  `};
`;

const SubCatchPhrase = styled.span`
  font-weight: 900;
  display: block;
  font-size: ${FontSizes.medium3}px;
  line-height: ${FontSizes.medium3 * 1.5}px;
  ${media.phone`
    font-size: ${FontSizes.medium}px;
    line-height: ${FontSizes.medium * 1.75}px;
    width: 100%;
  `};
`;

export default () => (
  <TopContainer>
    <TopViewFilter>
      <TopViewContainer>
        <Logo.BaseWhite />
        <TextContainer>
          <InlineText.Base fontSize={FontSizes.xxlarge} color={Colors.white}>
            Hub
          </InlineText.Base>
        </TextContainer>
        <CatchPhrase>
          この荷物どうしよう...
          <br />
        </CatchPhrase>
        <SubCatchPhrase>をイチ早く解決します</SubCatchPhrase>
      </TopViewContainer>
    </TopViewFilter>
  </TopContainer>
);
