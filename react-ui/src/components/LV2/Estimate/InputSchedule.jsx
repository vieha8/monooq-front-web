import React, { Fragment } from 'react';
import styled from 'styled-components';
import Calendar from 'components/LV1/Forms/Calendar';
import InlineText from 'components/LV1/Texts/InlineText';
import { FontSizes, Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Wrap = styled.div`
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
  isOnlyBeginDate,
  beginTitle,
  startDate,
  startDateFocused,
  onDateChangeStart,
  onFocusChangeStart,
  endTitle,
  endDate,
  endDateFocused,
  onDateChangeEnd,
  onFocusChangeEnd,
}) => (
  <Wrap>
    <DateCell>
      <DateLabel>
        <InlineText.Bold>{beginTitle || 'ゲストの利用開始日'}</InlineText.Bold>
      </DateLabel>
      <Calendar
        date={startDate}
        block
        focused={Boolean(startDateFocused)}
        onDateChange={date => onDateChangeStart(date)}
        onFocusChange={e => onFocusChangeStart(e.focused)}
        isAllowKeyboard={false}
      />
    </DateCell>
    {!isOnlyBeginDate && (
      <Fragment>
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
      </Fragment>
    )}
  </Wrap>
);
