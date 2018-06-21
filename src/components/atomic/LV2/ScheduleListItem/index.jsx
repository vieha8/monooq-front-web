// @flow

import React, { Fragment } from 'react';
import InlineText from 'components/atomic/LV1/InlineText';
import { Colors } from 'variables';
import Schedule from './Schedule';
import Sales from './Sales';
import Operation from './Operation';

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
    {props.schedule.hostIsMySelf && (
      <div>
        <InlineText.Small color={Colors.brandPrimary}>あなたがホストです</InlineText.Small>
      </div>
    )}
    <Schedule {...props.schedule} />
    <Sales paid={!props.schedule.hostIsMySelf} amount={props.sales} />
    <Operation roomId={props.roomId} />
  </Fragment>
);
