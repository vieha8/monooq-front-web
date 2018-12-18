// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes } from 'variables';
import StyledDefaultContainer from 'components/atomic/containers/Static/StyledDefaultContainer';
import LineupList from 'components/atomic/LV2/LineupList';

const MediaLineupContainer = styled(StyledDefaultContainer)`
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
