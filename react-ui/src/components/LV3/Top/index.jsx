// @flow

import React, { Fragment } from 'react';
import Header from 'components/containers/Header';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import TopView from 'components/LV3/TopView';
import PrefectureList from 'components/LV3/PrefectureList';
import SpaceList from 'components/LV3/SpaceList';
import { areaPrefectures } from 'helpers/prefectures';
import Loading from 'components/LV1/Loading';

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
  sections,
}: PropTypes) => (
  <TopPage>
    {!story && <Header top />}
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
  </TopPage>
);
