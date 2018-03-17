import React from 'react';
import styled from 'styled-components';
import { Colors, FontSizes, Dimens } from 'variables';

const Container = styled.div`
  display: table;
  margin-left: ${Dimens.medium};
`;

const ScheduleContainer = styled.div`
  display: table-cell;
  border-radius: 6px;
  border: 1px solid ${Colors.borderGray};
  padding: ${Dimens.medium}px;
  width: 140px;
  height: 120px;
`;

const Label = styled.span`
  display: block;
  font-size: ${FontSizes.medium}px;
  font-weight: bold;
  margin-top: ${Dimens.xsmall}px;
  color: ${Colors.black};
`;

const Arrow = styled.span`
  display: table-cell;
  vertical-align: middle;
  color: ${Colors.lightGray1};
  font-size: ${FontSizes.medium2}px;
  padding: 0 ${Dimens.small}px;
`;

const DateText = styled.span`
  display: block;
  margin-top: ${Dimens.xsmall}px;
  color: ${Colors.black};
  font-size: ${FontSizes.xsmall}px;
`;

export default props => (
  <Container>
    <ScheduleContainer>
      <Label>利用開始日</Label>
      <DateText>{props.begin.date}</DateText>
    </ScheduleContainer>
    <Arrow>→</Arrow>
    <ScheduleContainer>
      <Label>利用終了日</Label>
      <DateText>{props.end.date}</DateText>
    </ScheduleContainer>
  </Container>
);
