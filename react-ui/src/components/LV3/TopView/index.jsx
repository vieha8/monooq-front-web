// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, Colors } from 'variables';
import ContainerDefault from 'components/LV1/ContainerDefault';
import CatchPhrase from 'components/LV1/Texts/CatchPhrase';
import CatchPhraseSub from 'components/LV1/Texts/CatchPhraseSub';
import InputSearch from 'components/LV2/Forms/InputSearch';

// TODO: imgix化
import mainVisual from 'images/img-hero.png';
import mainVisualSp from 'images/img-hero-sp.png';

import calloutLeft from 'images/callout-left.png';
import calloutRight from 'images/callout-right.png';

const TopView = styled.div`
  height: 512px;
  background-image: url(${mainVisual});
  background-size: cover;
  color: ${Colors.white};
  background-repeat: no-repeat;
  background-position: top center;
  ${media.phone`
    height: 328px;
    background-image: url(${mainVisualSp});
    background-position: top center;
  `};
`;

const TopViewWrap = styled.div`
  min-width: 320px;
  height: 100%;
  padding-top: 209px;
  box-sizing: border-box;
`;

const TopViewContainer = styled(ContainerDefault)`
  min-width: 320px;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    width: 330px;
    height: 160px;
    top: -114px;
    left: -58px;
    background-image: url(${calloutLeft});
    background-repeat: no-repeat;
    background-size: cover;
  }
  &:after {
    content: '';
    position: absolute;
    width: 416px;
    height: 166px;
    top: -104px;
    right: -40px;
    background-image: url(${calloutRight});
    background-repeat: no-repeat;
    background-size: cover;
  }
  ${media.tablet`
    &:before {
      display: none;
    }
    &:after {
      display: none;
    }
  `};
`;

const InputSearchContainer = styled.div`
  margin-top: ${Dimens.medium_20}px;
  margin-bottom: ${Dimens.medium3_40}px;
`;

type PropTypes = {
  catchPhrase: React.Element<*>,
  catchPhraseSub: React.Element<*>,
  SIplaceholder: string,
  SIlocationText: string,
  SIonChange: Function,
  SIonKeyDown: Function,
  SIsearchDisabled: boolean,
  SIonClickSearchButton: Function,
};

export default ({
  catchPhrase,
  catchPhraseSub,
  SIplaceholder,
  SIlocationText,
  SIonChange,
  SIonKeyDown,
  SIsearchDisabled,
  SIonClickSearchButton,
}: PropTypes) => (
  <TopView>
    <TopViewWrap className="wrapTopView">
      <TopViewContainer className="container-topview">
        <CatchPhraseSub>{catchPhraseSub}</CatchPhraseSub>
        <CatchPhrase>{catchPhrase}</CatchPhrase>
        <InputSearchContainer>
          <InputSearch
            placeholder={SIplaceholder}
            locationText={SIlocationText}
            onChange={SIonChange}
            onKeyDown={SIonKeyDown}
            searchDisabled={SIsearchDisabled}
            onClickSearchButton={SIonClickSearchButton}
          />
        </InputSearchContainer>
      </TopViewContainer>
    </TopViewWrap>
  </TopView>
);
