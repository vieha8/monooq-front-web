// @flow

import React, { Fragment } from 'react';
import Schedule from './Schedule';
import Sales from './Sales';
import Operation from './Operation';

type PropTypes = {
  schedule: {
    host: boolean,
    opponentName: string,
    space: {
      image: {
        src: string,
        alt: string,
      },
      address: string,
      content: string,
      onClick: Function,
    },
    startDate: Date | string,
    endDate: Date | string,
  },
  sales: string,
  roomId: string,
};

export default (props: PropTypes) => (
  <Fragment>
    <Schedule {...props.schedule} />
    <Sales salesAmount={props.sales} />
    <Operation roomId={props.roomId} />
  </Fragment>
);
