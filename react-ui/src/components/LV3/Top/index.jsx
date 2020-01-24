import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import TopView from 'components/LV3/TopView';
import PrefectureList from 'components/LV3/PrefectureList';
import SpaceList from 'components/LV3/SpaceList';
import { areaPrefectures } from 'helpers/prefectures';

const Wrap = styled.div`
  width: 100%;
`;

const BrStyled = styled.br`
  display: none;
  ${media.tablet`
    display: block;
  `};
`;

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
  locationText,
  handleChangeLocation,
  onKeyDownSearchField,
  searchButtonDisabled,
  onClickSearch,
  sections,
}) => (
  <Wrap>
    <TopView
      catchPhrase={getCatchPhrase()}
      catchPhraseSub="物置シェアサービス「モノオク」"
      placeholder="東京都 世田谷区"
      locationText={locationText}
      onChange={handleChangeLocation}
      onKeyDown={onKeyDownSearchField}
      searchDisabled={searchButtonDisabled}
      onClickSearchButton={onClickSearch}
    />
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
