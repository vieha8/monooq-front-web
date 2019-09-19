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
      region: '北海道・東北',
      prefectureList: [
        { name: '北海道', link: '1' },
        { name: '青森', link: '2' },
        { name: '山形', link: '3' },
        { name: '秋田', link: '4' },
        { name: '岩手', link: '5' },
        { name: '宮城', link: '6' },
        { name: '福島', link: '7' },
      ],
    },
    {
      region: '甲信越・北陸',
      prefectureList: [
        { name: '北海道', link: '1' },
        { name: '青森', link: '2' },
        { name: '山形', link: '3' },
        { name: '秋田', link: '4' },
        { name: '岩手', link: '5' },
        { name: '宮城', link: '6' },
        { name: '福島', link: '7' },
      ],
    },
    {
      region: '関東',
      prefectureList: [
        { name: '北海道', link: '1' },
        { name: '青森', link: '2' },
        { name: '山形', link: '3' },
        { name: '秋田', link: '4' },
        { name: '岩手', link: '5' },
        { name: '宮城', link: '6' },
        { name: '福島', link: '7' },
      ],
    },
    {
      region: '東海',
      prefectureList: [
        { name: '北海道', link: '1' },
        { name: '青森', link: '2' },
        { name: '山形', link: '3' },
        { name: '秋田', link: '4' },
      ],
    },
    {
      region: '関西',
      prefectureList: [
        { name: '北海道', link: '1' },
        { name: '青森', link: '2' },
        { name: '山形', link: '3' },
        { name: '秋田', link: '4' },
        { name: '岩手', link: '5' },
        { name: '宮城', link: '6' },
        { name: '福島', link: '7' },
      ],
    },
    {
      region: '四国',
      prefectureList: [
        { name: '北海道', link: '1' },
        { name: '青森', link: '2' },
        { name: '山形', link: '3' },
        { name: '秋田', link: '4' },
      ],
    },
    {
      region: '中国',
      prefectureList: [
        { name: '北海道', link: '1' },
        { name: '青森', link: '2' },
        { name: '山形', link: '3' },
        { name: '秋田', link: '4' },
        { name: '岩手', link: '5' },
      ],
    },
    {
      region: '九州・沖縄',
      prefectureList: [
        { name: '北海道', link: '1' },
        { name: '青森', link: '2' },
        { name: '山形', link: '3' },
        { name: '秋田', link: '4' },
        { name: '岩手', link: '5' },
        { name: '宮城', link: '6' },
        { name: '福島', link: '7' },
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
      SIplaceholder="東京都 千代田区"
      SIlocationText={locationText}
      SIonChange={handleChangeLocation}
      SIonKeyDown={onKeyDownSearchField}
      SIsearchDisabled={searchButtonDisabled}
      SIonClickSearchButton={onClickSearch}
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
