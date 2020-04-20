import React from 'react';
import styled from 'styled-components';
import { HashLink } from 'react-router-hash-link';
import { Dimens, Colors } from 'variables';
import Path from 'config/path';
import { areaPrefectures } from 'helpers/prefectures';
import Button from 'components/LV1/Forms/Button';
import MenuItemTopList from 'components/LV2/Lists/MenuItemTopList';
import ModalTopDesiredCondition from 'components/LV3/ModalTopDesiredCondition';
import PrefectureList from 'components/LV3/PrefectureList';
import SpaceList from 'components/LV3/SpaceList';
import View from 'components/LV3/Top/View';
import Covid19Info from 'components/LV3/Top/Covid19Info';
import Want from 'components/LV3/Lp123Guest/Want';
import Merit from 'components/LV3/Lp123Guest/Merit';
import BizModel from 'components/LV3/Lp123Guest/BizModel';
import Flow from 'components/LV3/Lp123Guest/Flow';
import BgImageAbout from 'images/bg-top-menu-sub-about.png';
import BgImageHowto from 'images/bg-top-menu-sub-howto.png';
import BgImageQa from 'images/bg-top-menu-sub-qa.png';

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

export default ({ sections, regionId }) => (
  <Wrap>
    <View />
    <Covid19Info />
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
    {/* {isOpenModalError && ( */}
    <ModalTopDesiredCondition />
    {/* )} */}
  </Wrap>
);
