import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { selectOptionPrefectures } from 'helpers/prefectures';
import { media } from 'helpers/style/media-query';
import { H1 } from 'components/LV1/Texts/Headline';
import Button from 'components/LV1/Forms/Button';
import InputForm from 'components/LV2/Forms/InputForm';
import Select from 'components/LV2/Forms/Select';
import ErrorList from 'components/LV2/Lists/ErrorList';

export const ContentsWrap = styled.div`
  ${media.tablet`
    max-width: 100%;
  `};
`;

export const Section = styled.div`
  margin-top: ${Dimens.medium2}px;
  white-space: nowrap;
  overflow: ${props => (props.visible ? 'visible' : 'hidden')};
  ${props =>
    props.top &&
    `
    margin-top: ${Dimens.medium_20}px;
  `};
  ${media.phone`
    white-space: unset;
    ${props =>
      props.top &&
      `
      margin-top: ${Dimens.small_10}px;
    `};
  `};
`;

const SearchButtonWrap = styled.div`
  width: 100%;
  margin-top: ${Dimens.medium2}px;
`;

const ButtonWrap = styled.div`
  max-width: 240px;
  margin: auto;
  ${media.phone`
    max-width: 100%;
  `};
`;

const SearchCondition = ({
  errors,
  keyword,
  onChangeKeyword,
  prefCode,
  onChangePrefCode,
  buttonDisabled,
  onClickSearch,
  onKeyDownButtonSearch,
}) => (
  <Fragment>
    <H1 bold>スペース検索</H1>
    <ContentsWrap>
      <Section top>
        <InputForm
          placeholder="地名やキーワードで絞り込み"
          value={keyword}
          onChange={e => onChangeKeyword(e.target.value)}
        />
        <ErrorList keyName="keyword_errors" errors={errors.keyword} />
      </Section>
      <Section>
        <Select
          label="地域で絞り込み"
          options={selectOptionPrefectures('指定なし')}
          value={prefCode}
          onChange={e => onChangePrefCode(e.target.value)}
        />
        <ErrorList keyName="prefcode_errors" errors={errors.prefCode} />
      </Section>
    </ContentsWrap>
    <SearchButtonWrap>
      <ButtonWrap>
        <Button
          primary
          fontbold
          fill={1}
          disabled={buttonDisabled}
          onClick={onClickSearch}
          onKeyDown={onKeyDownButtonSearch}
        >
          検索する
        </Button>
      </ButtonWrap>
    </SearchButtonWrap>
  </Fragment>
);

export default SearchCondition;
