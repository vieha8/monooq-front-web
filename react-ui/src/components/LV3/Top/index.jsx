// @flow

import React, { Fragment } from 'react';
import Header from 'components/containers/Header';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import TopView from 'components/LV3/TopView';
import PrefectureList from 'components/LV3/PrefectureList';
import SpaceList from 'components/LV3/SpaceList';

const TopPage = styled.div`
  width: 100%;
`;

const BrStyled = styled.br`
  display: none;
  ${media.tablet`
    display: block;
  `};
`;

type PropTypes = {
  story: boolean,
  locationText: Function,
  handleChangeLocation: Function,
  onKeyDownSearchField: Function,
  searchButtonDisabled: boolean,
  onClickSearch: Function,
};

// TODO: テストデータのため実装後に削除する
const getSpaceData = () => {
  const data = [];
  for (let i = 0; i < 4; i += 1) {
    data.push({
      ID: 3,
      PrefectureId: 13,
      SpaceId: 3,
      Space: {
        ID: 3,
        UserID: 8,
        Title: '広々8畳・和室・武蔵小杉駅より徒歩5分以内の駅近スペース',
        Introduction:
          'サンプル部屋です。サンプル部屋です。サンプル部屋です。サンプル部屋です。サンプル部屋です。サンプル部屋です。サンプル部屋です。サンプル部屋です。',
        PriceFull: 3000,
        PriceHalf: 0,
        PriceQuarter: 0,
        Address: '東京都渋谷区東1-2',
        AddressPref: '東京都',
        AddressCity: '渋谷区',
        AddressTown: '東',
        Images: [
          {
            ID: 3,
            CreatedAt: '2018-11-28T05:08:30+09:00',
            UpdatedAt: '2018-11-28T05:08:30+09:00',
            DeletedAt: null,
            SpaceID: 3,
            ImageUrl:
              'https://firebasestorage.googleapis.com/v0/b/monooq-dev.appspot.com/o/img%2Fspaces%2F3%2F1543381707934.jpg?alt=media&token=f10230b7-3ff8-4e58-9a26-57c3d2ab941c',
          },
        ],
      },
    });
  }

  return data;
};

// TODO: テストデータのため実装後に削除する
const getPrefectureList = () => {
  return [
    {
      region: '関東',
      prefectureList: [
        { name: '東京', link: '1' },
        { name: '神奈川', link: '2' },
        { name: '埼玉', link: '3' },
        { name: '千葉', link: '4' },
        { name: '茨城', link: '5' },
        { name: '群馬', link: '6' },
        { name: '栃木', link: '7' },
      ],
    },
    {
      region: '北海道・東北',
      prefectureList: [
        { name: '北海道', link: '1' },
        { name: '青森', link: '2' },
        { name: '岩手', link: '3' },
        { name: '宮城', link: '4' },
        { name: '秋田', link: '5' },
        { name: '山形', link: '6' },
        { name: '福島', link: '7' },
      ],
    },
    {
      region: '甲信越・北陸',
      prefectureList: [
        { name: '山梨', link: '1' },
        { name: '新潟', link: '2' },
        { name: '長野', link: '3' },
        { name: '富山', link: '4' },
        { name: '石川', link: '5' },
        { name: '福井', link: '6' },
      ],
    },
    {
      region: '東海',
      prefectureList: [
        { name: '愛知', link: '1' },
        { name: '岐阜', link: '2' },
        { name: '静岡', link: '3' },
        { name: '三重', link: '4' },
      ],
    },
    {
      region: '関西',
      prefectureList: [
        { name: '大阪', link: '1' },
        { name: '兵庫', link: '2' },
        { name: '京都', link: '3' },
        { name: '滋賀', link: '4' },
        { name: '奈良', link: '5' },
        { name: '和歌山', link: '6' },
      ],
    },
    {
      region: '四国',
      prefectureList: [
        { name: '徳島', link: '1' },
        { name: '香川', link: '2' },
        { name: '愛媛', link: '3' },
        { name: '高知', link: '4' },
      ],
    },
    {
      region: '中国',
      prefectureList: [
        { name: '鳥取', link: '1' },
        { name: '島根', link: '2' },
        { name: '岡山', link: '3' },
        { name: '広島', link: '4' },
        { name: '山口', link: '5' },
      ],
    },
    {
      region: '九州・沖縄',
      prefectureList: [
        { name: '福岡', link: '1' },
        { name: '佐賀', link: '2' },
        { name: '長崎', link: '3' },
        { name: '熊本', link: '4' },
        { name: '大分', link: '5' },
        { name: '宮崎', link: '6' },
        { name: '鹿児島', link: '7' },
        { name: '沖縄', link: '8' },
      ],
    },
  ];
};

const getCatchPhrase = () => {
  return (
    <Fragment>
      近所のスペースを
      <BrStyled />
      探してみよう。
    </Fragment>
  );
};

export default ({
  story,
  locationText,
  handleChangeLocation,
  onKeyDownSearchField,
  searchButtonDisabled,
  onClickSearch,
}: PropTypes) => (
  <TopPage>
    {!story && <Header top />}
    <TopView
      catchPhrase={getCatchPhrase()}
      catchPhraseSub="スキマ空間のシェアサービス「モノオク」"
      placeholder="東京都 千代田区"
      locationText={locationText}
      onChange={handleChangeLocation}
      onKeyDown={onKeyDownSearchField}
      searchDisabled={searchButtonDisabled}
      onClickSearchButton={onClickSearch}
    />
    <PrefectureList list={getPrefectureList()} />
    <SpaceList
      caption="運営のおすすめスペース紹介"
      captionSub="公式がイチオシする高評価スペース"
      spaceList={getSpaceData()}
    />
    <SpaceList
      isTag
      caption="＃4畳以上"
      captionSub="大型家具や物をたくさん預けたいときに"
      spaceList={getSpaceData()}
    />
    <SpaceList
      isTag
      caption="＃ダンボール1箱〜"
      captionSub="大型家具や物をたくさん預けたいときに"
      spaceList={getSpaceData()}
    />
    <SpaceList
      isTag
      caption="＃短期歓迎"
      captionSub="大型家具や物をたくさん預けたいときに"
      spaceList={getSpaceData()}
    />
  </TopPage>
);
