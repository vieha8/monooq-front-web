import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/LV1/Texts/InlineText';
import { FontSizes, Dimens } from 'variables';
import { formatDate, formatStringSlash } from 'helpers/date';

const Container = styled.div`
  margin: ${Dimens.small_10}px auto;
`;

const ScheduleContainer = styled.div`
  border-radius: 4px;
  width: 100%;
`;

const Label = styled.div`
  display: flex;
`;

const DateText = styled.span`
  display: block;
`;

export default ({ startDate, endDate }) => (
  <Container>
    <ScheduleContainer>
      <Label>
        <InlineText.Base fontSize={`${FontSizes.small}`} lineheight={`${Dimens.medium1_28}px`}>
          利用開始日：
        </InlineText.Base>
        <DateText>
          <InlineText.Base fontSize={`${FontSizes.medium1}`} lineheight={1.4} bold>
            {formatDate(new Date(startDate), formatStringSlash)}
          </InlineText.Base>
        </DateText>
      </Label>
    </ScheduleContainer>
    <ScheduleContainer endDate>
      <Label>
        <InlineText.Base fontSize={`${FontSizes.small}`} lineheight={`${Dimens.medium1_28}px`}>
          利用終了日：
        </InlineText.Base>
        <DateText>
          <InlineText.Base fontSize={`${FontSizes.medium1}`} lineheight={1.4} bold>
            {formatDate(new Date(endDate), formatStringSlash)}
          </InlineText.Base>
        </DateText>
      </Label>
    </ScheduleContainer>
  </Container>
);
