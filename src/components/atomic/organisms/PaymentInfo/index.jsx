// @flow

import React, { Fragment } from 'react';
import { H3 } from 'components/atomic/atoms/Headline';
import Payment from 'components/atomic/molecules/Payment';
import PlaceListHorizonItem from 'components/atomic/molecules/PlaceListHorizonItem';

type PropTypes = {
  hostName: string,
  space: {
    image: {
      src: string,
      alt: string,
    },
    address: string,
    content: string,
    href?: string,
  },
  payment: {
    beginAt: string,
    endAt: string,
    duration: string,
    price: string,
  },
};

export default (props: PropTypes) => (
  <Fragment>
    <H3>ホストは {props.hostName} さん</H3>
    <PlaceListHorizonItem {...props.space} />
    <Payment {...props.payment} />
  </Fragment>
);
