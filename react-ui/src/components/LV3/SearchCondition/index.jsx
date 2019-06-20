// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { H3 } from 'components/LV1/Headline';
import Button from 'components/LV1/Button';
import InlineText from 'components/LV1/InlineText';
import InputField from 'components/LV1/InputField';
import InputForm from 'components/LV2/InputForm';
import SelectForm from 'components/LV2/SelectForm';
import { Dimens, Colors } from 'variables';
import { selectOptionPrefectures } from 'helpers/prefectures';

export const ContentsWrap = styled.div`
  max-width: 540px;
  ${media.tablet`
    max-width: 100%;
    padding: 0 0 70px;
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

const PriceWrap = styled.div`
  float: left;
`;

const PriceItem = styled.div`
  display: inline-block;
  padding: 0;
  max-width: 142px;
  margin-top: 7px;
  ${props =>
    props.caption &&
    `
    padding: 0 12px;
  `};
  ${media.phone`
    max-width: 92px;
    ${props =>
      props.caption &&
      `
      padding: 0 5px;
    `};
    ${props =>
      props.captionUpper &&
      `
      padding: 0 0 0 5px;
    `};
  `};
`;

const SearchButtonWrap = styled.div`
  width: 100%;
  max-width: 540px;
  margin-top: ${Dimens.medium2}px;
  ${media.tablet`
    max-width: 100%;
    margin-top: auto;
    display: block;
    position: fixed;
    left: 0px;
    bottom: 0px;
    z-index: 100;
    text-align: center;
    padding: ${Dimens.medium}px;
    background-color: ${Colors.white};
    border-top: 1px solid ${Colors.borderGray};
  `};
`;

const ButtonWrap = styled.div`
  max-width: 240px;
  margin: auto;
  ${media.phone`
    max-width: 100%;
  `};
`;

type PropTypes = {
  errors: Array<Array<string>>,
  keyword: string,
  onChangeKeyword: Function,
  prefCode: number,
  onChangePrefCode: Function,
  priceMin: string,
  onChangePriceMin: Function,
  priceMax: string,
  onChangePriceMax: Function,
  type: number,
  onChangeType: Function,
  checkedFurniture: boolean,
  onClickFurniture: Function,
  onKeyDownFurniture: Function,
  receive: number,
  onChangeReceive: Function,
  buttonDisabled: boolean,
  onClickSearch: Function,
  onKeyDownButtonSerch: Function,
};

function displayErrors(key: string, errors: Array<string>) {
  return (
    Array.isArray(errors) &&
    errors.map((e, i) => (
      <div key={`${key}_${i}`.toString()}>
        <InlineText.Small color={Colors.error}>{e}</InlineText.Small>
      </div>
    ))
  );
}

export default ({
  errors,
  keyword,
  onChangeKeyword,
  prefCode,
  onChangePrefCode,
  priceMin,
  onChangePriceMin,
  priceMax,
  onChangePriceMax,
  type,
  onChangeType,
  checkedFurniture,
  onClickFurniture,
  onKeyDownFurniture,
  receive,
  onChangeReceive,
  buttonDisabled,
  onClickSearch,
  onKeyDownButtonSerch,
}: PropTypes) => (
  <Fragment>
    <ContentsWrap>
      <Section top>
        <InputForm
          placeholder="地名やキーワードで絞り込み"
          value={keyword}
          onChange={e => onChangeKeyword(e.target.value)}
        />
        {displayErrors('keyword_errors', errors.keyword)}
      </Section>
      <Section>
        <SelectForm
          label="地域で絞り込み"
          options={selectOptionPrefectures('指定なし')}
          value={prefCode}
          onChange={e => onChangePrefCode(e.target.value)}
        />
        {displayErrors('prefcode_errors', errors.prefCode)}
      </Section>
      <Section>
        <H3 bold>料金で絞り込み</H3>
        <PriceWrap>
          <PriceItem>
            <InputField
              placeholder="最安"
              value={priceMin}
              onChange={e => onChangePriceMin(e.target.value)}
            />
          </PriceItem>
          <PriceItem caption>
            <InlineText.Base>円から</InlineText.Base>
          </PriceItem>
        </PriceWrap>
        <PriceWrap>
          <PriceItem>
            <InputField
              placeholder="最高"
              value={priceMax}
              onChange={e => onChangePriceMax(e.target.value)}
            />
          </PriceItem>
          <PriceItem caption captionUpper>
            <InlineText.Base>円まで</InlineText.Base>
          </PriceItem>
        </PriceWrap>
        {displayErrors('price_errors', errors.priceMin)}
        {displayErrors('price_errors', errors.priceMax)}
      </Section>
      <Section>
        <SelectForm
          label="スペースの広さで絞り込み"
          options={[
            {
              value: 0,
              text: '指定なし',
            },
            {
              value: 1,
              text: 'クローゼット・押入れ',
            },
            {
              value: 3,
              text: '部屋',
            },
            {
              value: 4,
              text: '屋外倉庫',
            },
            {
              value: 5,
              text: 'その他',
            },
          ]}
          value={type}
          onChange={e => onChangeType(e.target.value)}
        />
        {displayErrors('type_errors', errors.type)}
      </Section>
      <Section visible>
        <InputForm
          checkbox
          label="預けられる荷物で絞り込み"
          checktext="家具や家電製品に対応する"
          checked={checkedFurniture}
          onClick={onClickFurniture}
          onKeyDown={onKeyDownFurniture}
        />
        {displayErrors('furniture_errors', errors.furniture)}
      </Section>
      <Section>
        <SelectForm
          label="受け取り方法で絞り込み"
          options={[
            {
              value: 0,
              text: '指定なし',
            },
            {
              value: 1,
              text: '対面・配送の両方に対応する',
            },
            {
              value: 2,
              text: '対面のみ',
            },
            {
              value: 3,
              text: '配送のみ',
            },
          ]}
          value={receive}
          onChange={e => onChangeReceive(e.target.value)}
        />
        {displayErrors('receive_errors', errors.receiptType)}
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
          onKeyDown={onKeyDownButtonSerch}
        >
          検索する
        </Button>
      </ButtonWrap>
    </SearchButtonWrap>
  </Fragment>
);
