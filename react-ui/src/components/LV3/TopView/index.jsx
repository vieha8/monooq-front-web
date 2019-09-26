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
  ${media.giant1`
    padding-top: 224px;
  `};
  ${media.tablet`
    padding-top: 158px;
  `};
  ${media.phone`
    padding-top: 98px;
  `};
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
  ${media.giant1`
    &:before {
      top: -130px;
      left: -4px;
    }
    &:after {
      top: -130px;
      right: 0px;
    }
  `};
  ${media.tablet`
    &:before,
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
  placeholder: string,
  locationText: string,
  onChange: Function,
  onKeyDown: Function,
  searchDisabled: boolean,
  onClickSearchButton: Function,
};

export default ({
  catchPhrase,
  catchPhraseSub,
  placeholder,
  locationText,
  onChange,
  onKeyDown,
  searchDisabled,
  onClickSearchButton,
}: PropTypes) => (
  <TopView>
    <TopViewWrap className="wrapTopView">
      <TopViewContainer className="container-topview">
        <CatchPhraseSub>{catchPhraseSub}</CatchPhraseSub>
        <CatchPhrase>{catchPhrase}</CatchPhrase>
        <InputSearchContainer>
          <InputSearch
            placeholder={placeholder}
            locationText={locationText}
            onChange={onChange}
            onKeyDown={onKeyDown}
            searchDisabled={searchDisabled}
            onClickSearchButton={onClickSearchButton}
          />
        </InputSearchContainer>
      </TopViewContainer>
    </TopViewWrap>
  </TopView>
);
