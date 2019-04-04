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
  user: {
    ID: string,
    Name: string,
    ImageUrl: string,
  },
  space: {
    image: {
      src: string,
      alt: string,
    },
    address: string,
    content: string,
    href: string,
  },
  startDate: Date | string,
  endDate: Date | string,
};

export default (props: PropTypes) => (
  <ClearfixContainer>
    <SpaceContainer>
      <SpaceWrapper>
        <PlaceListHorizonItem {...props.space} {...props} />
      </SpaceWrapper>
    </SpaceContainer>
    <ScheduleWrapper>
      <Duration startDate={props.startDate} endDate={props.endDate} />
      {/*<Operation roomId={props.roomId} float="right" />*/}
    </ScheduleWrapper>
  </ClearfixContainer>
);
