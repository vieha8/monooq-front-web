// @flow

import React, { Fragment } from 'react';
import InlineText from 'components/atomic/LV1/InlineText';
import { Colors } from 'variables';
import Schedule from './Schedule';

type PropTypes = {
  schedule: {
    hostIsMySelf: boolean,
    opponentName: string,
    space: {
      image: {
        src: string,
        alt: string,
      },
      address: string,
      content: string,
      href: string,
    },
    startDate: Date | string,
    endDate: Date | string,
  },
  sales: number,
  roomId: string,
};

export default (props: PropTypes) => (
  <Fragment>
    <Schedule {...props.schedule} />
  </Fragment>
);
