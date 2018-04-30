// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import ScheduleListItem, {
  type PropTypes as ScheduleListItemType,
} from 'components/atomic/LV2/ScheduleListItem';
import { Dimens } from 'variables';

const Row = styled.div`
  &:not(:first-child) {
    margin-top: ${Dimens.medium3}px;
  }
`;

type PropTypes = {
  schedules: Array<ScheduleListItemType>,
};

export default (props: PropTypes) => (
  <Fragment>
    {props.schedules.map((schedule, i) => (
      <Row key={`schedule_item_${i}`}>
        <ScheduleListItem {...schedule} />
      </Row>
    ))}
  </Fragment>
);
