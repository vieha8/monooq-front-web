import React from 'react';
import styled from 'styled-components';
import InputCalendar from 'components/Shared/InputCalendar';
import { FontSizes, Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Container = styled.div`
  width: 100%;
  display: table;
`;

const DateCell = styled.div`
  padding-top: ${Dimens.medium1}px;
  display: inline-block;
  width: 100%;
  max-width: 280px;
  ${media.tablet`
    display: block;
    width: 100%;
    &:not(:first-child) {
      margin-top: ${Dimens.medium}px;
    }
  `}
`;

const Arrow = styled.span`
  display: inline-block;
  vertical-align: middle;
  width: 30px;
  font-size: ${FontSizes.medium}px;
  color: ${Colors.lightGray1};
  text-align: center;
  &:after {
    content: "\f061";
    font-family: "Fontawesome";
  }
  ${media.tablet`
    display: none;
  `}
`;

const DateLabel = styled.span`
  display: block;
  margin-bottom: ${Dimens.small2}px;
  font-size: ${FontSizes.medium}px;
  color: ${Colors.black};
`;

export default props => (
  <Container>
    <DateCell>
      <DateLabel>利用開始日</DateLabel>
      <InputCalendar
        date={props.beginDate}
        block
        focused={Boolean(props.beginDateFocused)}
        onDateChange={date => props.onDateChangeBegin(date)}
        onFocusChange={e => props.onFocusChangeBegin(e.focused)}
      />
    </DateCell>
    <Arrow />
    <DateCell>
      <DateLabel>利用終了日</DateLabel>
      <InputCalendar
        date={props.endDate}
        block
        focused={Boolean(props.endDateFocused)}
        onDateChange={date => props.onDateChangeEnd(date)}
        onFocusChange={e => props.onFocusChangeEnd(e.focused)}
      />
    </DateCell>
  </Container>
);
