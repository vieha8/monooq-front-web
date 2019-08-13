// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import ContainerClearfix from 'components/LV1/ContainerClearfix';
import PlaceListHorizonItem from 'components/LV2/Items/PlaceListHorizonItem';
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
    id: string,
    name: string,
    imageUrl: string,
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
  <ContainerClearfix>
    <SpaceContainer>
      <SpaceWrapper>
        <PlaceListHorizonItem {...props.space} {...props} />
      </SpaceWrapper>
    </SpaceContainer>
    <ScheduleWrapper>
      <Duration startDate={props.startDate} endDate={props.endDate} />
      {/*<Operation roomId={props.roomId} float="right" />*/}
    </ScheduleWrapper>
  </ContainerClearfix>
);
