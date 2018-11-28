// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
import ScheduleListItem, {
  type PropTypes as ScheduleListItemType,
} from 'components/atomic/LV2/ScheduleListItem';
import { Colors, Dimens, FontSizes } from 'variables';

const Row = styled.div`
  &:not(:first-child) {
    margin-top: ${Dimens.medium2}px;
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
  margin: ${Dimens.medium2}px auto;
`;

type PropTypes = {
  schedules: Array<ScheduleListItemType>,
};

export default (props: PropTypes) => (
  <Fragment>
    <ScheduleListWrap>
      <CaptionWrap>
        <InlineText.Base fontSize={`${FontSizes.medium1}`} bold>
          借りているスペース
        </InlineText.Base>
        {/* TODO:貸している側も実装 */}
        {/* {props.schedule.isHost ? (
          <div>
            <InlineText.Base fontSize={`${FontSizes.medium1}`} bold>
              貸しているスペース
            </InlineText.Base>
          </div>
        ) : (
          <InlineText.Base fontSize={`${FontSizes.medium1}`} bold>
            借りているスペース
          </InlineText.Base>
        )} */}
      </CaptionWrap>
      {props.schedules.map((schedule, i) => (
        <Row key={`schedule_item_${i}`}>
          <ScheduleListItem {...schedule} />
        </Row>
      ))}
    </ScheduleListWrap>
    <ScheduleListWrap rented>
      <CaptionWrap>
        <InlineText.Base fontSize={`${FontSizes.medium1}`} bold>
          過去に借りていたスペース
        </InlineText.Base>
        {/* TODO:貸している側も実装 */}
        {/* {props.schedule.isHost ? (
          <div>
            <InlineText.Base fontSize={`${FontSizes.medium1}`} bold>
              貸しているスペース
            </InlineText.Base>
          </div>
        ) : (
          <InlineText.Base fontSize={`${FontSizes.medium1}`} bold>
            借りているスペース
          </InlineText.Base>
        )} */}
      </CaptionWrap>
      {props.schedules.map((schedule, i) => (
        <Row key={`schedule_item_${i}`}>
          <ScheduleListItem {...schedule} />
        </Row>
      ))}
    </ScheduleListWrap>
  </Fragment>
);
