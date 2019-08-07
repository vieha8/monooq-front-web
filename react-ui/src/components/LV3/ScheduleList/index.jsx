// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import InlineText from 'components/LV1/Texts/InlineText';
import ScheduleListItem, {
  type PropTypes as ScheduleListItemType,
} from 'components/LV2/Items/ScheduleListItem';
import { Colors, Dimens, FontSizes } from 'variables';

const Row = styled.div`
  &:not(:first-child) {
    margin-top: ${Dimens.medium}px;
  }
`;

const ScheduleListWrap = styled.div`
  padding-bottom: ${Dimens.medium}px;
  ${props =>
    props.rented &&
    `
    border-top: 1px solid ${Colors.borderGray};
  `};
`;

const CaptionWrap = styled.div`
  margin: ${Dimens.medium2}px auto 0;
`;

const checkSchedule = (value, list, prop) => {
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].schedule[prop] === value) {
      return true;
    }
  }
  return false;
};

type PropTypes = {
  schedules: Array<ScheduleListItemType>,
};

export default ({ schedules }: PropTypes) => (
  <ScheduleListWrap>
    {checkSchedule(true, schedules, 'isHost') && (
      <Fragment>
        <CaptionWrap>
          <InlineText.Base fontSize={`${FontSizes.medium1_22}`} bold>
            貸したスペース
          </InlineText.Base>
        </CaptionWrap>
        {schedules.map(
          (v, i) =>
            v.schedule.isHost && (
              <Row key={`schedule_item_host_${i}`.toString()}>
                <ScheduleListItem {...v} />
              </Row>
            ),
        )}
      </Fragment>
    )}
    {checkSchedule(false, schedules, 'isHost') && (
      <Fragment>
        <CaptionWrap>
          <InlineText.Base fontSize={`${FontSizes.medium1_22}`} bold>
            借りたスペース
          </InlineText.Base>
        </CaptionWrap>
        {schedules.map(
          (v, i) =>
            !v.schedule.isHost && (
              <Row key={`schedule_item_guest_${i}`.toString()}>
                <ScheduleListItem {...v} />
              </Row>
            ),
        )}
      </Fragment>
    )}
  </ScheduleListWrap>
);
