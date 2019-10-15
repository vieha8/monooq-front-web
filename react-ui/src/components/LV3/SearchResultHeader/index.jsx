// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes, Colors } from 'variables';
import { formatAddComma } from 'helpers/string';
import Button from 'components/LV1/Forms/Button';
import { H1 } from 'components/LV1/Texts/Headline';
import InlineText from 'components/LV1/Texts/InlineText';
import SearchConditionCurrentList from 'components/LV2/Lists/SearchConditionCurrentList';

const HeaderWrap = styled.div`
  margin: ${Dimens.medium_20}px ${Dimens.xxsmall_4}px;
  padding: ${Dimens.medium2}px ${Dimens.medium_20}px ${Dimens.medium1}px;
  box-shadow: 0 0 ${Dimens.xsmall}px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  ${media.tablet`
    margin: ${Dimens.small2}px auto;
    padding: 0;
    box-shadow: unset;
  `};
`;

const ResultCount = styled.span`
  font-size: ${FontSizes.large}px;
  color: ${Colors.brandPrimary};
  margin-left: ${Dimens.small_10}px;
  margin-right: ${Dimens.xxsmall_5}px;
`;

const ResultCountWrap = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

const SearchConditionWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${Dimens.medium_22}px 0 ${Dimens.medium_22}px ${Dimens.medium_22}px;
  border-left: 1px solid ${Colors.borderGray};
  margin-left: ${Dimens.small_10}px;
  ${media.tablet`
    display: none;
  `};
`;

const SearchConditionLeft = styled.div`
  font-size: ${FontSizes.small}px;
  font-weight: bold;
`;

const SearchConditionRight = styled.div`
  margin: auto;
`;

const MoreButtonWrap = styled.div`
  width: 140px;
  margin: auto;
  font-size: ${FontSizes.small}px;
  font-weight: bold;
  ${media.tablet`
    max-width: 120px;
    margin: auto;
  `};
`;

type PropTypes = {
  condition: string,
  maxCount: string,
  onClickMore?: Function,
  onKeyDownButtonMore?: Function,
  prefecture?: string,
  city?: string,
  townArea?: string,
};

export default ({
  condition,
  maxCount,
  onClickMore,
  onKeyDownButtonMore,
  prefecture,
  city,
  townArea,
}: PropTypes) => (
  <HeaderWrap>
    <ResultCountWrap>
      <H1 bold>
        {`「${condition}」の検索結果`}
        <br />
        <ResultCount>{formatAddComma(maxCount)}</ResultCount>
        <InlineText.Base fontSize={FontSizes.small} nobold>
          件
        </InlineText.Base>
      </H1>
    </ResultCountWrap>
    <SearchConditionWrap>
      <SearchConditionLeft>
        <SearchConditionCurrentList
          searchConditionCurrentList={[
            {
              title: '都道府県',
              value: prefecture,
            },
            {
              title: '市区町村',
              value: city,
            },
            {
              title: '町域・エリア',
              value: townArea,
            },
          ]}
          width={364}
        />
      </SearchConditionLeft>
      <SearchConditionRight>
        <MoreButtonWrap>
          <Button
            primary
            height={42}
            heightTab={42}
            padding="10px 10px"
            paddingTab="10px 10px"
            onClick={onClickMore}
            onKeyDown={onKeyDownButtonMore}
          >
            地域を絞り込む
          </Button>
        </MoreButtonWrap>
      </SearchConditionRight>
    </SearchConditionWrap>
  </HeaderWrap>
);
