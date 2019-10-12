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
  prefectures?: string,
  city?: string,
  townArea?: string,
  onClickMore: Function,
  onKeyDownButtonMore: Function,
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
  noTopMargin?: boolean,
  options: React.Element<*>,
  textButtonBottom?: string,
  onClickButtonBottom?: Function,
  onKeyDownButtonBottom?: Function,
};

export default ({
  meta,
  condition,
  maxCount,
  onClickMore,
  onKeyDownButtonMore,
  searchResult,
  noTopMargin,
  options,
  isSearching,
  breadcrumbsList,
  captionAreaAroundList,
  areaAroundList,
  captionAreaPinList,
  areaPinList,
  sortList,
  prefectures,
  city,
  townArea,
  textButtonBottom,
  onClickButtonBottom,
  onKeyDownButtonBottom,
}: PropTypes) => (
  <div>
    {meta}
    {breadcrumbsList && <BreadcrumbsList breadcrumbsList={breadcrumbsList} />}
    <SearchResultHeader
      condition={condition}
      maxCount={maxCount}
      prefectures={prefectures}
      city={city}
      townArea={townArea}
      onClickMore={onClickMore}
      onKeyDownButtonMore={onKeyDownButtonMore}
    />
    {areaAroundList && (
      <AreaAroundList caption={captionAreaAroundList} areaAroundList={areaAroundList} />
    )}
    {areaPinList && <AreaPinList caption={captionAreaPinList} areaPinList={areaPinList} />}
    {sortList && (
      <SortListWrap>
        <SortList list={sortList} landscape color={Colors.brandPrimary} />
      </SortListWrap>
    )}
    <Content noTopMargin={noTopMargin}>{searchResult}</Content>
    {!isSearching && options}
    {textButtonBottom && (
      <ButtonBottom
        text={textButtonBottom}
        onClick={onClickButtonBottom}
        onKeyDownButton={onKeyDownButtonBottom}
      />
    )}
  </div>
);
