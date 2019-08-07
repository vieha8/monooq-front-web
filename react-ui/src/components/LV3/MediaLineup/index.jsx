// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes } from 'variables';
import ContainerDefaultStyled from 'components/LV1/ContainerDefault/ContainerDefaultStyled';
import LineupList from 'components/LV2/Lists/LineupList';

const MediaLineupContainer = styled(ContainerDefaultStyled)`
  padding-top: ${Dimens.medium3_40}px;
  padding-bottom: ${Dimens.medium3_40}px;
`;

const LineupTitle = styled.div`
  font-size: ${FontSizes.medium1}px;
  margin-bottom: ${Dimens.medium3_40}px;
`;

type PropTypes = {
  title: string,
  list: Array<{
    link: string,
    image: string,
    alt: string,
  }>,
};

export default ({ title, list }: PropTypes) => (
  <MediaLineupContainer>
    <LineupTitle>{title}</LineupTitle>
    <LineupList list={list} />
  </MediaLineupContainer>
);
