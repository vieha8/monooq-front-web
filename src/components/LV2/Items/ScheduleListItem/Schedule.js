import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import PageClearfix from 'components/LV1/PageClearfix';
import PlaceListHorizonItem from 'components/LV2/Items/PlaceListHorizonItem';
import Duration from './Duration';

const SpaceWrap = styled.div`
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
  <PageClearfix>
    <SpaceWrap>
      <SpaceWrapper>
        <PlaceListHorizonItem {...props.space} {...props} />
      </SpaceWrapper>
    </SpaceWrap>
    <ScheduleWrapper>
      <Duration startDate={props.startDate} endDate={props.endDate} />
    </ScheduleWrapper>
  </PageClearfix>
);
