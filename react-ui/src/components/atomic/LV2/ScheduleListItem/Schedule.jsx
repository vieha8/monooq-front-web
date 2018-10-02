// @flow

import React from 'react';
import styled from 'styled-components';
import { FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import { H3 } from 'components/atomic/LV1/Headline';
import ClearfixContainer from 'components/atomic/LV1/ClearfixContainer';
import PlaceListHorizonItem from 'components/atomic/LV2/PlaceListHorizonItem';
import Duration from './Duration';

const UserName = styled(H3)`
  font-size: ${FontSizes.medium}px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SpaceContainer = styled.div`
  float: left;
  max-width: 260px;
  ${media.tablet`
    float: none;
  `};
`;

const SpaceWrapper = styled.div`
  margin-top: ${Dimens.small2}px;
`;

const ScheduleWrapper = styled.div`
  float: right;
  ${media.tablet`
    float: none;
    margin-top: ${Dimens.medium}px;
  `};
`;

type PropTypes = {
  opponentName: string,
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
      <UserName>
        {props.hostIsMySelf ? 'ユーザー' : 'ホスト'}は{props.opponentName}
        さん
      </UserName>
      <SpaceWrapper>
        <PlaceListHorizonItem {...props.space} />
      </SpaceWrapper>
    </SpaceContainer>
    <ScheduleWrapper>
      <Duration startDate={props.startDate} endDate={props.endDate} />
    </ScheduleWrapper>
  </ClearfixContainer>
);
