// @flow

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

type PropTypes = {
  meta: React.Element<*>,
  condition: string,
  maxCount: string,
  prefecture?: string,
  onClickMore: Function,
  regionPrefectureList: Array<{
    region: string,
    prefectureList: Array<{
      name: string,
      id: string,
    }>,
  }>,
  breadcrumbsList?: Array<{
    text: string,
    link: string,
  }>,
  captionAreaAroundList?: string,
  areaAroundList?: Array<{
    text: string,
    link: string,
  }>,
  captionAreaPinList?: string,
  areaPinList?: Array<{
    text: string,
    link: string,
  }>,
  sortList?: Array<{
    text: string,
    path: string,
  }>,
  searchResult: React.Element<*>,
  noTopMargin?: boolean,
  isSearching: boolean,
  textButtonBottom?: string,
  onClickButtonBottom?: Function,
  onKeyDownButtonBottom?: Function,
  searchConditionCurrentList: Array<{
    title: string,
    value?: string,
  }>,
  cityTownAreaList: Array<{
    cityName: string,
    areaAroundList: Array<{
      text: string,
      link: string,
    }>,
    townAreaList: Array<{
      text: string,
      link: string,
    }>,
  }>,
};

export default ({
  meta,
  condition,
  maxCount,
  onClickMore,
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
}: PropTypes) => (
  <div>
    {meta}
    {breadcrumbsList && <BreadcrumbsList breadcrumbsList={breadcrumbsList} />}
    <SearchResultHeader
      condition={condition}
      maxCount={maxCount}
      prefecture={prefecture}
      onClickMore={onClickMore}
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
        <SortList list={sortList} landscape color={Colors.brandPrimary} />
      </SortListWrap>
    )}
    <Content noTopMargin={noTopMargin}>{searchResult}</Content>
    {textButtonBottom && (
      <ButtonBottom
        modal
        text={textButtonBottom}
        searchConditionCurrentList={searchConditionCurrentList}
      />
    )}
  </div>
);
