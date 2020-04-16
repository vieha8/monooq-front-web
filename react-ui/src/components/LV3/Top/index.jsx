import React from 'react';
import styled from 'styled-components';
import { HashLink } from 'react-router-hash-link';
import { Dimens, Colors } from 'variables';
import Path from 'config/path';
import { areaPrefectures } from 'helpers/prefectures';
import Button from 'components/LV1/Forms/Button';
import MenuItemTopList from 'components/LV2/Lists/MenuItemTopList';
import PrefectureList from 'components/LV3/PrefectureList';
import SpaceList from 'components/LV3/SpaceList';
import View from 'components/LV3/Top/View';
import Want from 'components/LV3/Lp123Guest/Want';
import Merit from 'components/LV3/Lp123Guest/Merit';
import BizModel from 'components/LV3/Lp123Guest/BizModel';
import Flow from 'components/LV3/Lp123Guest/Flow';
import BgImageAbout from 'images/bg-top-menu-sub-about.png';
import BgImageHowto from 'images/bg-top-menu-sub-howto.png';
import BgImageQa from 'images/bg-top-menu-sub-qa.png';
import SearchResult from 'components/LV3/SearchResult';
import { media } from 'helpers/style/media-query';

const Wrap = styled.div`
  width: 100%;
`;

const MoreButtonWrap = styled.div`
  max-width: 300px;
  margin: ${Dimens.medium}px auto;
`;

const ButtonStyled = styled(Button)`
  margin: ${Dimens.medium}px auto;
`;

const HashLinkStyled = styled(HashLink)`
  color: ${Colors.white} !important;
`;

const ResultWrap = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: ${Dimens.large2}px auto;
  padding: 0 ${Dimens.medium}px;
`;
export default ({ sections, regionId, spaces, onClickSpace }) => (
  <Wrap>
    <View />
    <ResultWrap>
      <SearchResult
        spaces={spaces.map(s => ({
          ...s,
          image: (s.images[0] || {}).imageUrl,
          onClick: () => onClickSpace(s.id),
        }))}
      />
      <MoreButtonWrap>
        <ButtonStyled tertiary borderbold fontSize={14} fontbold fill={1}>
          <HashLinkStyled to={`${Path.spacesByPrefecture('13')}`}>
            スペースをもっと見る
          </HashLinkStyled>
        </ButtonStyled>
      </MoreButtonWrap>
    </ResultWrap>

    <PrefectureList list={areaPrefectures} regionId={regionId} />
    <MenuItemTopList
      list={[
        {
          link: Path.about(),
          bgImage: BgImageAbout,
          titleSub: '置き場に困った荷物がある方へ',
          titleMain: 'モノオクをはじめよう',
        },
        {
          link: Path.howtouse(),
          bgImage: BgImageHowto,
          type: 'howto',
          titleSub: '実際にモノオクを使ってみよう',
          titleMain: 'ご利用の流れ',
        },
        {
          link: 'https://help.monooq.com/',
          bgImage: BgImageQa,
          type: 'qa',
          titleSub: '使い方がわからない人へ',
          titleMain: 'よくあるご質問',
          isLinkBlank: true,
        },
      ]}
    />
    <BizModel />
    <Want titleWant="こんな荷物ありませんか？" />
    <Merit />
    <Flow title="すぐに預けられる！" />
    {sections.map((item, i) => (
      // <SpaceList key={i.toString()} spaceList={item.contents} />
      <SpaceList
        key={i.toString()}
        caption={item.title}
        captionSub="公式がイチオシする高評価スペース"
        spaceList={item.contents}
      />
    ))}
    <MoreButtonWrap>
      <ButtonStyled tertiary borderbold fontSize={14} fontbold fill={1}>
        <HashLinkStyled to={`${Path.top()}#topview`}>スペースを探してみよう！</HashLinkStyled>
      </ButtonStyled>
      <ButtonStyled tertiary borderbold fontSize={14} fontbold fill={1}>
        <HashLinkStyled to={`${Path.top()}#prefecture-list-last`}>
          詳しく知りたい方はこちらへ
        </HashLinkStyled>
      </ButtonStyled>
    </MoreButtonWrap>
  </Wrap>
);
