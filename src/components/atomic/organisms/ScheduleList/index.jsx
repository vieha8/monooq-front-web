// @flow

import React, { Fragment } from 'react';
import ScheduleListItem, {
  type PropTypes as ScheduleListItemType,
} from 'components/atomic/molecules/ScheduleListItem';

type PropTypes = {
  schedules: Array<ScheduleListItemType>,
};

export default (props: PropTypes) => (
  <Fragment>
    {props.schedules.map((schedule, i) => (
      <ScheduleListItem key={`schedule_item_${i}`} {...schedule} />
    ))}
  </Fragment>
);
