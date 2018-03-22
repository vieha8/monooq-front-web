import React from 'react';
import styled from 'styled-components';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import SpaceRow from './SpaceRow';
import Schedule from './Schedule';
import ScheduleSales from './Sales';
import CancelSales from '../CancelSchedule/Sales';
import Operation from './Operation';

const Container = styled.div`
  &:not(:first-child) {
    margin-top: ${Dimens.large}px;
  }
  ${media.phone`
    padding: 0 ${Dimens.medium}px;
  `}
`;

const DepositContainer = styled.div`
  &:after {
    clear: both;
    content: "";
    display: block;
  }
`;

const UserName = styled.div`
  font-size: ${FontSizes.medium}px;
  color: ${Colors.black};
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SpaceRowWrapper = styled.div`
  margin-top: ${Dimens.small2}px;
`;

const SpaceContainer = styled.div`
  float: left;
  ${media.phone`
    float: none;
  `}
`;

const ScheduleContaienr = styled.div`
  float: right;
  ${media.phone`
    float: none;
    margin-top: ${Dimens.medium}px;
  `}
`;

export default props => (
  <Container>
    <DepositContainer>
      <SpaceContainer>
        <UserName>{props.isHost ? 'ユーザー' : 'ホスト'}は{props.userName}さん</UserName>
        <SpaceRowWrapper>
          <SpaceRow
            place={props.place}
            title={props.title}
          />
        </SpaceRowWrapper>
      </SpaceContainer>
      <ScheduleContaienr>
        <Schedule
          startDate={props.startDate}
          endDate={props.endDate}
        />
      </ScheduleContaienr>
    </DepositContainer>
    {props.isHost
      ? <ScheduleSales salesAmount={props.price} />
      : <CancelSales salesAmount={props.price} />
    }
    {props.otherText && props.otherLink &&
      <Operation
        other={{
          text: props.otherText,
          href: props.otherLink,
        }}
      />
    }
  </Container>
);
