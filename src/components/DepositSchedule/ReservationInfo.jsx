import React from 'react';
import styled from 'styled-components';
import { Colors, FontSizes, Dimens } from 'variables';
import SpaceRow from './SpaceRow';
import Schedule from './Schedule';
import ScheduleSales from './Sales';
import CancelSales from '../CancelSchedule/Sales';
import Operation from './Operation';

const Container = styled.div`
  &:not(:first-child) {
    margin-top: ${Dimens.large}px;
  }
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
`;

const SpaceRowWrapper = styled.div`
  margin-top: ${Dimens.small2}px;
`;

const SpaceContainer = styled.div`
  float: left;
`;

const ScheduleContaienr = styled.div`
  float: right;
`;

export default props => (
  <Container>
    <DepositContainer>
      <SpaceContainer>
        <UserName>ユーザーは{props.username}さん</UserName>
        <SpaceRowWrapper>
          <SpaceRow
            place={props.place}
            title={props.title}
          />
        </SpaceRowWrapper>
      </SpaceContainer>
      <ScheduleContaienr>
        <Schedule
          begin={{ date: '2018.03.31', time: '午前中' }}
          end={{ date: '2018.05.31', time: '夕方' }}
        />
      </ScheduleContaienr>
    </DepositContainer>
    {props.cancel
      ? <CancelSales salesAmount={props.salesAmount} />
      : <ScheduleSales salesAmount={props.salesAmount} />
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
