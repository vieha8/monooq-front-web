// @flow

import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
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

const Label = styled.div`
  display: block;
  margin-top: ${Dimens.xsmall}px;
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
`;

type PropTypes = {
  startDate: Date | string,
  endDate: Date | string,
};

export default (props: PropTypes) => (
  <Container>
    <ScheduleContainer>
      <Label>
        <InlineText.Bold>利用開始日</InlineText.Bold>
      </Label>
      <DateText>
        <InlineText.Tiny>{moment(props.startDate).format('YYYY.MM.DD')}</InlineText.Tiny>
      </DateText>
    </ScheduleContainer>
    <Arrow>→</Arrow>
    <ScheduleContainer>
      <Label>
        <InlineText.Bold>利用終了日</InlineText.Bold>
      </Label>
      <DateText>
        <InlineText.Tiny>{moment(props.endDate).format('YYYY.MM.DD')}</InlineText.Tiny>
      </DateText>
    </ScheduleContainer>
  </Container>
);
