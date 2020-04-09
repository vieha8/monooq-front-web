import React from 'react';
import styled from 'styled-components';
import Path from 'config/path';
import { areaPrefectures } from 'helpers/prefectures';
import MenuItemTopList from 'components/LV2/Lists/MenuItemTopList';
import PrefectureList from 'components/LV3/PrefectureList';
import SpaceList from 'components/LV3/SpaceList';
import View from 'components/LV3/Top/View';
import Want from 'components/LV3/Lp123Guest/Want';
import Merit from 'components/LV3/Lp123Guest/Merit';
import BizModel from 'components/LV3/Lp123Guest/BizModel';
import Flow from 'components/LV3/Lp123Guest/Flow';
import Qa from 'components/LV3/Lp123Guest/Qa';

import BgImageAbout from 'images/bg-top-menu-sub-about.png';
import BgImageHowto from 'images/bg-top-menu-sub-howto.png';
import BgImageQa from 'images/bg-top-menu-sub-qa.png';

const Wrap = styled.div`
  width: 100%;
`;

export default ({ sections, regionId }) => (
  <Wrap>
    <View />
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
    <Flow />
    {sections.map((item, i) => (
      <SpaceList key={i.toString()} spaceList={item.contents} />
    ))}
    <Qa />
    {/* {sections.map((item, i) => (
      <SpaceList
        key={i.toString()}
        caption={item.title}
        captionSub="公式がイチオシする高評価スペース"
        spaceList={item.contents}
      />
    ))} */}
  </Wrap>
);
