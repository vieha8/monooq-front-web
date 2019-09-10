// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import Button from 'components/LV1/Forms/Button';
import InputForm from 'components/LV2/Forms/InputForm';
import Select from 'components/LV2/Forms/Select';
import ErrorList from 'components/LV2/Lists/ErrorList';
import { Dimens, Colors, FormValues } from 'variables';
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
  onKeyDownButtonSearch: Function,
};

export default ({
  errors,
  keyword,
  onChangeKeyword,
  prefCode,
  onChangePrefCode,
  type,
  onChangeType,
  checkedFurniture,
  onClickFurniture,
  onKeyDownFurniture,
  receive,
  onChangeReceive,
  buttonDisabled,
  onClickSearch,
  onKeyDownButtonSearch,
}: PropTypes) => (
  <Fragment>
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
      <Section>
        <Select
          label="スペースの広さで絞り込み"
          options={[
            {
              value: `${FormValues.typeSpaceNoSelect}`,
              text: '指定なし',
            },
            {
              value: `${FormValues.typeSpaceCloset}`,
              text: 'クローゼット・押入れ',
            },
            {
              value: `${FormValues.typeSpaceRoom}`,
              text: '部屋',
            },
            {
              value: `${FormValues.typeSpaceWarehouse}`,
              text: '屋外倉庫',
            },
            {
              value: `${FormValues.typeSpaceOther}`,
              text: 'その他',
            },
          ]}
          value={type}
          onChange={e => onChangeType(e.target.value)}
        />
        <ErrorList keyName="type_errors" errors={errors.type} />
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
        <ErrorList keyName="furniture_errors" errors={errors.furniture} />
      </Section>
      <Section>
        <Select
          label="受け取り方法で絞り込み"
          options={[
            {
              value: `${FormValues.typeReceiptNoSelect}`,
              text: '指定なし',
            },
            {
              value: `${FormValues.typeReceiptAll}`,
              text: '対面・配送の両方に対応する',
            },
            {
              value: `${FormValues.typeReceiptOnlyFTF}`,
              text: '対面のみ',
            },
            {
              value: `${FormValues.typeReceiptOnlyDelivery}`,
              text: '配送のみ',
            },
          ]}
          value={receive}
          onChange={e => onChangeReceive(e.target.value)}
        />
        <ErrorList keyName="receive_errors" errors={errors.receiptType} />
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
