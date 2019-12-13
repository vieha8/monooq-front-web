import React from 'react';
import styled from 'styled-components';
import Calendar from 'components/LV1/Forms/Calendar';
import InlineText from 'components/LV1/Texts/InlineText';
import { FontSizes, Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Container = styled.div`
  width: 100%;
  display: table;
`;

const DateCell = styled.div`
  display: inline-block;
  width: 100%;
  max-width: 215px;
  ${media.tablet`
    display: block;
    width: 100%;
    &:not(:first-child) {
      margin-top: ${Dimens.medium}px;
    }
  `};
`;

const Arrow = styled.i`
  margin: 10px;
  display: inline-block;
  vertical-align: middle;
  width: 30px;
  font-size: ${FontSizes.medium}px;
  color: ${Colors.lightGray1};
  text-align: center;
  ${media.tablet`
    display: none;
  `};
`;

const DateLabel = styled.span`
  display: block;
  margin-bottom: ${Dimens.small2}px;
  margin: 5px auto 7px;
`;

export default ({
  beginTitle,
  beginDate,
  beginDateFocused,
  onDateChangeBegin,
  onFocusChangeBegin,
  endTitle,
  endDate,
  endDateFocused,
  onDateChangeEnd,
  onFocusChangeEnd,
}) => (
  <Container>
    <DateCell>
      <DateLabel>
        <InlineText.Bold>{beginTitle || '利用開始日'}</InlineText.Bold>
      </DateLabel>
      <Calendar
        date={beginDate}
        block
        focused={Boolean(beginDateFocused)}
        onDateChange={date => onDateChangeBegin(date)}
        onFocusChange={e => onFocusChangeBegin(e.focused)}
        isAllowKeyboard={false}
      />
    </DateCell>
    <Arrow className="fas fa-arrow-right" />
    <DateCell>
      <DateLabel>
        <InlineText.Bold>{endTitle || '利用終了日'}</InlineText.Bold>
      </DateLabel>
      <Calendar
        date={endDate}
        block
        focused={Boolean(endDateFocused)}
        onDateChange={date => onDateChangeEnd(date)}
        onFocusChange={e => onFocusChangeEnd(e.focused)}
        isAllowKeyboard={false}
      />
    </DateCell>
  </Container>
);
