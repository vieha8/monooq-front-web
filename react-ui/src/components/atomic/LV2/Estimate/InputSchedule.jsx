// @flow

import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import InputCalendar from 'components/atomic/LV1/InputCalendar';
import InlineText from 'components/atomic/LV1/InlineText';
import { FontSizes, Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Container = styled.div`
  width: 100%;
  display: table;
`;

const DateCell = styled.div`
  display: inline-block;
  width: 100%;
  max-width: 280px;
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
`;

type PropTypes = {
  beginDate: moment,
  endDate: moment,
  beginDateFocused: boolean,
  onDateChangeBegin: Function,
  onFocusChangeBegin: Function,
  endDateFocused: boolean,
  onDateChangeEnd: Function,
  onFocusChangeEnd: Function,
  beginTitle: string,
  endTitle: string,
};

export default (props: PropTypes) => (
  <Container>
    <DateCell>
      <DateLabel>
        <InlineText.Bold>{props.beginTitle || '利用開始日'}</InlineText.Bold>
      </DateLabel>
      <InputCalendar
        date={props.beginDate}
        block
        focused={Boolean(props.beginDateFocused)}
        onDateChange={date => props.onDateChangeBegin(date)}
        onFocusChange={e => props.onFocusChangeBegin(e.focused)}
      />
    </DateCell>
    <Arrow className="fas fa-arrow-right" />
    <DateCell>
      <DateLabel>
        <InlineText.Bold>{props.endTitle || '利用終了日'}</InlineText.Bold>
      </DateLabel>
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
