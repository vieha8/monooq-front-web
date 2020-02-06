import React from 'react';
import styled from 'styled-components';
import { areaPrefectures } from 'helpers/prefectures';
import PrefectureList from 'components/LV3/PrefectureList';
import SpaceList from 'components/LV3/SpaceList';
import View from 'components/LV3/Top/View';

const Wrap = styled.div`
  width: 100%;
`;

export default ({ sections }) => (
  <Wrap>
    <View />
    <PrefectureList list={areaPrefectures} />
    {sections.map((item, i) => (
      <SpaceList
        key={i.toString()}
        caption={item.title}
        captionSub="公式がイチオシする高評価スペース"
        spaceList={item.contents}
      />
    ))}
  </Wrap>
);
