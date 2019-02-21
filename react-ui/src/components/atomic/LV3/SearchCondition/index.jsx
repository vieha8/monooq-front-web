// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { H3 } from 'components/atomic/LV1/Headline';
import Button from 'components/atomic/LV1/Button';
import InlineText from 'components/atomic/LV1/InlineText';
import InputField from 'components/atomic/LV1/InputField';
import InputForm from 'components/atomic/LV2/InputForm';
import SelectForm from 'components/atomic/LV2/SelectForm';
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
  overflow: hidden;
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
  keyword: string,
  keywordErrors: Array<string>,
  onChangeKeyword: Function,
  prefCode: number,
  prefCodeErrors: Array<string>,
  onChangePrefCode: Function,
  priceMin: string,
  priceMax: string,
  priceMinErrors: Array<string>,
  priceMaxErrors: Array<string>,
  onChangePriceMin: Function,
  onChangePriceMax: Function,
  type: number,
  typeErrors: Array<string>,
  onChangeType: Function,
  checkedFurniture: boolean,
  onClickFurniture: Function,
  receive: number,
  receiveErrors: Array<string>,
  onChangeReceive: Function,
  onClickSearch: Function,
  buttonDisabled: boolean,
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

export default (props: PropTypes) => (
  <Fragment>
    <ContentsWrap>
      <Section top>
        <InputForm
          placeholder="地名やキーワードで絞り込み"
          value={props.keyword}
          onChange={e => props.onChangeKeyword(e.target.value)}
        />
        {displayErrors('keyword_errors', props.keywordErrors)}
      </Section>
      <Section>
        <SelectForm
          label="地域で絞り込み"
          options={selectOptionPrefectures('指定なし')}
          value={props.prefCode}
          onChange={e => props.onChangePrefCode(e.target.value)}
        />
        {displayErrors('prefcode_errors', props.prefCodeErrors)}
      </Section>
      <Section>
        <H3 bold>料金で絞り込み</H3>
        <PriceWrap>
          <PriceItem>
            <InputField
              placeholder="最安"
              value={props.priceMin}
              onChange={e => props.onChangePriceMin(e.target.value)}
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
              value={props.priceMax}
              onChange={e => props.onChangePriceMax(e.target.value)}
            />
          </PriceItem>
          <PriceItem caption captionUpper>
            <InlineText.Base>円まで</InlineText.Base>
          </PriceItem>
        </PriceWrap>
        {displayErrors('price_errors', props.priceMinErrors)}
        {displayErrors('price_errors', props.priceMaxErrors)}
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
          value={props.type}
          onChange={e => props.onChangeType(e.target.value)}
        />
        {displayErrors('type_errors', props.typeErrors)}
      </Section>
      <Section>
        <InputForm
          checkbox
          label="預けられる荷物で絞り込み"
          checktext="家具や家電製品に対応する"
          checked={props.checkedFurniture}
          onClick={props.onClickFurniture}
        />
        {displayErrors('furniture_errors', props.furnitureErrors)}
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
          value={props.receive}
          onChange={e => props.onChangeReceive(e.target.value)}
        />
        {displayErrors('receive_errors', props.receiveErrors)}
      </Section>
    </ContentsWrap>
    <SearchButtonWrap>
      <ButtonWrap>
        <Button
          primary
          fontbold
          fill={1}
          disabled={props.buttonDisabled}
          onClick={props.onClickSearch}
        >
          検索する
        </Button>
      </ButtonWrap>
    </SearchButtonWrap>
  </Fragment>
);
