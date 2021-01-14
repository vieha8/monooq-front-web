import React from 'react';
import styled from 'styled-components';
import Calendar from 'components/LV1/Forms/Calendar';
import InlineText from 'components/LV1/Texts/InlineText';
import { Dimens } from 'variables';
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

const DateLabel = styled.span`
  display: block;
  margin-bottom: ${Dimens.small2}px;
  margin: 5px auto 7px;
`;

export default ({ startDate, onDateChangeStart }) => (
  <Wrap>
    <DateCell>
      <DateLabel>
        <InlineText.Bold>貸し出し開始日</InlineText.Bold>
      </DateLabel>
      <Calendar date={startDate} onDateChange={date => onDateChangeStart(date)} />
    </DateCell>
  </Wrap>
);
