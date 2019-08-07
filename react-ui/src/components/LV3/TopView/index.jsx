// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, Colors } from 'variables';
import ContainerDefault from 'components/LV1/ContainerDefault';
import CatchPhrase from 'components/LV1/Texts/CatchPhrase';
import SubCatchPhrase from 'components/LV1/Texts/SubCatchPhrase';
import SearchInput from 'components/LV2/Forms/SearchInput';
import { Height as HeaderHeight } from 'components/LV3/Header';

const mainVisual =
  'https://monooq.imgix.net/img%2Fservice%2Fmain_visual%402x.jpg?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format&h=540';
const mainVisualSp =
  'https://monooq.imgix.net/img%2Fservice%2Fmain_visual_sp%402x.jpg?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format&w=400';

const TopView = styled.div`
  height: 540px;
  margin-top: ${HeaderHeight}px;
  background-image: url(${mainVisual});
  background-size: cover;
  color: ${Colors.white};
  background-repeat: no-repeat;
  ${media.phone`
    height: 400px;
    margin-top: -4px;
    background-image: url(${mainVisualSp});
    background-position: 0px ${Dimens.large3}px;
  `};
`;

const TopViewFilter = styled.div`
  height: 100%;
  padding-top: 120px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.4);
`;

const TopViewContainer = styled(ContainerDefault)``;

const SearchInputContainer = styled.div`
  margin-top: ${Dimens.medium_20}px;
  margin-bottom: ${Dimens.medium3_40}px;
`;

type PropTypes = {
  catchPhrase: React.Element<*>,
  subCatchPhrase: React.Element<*>,
  SIplaceholder: string,
  SIlocationText: string,
  SIonChange: Function,
  SIonKeyDown: Function,
  SIsearchDisabled: boolean,
  SIonClickSearchButton: Function,
};

export default ({
  catchPhrase,
  subCatchPhrase,
  SIplaceholder,
  SIlocationText,
  SIonChange,
  SIonKeyDown,
  SIsearchDisabled,
  SIonClickSearchButton,
}: PropTypes) => (
  <TopView>
    <TopViewFilter>
      <TopViewContainer>
        <CatchPhrase>{catchPhrase}</CatchPhrase>
        <SubCatchPhrase>{subCatchPhrase}</SubCatchPhrase>
        <SearchInputContainer>
          <SearchInput
            placeholder={SIplaceholder}
            locationText={SIlocationText}
            onChange={SIonChange}
            onKeyDown={SIonKeyDown}
            searchDisabled={SIsearchDisabled}
            onClickSearchButton={SIonClickSearchButton}
          />
        </SearchInputContainer>
      </TopViewContainer>
    </TopViewFilter>
  </TopView>
);
