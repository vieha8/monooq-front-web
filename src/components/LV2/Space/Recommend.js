import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import SnsShare from 'components/LV2/SnsShare';
import SearchResult from 'components/LV3/SearchResult';
import { SectionTitle } from './Section';

const Wrap = styled.div``;

const RecommendWrap = styled.div`
  margin: ${Dimens.medium_20}px auto;
`;

export default ({ id, name, recommend }) => (
  <Wrap>
    <SnsShare id={id} name={name} isOnlyTabSp />
    <SectionTitle text="このスペースをみた人はこんなスペースもみています" />
    <RecommendWrap recommend>
      <SearchResult spaces={recommend} narrow via="recommend" />
    </RecommendWrap>
  </Wrap>
);
