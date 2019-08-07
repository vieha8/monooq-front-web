// @flow

import React, { Fragment } from 'react';
import ContentPayment from 'components/LV2/Texts/ContentPayment';
import PlaceListHorizonItem from 'components/LV2/Items/PlaceListHorizonItem';

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
    <ContentPayment {...props.payment} />
  </Fragment>
);
