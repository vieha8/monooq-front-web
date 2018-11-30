// @flow

import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import InlineText from 'components/atomic/LV1/InlineText';
import { FontSizes, Dimens } from 'variables';

const Container = styled.div`
  display: table;
  float: left;
`;

const ScheduleContainer = styled.div`
  display: table-cell;
  border-radius: 6px;
  padding: ${Dimens.medium}px 0;
  width: 110px;
  ${props =>
    props.endDate &&
    `
    padding: ${Dimens.medium}px 0 0 ${Dimens.huge}px;
  `};
  ${media.tablet`
    ${props =>
      props.endDate &&
      `
      padding: ${Dimens.medium}px 0 0 ${Dimens.medium3}px;
    `};
  `};
`;

const Label = styled.div`
  display: block;
`;

const DateText = styled.span`
  display: block;
`;

type PropTypes = {
  startDate: Date | string,
  endDate: Date | string,
};

export default (props: PropTypes) => (
  <Container>
    <ScheduleContainer>
      <Label>
        <InlineText.Base fontSize={`${FontSizes.small}`}>利用開始日</InlineText.Base>
      </Label>
      <DateText>
        <InlineText.Base fontSize={`${FontSizes.medium1}`} lineheight={1.4} bold>
          {moment(props.startDate).format('YYYY.MM.DD')}
        </InlineText.Base>
      </DateText>
    </ScheduleContainer>
    <ScheduleContainer endDate>
      <Label>
        <InlineText.Base fontSize={`${FontSizes.small}`}>利用終了日</InlineText.Base>
      </Label>
      <DateText>
        <InlineText.Base fontSize={`${FontSizes.medium1}`} lineheight={1.4} bold>
          {moment(props.endDate).format('YYYY.MM.DD')}
        </InlineText.Base>
      </DateText>
    </ScheduleContainer>
  </Container>
);
