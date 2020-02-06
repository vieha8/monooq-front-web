import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Colors, Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import { H1 } from 'components/LV1/Texts/Headline';
import InlineText from 'components/LV1/Texts/InlineText';
import ScheduleListItem from 'components/LV2/Items/ScheduleListItem';

const ScheduleListWrap = styled.div``;

const CaptionWrap = styled.div`
  margin: ${Dimens.medium4_50}px auto 0;
  ${media.tablet`
    margin: ${Dimens.medium2}px auto 0;
  `};
`;

const Row = styled.div`
  width: calc(50% - 1%);
  max-width: 100%;
  margin-top: ${Dimens.medium}px;
  &:nth-child(2n) {
    width: calc(50% - 1%);
    margin-left: 2%;
  }
  box-sizing: border-box;
  border: 1px solid ${Colors.borderGray};
  border-radius: 4px;
  padding: 0px 10px;
  ${media.phone`
    width: 100%;
    max-width: 320px;
    margin: ${Dimens.medium}px auto 0;
    &:nth-child(2n) {
      width: 100%;
      margin: ${Dimens.medium}px auto 0;
    }
  `};
`;

const SchedulesWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const checkSchedule = (value, list, prop) => {
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].schedule[prop] === value) {
      return true;
    }
  }
  return false;
};

export default ({ schedules }) => (
  <Fragment>
    <H1 bold>利用状況</H1>
    <ScheduleListWrap>
      {checkSchedule(true, schedules, 'isHost') && (
        <Fragment>
          <CaptionWrap>
            <InlineText.Base fontSize={`${FontSizes.medium1_22}`} bold>
              貸したスペース
            </InlineText.Base>
          </CaptionWrap>
          <SchedulesWrap>
            {schedules.map(
              (v, i) =>
                v.schedule.isHost && (
                  <Row key={`schedule_item_host_${i}`.toString()}>
                    <ScheduleListItem {...v} />
                  </Row>
                ),
            )}
          </SchedulesWrap>
        </Fragment>
      )}
      {checkSchedule(false, schedules, 'isHost') && (
        <Fragment>
          <CaptionWrap>
            <InlineText.Base fontSize={`${FontSizes.medium1_22}`} bold>
              借りたスペース
            </InlineText.Base>
          </CaptionWrap>
          <SchedulesWrap>
            {schedules.map(
              (v, i) =>
                !v.schedule.isHost && (
                  <Row key={`schedule_item_guest_${i}`.toString()}>
                    <ScheduleListItem {...v} />
                  </Row>
                ),
            )}
          </SchedulesWrap>
        </Fragment>
      )}
    </ScheduleListWrap>
  </Fragment>
);
