// @flow

import React, { Fragment } from 'react';
import InlineText from 'components/atomic/atoms/InlineText';
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
    {props.hostIsMySelf && (
      <div>
        <InlineText.Small color={Colors.brandPrimary}>あなたがホストです</InlineText.Small>
      </div>
    )}
    <Schedule {...props.schedule} />
    <Sales salesAmount={props.sales} />
    <Operation roomId={props.roomId} />
  </Fragment>
);
