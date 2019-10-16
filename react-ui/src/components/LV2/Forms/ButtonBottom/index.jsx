// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens, Colors } from 'variables';
import { media } from 'helpers/style/media-query';
import Button from 'components/LV1/Forms/Button';
import SearchConditionMoreSP from 'components/LV3/SearchConditionMoreSP';

// TODO: 以下はサンプルデータなので、APIとのつなぎ込み時に削除しちゃってください。
const AreaAroundList = () => [
  {
    text: '武蔵村山市',
    link: '/musashimurayama',
  },
  {
    text: '渋谷区',
    link: '/shibuya',
  },
  {
    text: '北区',
    link: '/kita',
  },
  {
    text: '武蔵村山市',
    link: '/musashimurayama',
  },
  {
    text: '渋谷区',
    link: '/shibuya',
  },
  {
    text: '北区',
    link: '/kita',
  },
  {
    text: '武蔵村山市',
    link: '/musashimurayama',
  },
  {
    text: '渋谷区',
    link: '/shibuya',
  },
  {
    text: '北区',
    link: '/kita',
  },
  {
    text: '武蔵村山市',
    link: '/musashimurayama',
  },
  {
    text: '渋谷区',
    link: '/shibuya',
  },
  {
    text: '北区',
    link: '/kita',
  },
  {
    text: '武蔵村山市',
    link: '/musashimurayama',
  },
  {
    text: '渋谷区',
    link: '/shibuya',
  },
  {
    text: '北区',
    link: '/kita',
  },
];

const TownAreaList1 = () => [
  {
    text: '代々木神園町',
    link: '/1111',
  },
  {
    text: '宇田川町',
    link: '/2222',
  },
  {
    text: '上原',
    link: '/333',
  },
  {
    text: '東',
    link: '/333',
  },
  {
    text: '代々木神園町',
    link: '/1111',
  },
  {
    text: '宇田川町',
    link: '/2222',
  },
  {
    text: '上原',
    link: '/333',
  },
  {
    text: '東',
    link: '/333',
  },
  {
    text: '代々木神園町',
    link: '/1111',
  },
  {
    text: '宇田川町',
    link: '/2222',
  },
  {
    text: '上原',
    link: '/333',
  },
  {
    text: '東',
    link: '/333',
  },
  {
    text: '代々木神園町',
    link: '/1111',
  },
  {
    text: '宇田川町',
    link: '/2222',
  },
  {
    text: '上原',
    link: '/333',
  },
  {
    text: '東',
    link: '/333',
  },
];

const SearchConditionSPList = () => [
  {
    title: '東北・北海道',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
  {
    title: '北陸・甲信越',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
  {
    title: '関東',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
  {
    title: '東海',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
  {
    title: '関西',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
  {
    title: '四国',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
  {
    title: '九州・沖縄',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
];

const SendMessageWrap = styled.div`
  display: none;
  width: 100%;
  position: fixed;
  left: 0px;
  bottom: 0px;
  z-index: 2000;
  text-align: center;
  padding: ${Dimens.medium}px;
  background-color: rgba(255, 255, 255, 0.8);
  border-top: 1px solid ${Colors.borderGray};
  ${media.tablet`
    display: block;
  `};
`;

const ButtonWrap = styled.div`
  display: inline-block;
  min-width: 300px;
  ${media.phone`
    display: block;
    min-width: auto;
  `};
`;

type PropTypes = {
  text: string,
  modal?: boolean,
  searchConditionCurrentList: Array<{
    title: string,
    value?: string,
  }>,
  onClick?: Function,
};

export default ({ text, modal, searchConditionCurrentList, onClick }: PropTypes) => (
  <SendMessageWrap>
    <ButtonWrap>
      {modal ? (
        <SearchConditionMoreSP
          btnText={text}
          searchConditionCurrentList={searchConditionCurrentList}
          searchConditionSPList={SearchConditionSPList()}
          cityTownAreaList={[
            {
              cityName: '目黒区',
              areaAroundList: AreaAroundList(),
              townAreaList: TownAreaList1(),
            },
            {
              cityName: '港区',
              areaAroundList: AreaAroundList(),
              townAreaList: TownAreaList1(),
            },
          ]}
        />
      ) : (
        <Button center primary fontbold fill={1} onClick={onClick}>
          {text}
        </Button>
      )}
    </ButtonWrap>
  </SendMessageWrap>
);
