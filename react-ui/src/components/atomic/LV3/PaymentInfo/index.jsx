// @flow

import React, { Fragment } from 'react';
import Payment from 'components/atomic/LV2/Payment';
import PlaceListHorizonItem from 'components/atomic/LV2/PlaceListHorizonItem';

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
    <PlaceListHorizonItem {...props.space} {...props} />
    <Payment {...props.payment} />
  </Fragment>
);
