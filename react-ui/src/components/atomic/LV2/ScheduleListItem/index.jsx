// @flow

import React, { Fragment } from 'react';
import Schedule from './Schedule';

type PropTypes = {
  schedule: {
    isHost: boolean,
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

export default ({ schedule }: PropTypes) => (
  <Fragment>
    <Schedule {...schedule} />
  </Fragment>
);
