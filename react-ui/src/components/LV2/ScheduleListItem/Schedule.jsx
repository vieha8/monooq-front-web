// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import ClearfixContainer from 'components/LV1/ClearfixContainer';
import PlaceListHorizonItem from 'components/LV2/PlaceListHorizonItem';
import Duration from './Duration';
// import Operation from './Operation';

const SpaceContainer = styled.div`
  ${media.tablet`
    float: none;
  `};
`;

const SpaceWrapper = styled.div``;

const ScheduleWrapper = styled.div`
  clear: both;
  ${media.tablet`
    float: none;
    margin-top: ${Dimens.medium}px;
  `};
`;

type PropTypes = {
  space: {
    image: {
      src: string,
      alt: string,
    },
    address: string,
    content: string,
    href: string,
  },
  user: {
    ID: string,
    Name: string,
    ImageUrl: string,
  },
  isHost?: boolean,
  onClick?: Function,
  startDate: Date | string,
  endDate: Date | string,
};

export default ({ space, user, isHost, onClick, startDate, endDate }: PropTypes) => (
  <ClearfixContainer>
    <SpaceContainer>
      <SpaceWrapper>
        <PlaceListHorizonItem {...space} {...user} isHost={isHost} onClick={onClick} />
      </SpaceWrapper>
    </SpaceContainer>
    <ScheduleWrapper>
      <Duration startDate={startDate} endDate={endDate} />
    </ScheduleWrapper>
  </ClearfixContainer>
);
