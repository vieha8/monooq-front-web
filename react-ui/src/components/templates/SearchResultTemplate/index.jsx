import React from 'react';
import styled from 'styled-components';
import { Dimens, Colors } from 'variables';
import { media } from 'helpers/style/media-query';
import ButtonBottom from 'components/LV2/Forms/ButtonBottom';
import AreaAroundList from 'components/LV2/Lists/AreaAroundList';
import AreaPinList from 'components/LV2/Lists/AreaPinList';
import BreadcrumbsList from 'components/LV2/Lists/BreadcrumbsList';
import SortList from 'components/LV2/Lists/LinkList';
import SearchResultHeader from 'components/LV3/SearchResultHeader';

const Content = styled.div`
  margin: ${Dimens.medium2}px 0;
  ${media.tablet`
    margin: ${Dimens.medium}px 0;
  `};
  ${props =>
    props.noTopMargin &&
    `
    margin: 0;
  `};
`;

const SortListWrap = styled.div`
  margin: ${Dimens.medium2}px auto;
  text-align: right;
  ${media.tablet`
    margin: ${Dimens.medium}px auto;
  `};
`;

const ButtonBottomWrap = styled.div`
  display: none;
  ${media.tablet`
    display: block;
  `};
`;

export default ({
  meta,
  condition,
  maxCount,
  onClickMore,
  onClickCheckCity,
  onClickCheckTown,
  regionPrefectureList,
  searchResult,
  noTopMargin,
  breadcrumbsList,
  captionAreaAroundList,
  areaAroundList,
  captionAreaPinList,
  areaPinList,
  sortList,
  prefecture,
  textButtonBottom,
  searchConditionCurrentList,
  cityTownAreaList,
  prefectureList,
}) => (
  <div>
    {meta}
    {breadcrumbsList && <BreadcrumbsList breadcrumbsList={breadcrumbsList} />}
    <SearchResultHeader
      condition={condition}
      maxCount={maxCount}
      prefecture={prefecture}
      onClickMore={onClickMore}
      onClickCheckCity={onClickCheckCity}
      onClickCheckTown={onClickCheckTown}
      regionPrefectureList={regionPrefectureList}
      cityTownAreaList={cityTownAreaList}
      textButtonBottom={textButtonBottom}
      searchConditionCurrentList={searchConditionCurrentList}
    />
    {areaAroundList && areaAroundList.length > 0 && (
      <AreaAroundList caption={captionAreaAroundList} areaAroundList={areaAroundList} />
    )}
    {areaPinList && areaPinList.length > 0 && (
      <AreaPinList caption={captionAreaPinList} areaPinList={areaPinList} />
    )}
    {sortList && (
      <SortListWrap>
        <SortList list={sortList} isLinkEvent landscape color={Colors.brandPrimary} />
      </SortListWrap>
    )}
    <Content noTopMargin={noTopMargin}>{searchResult}</Content>
    {textButtonBottom && (
      <ButtonBottomWrap>
        <ButtonBottom
          modal
          text={textButtonBottom}
          cityTownAreaList={cityTownAreaList}
          onClickMore={onClickMore}
          onClickCheckCity={onClickCheckCity}
          onClickCheckTown={onClickCheckTown}
          searchConditionCurrentList={searchConditionCurrentList}
          prefectureList={prefectureList}
        />
      </ButtonBottomWrap>
    )}
  </div>
);
