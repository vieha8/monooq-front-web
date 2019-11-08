import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import ContainerClearfix from 'components/LV1/ContainerClearfix';
import PlaceListHorizonItem from 'components/LV2/Items/PlaceListHorizonItem';
import Duration from './Duration';

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

export default props => (
  <ContainerClearfix>
    <SpaceContainer>
      <SpaceWrapper>
        <PlaceListHorizonItem {...props.space} {...props} />
      </SpaceWrapper>
    </SpaceContainer>
    <ScheduleWrapper>
      <Duration startDate={props.startDate} endDate={props.endDate} />
    </ScheduleWrapper>
  </ContainerClearfix>
);
