// @flow

import React, { Fragment } from 'react';
import Payment from 'components/LV2/Payment';
import PlaceListHorizonItem from 'components/LV2/PlaceListHorizonItem';

type PropTypes = {
  space: {
    image: {
      src: string,
      alt: string,
    },
    address: string,
    content: string,
    href?: string,
  },
  user: {
    ID: string,
    Name: string,
    ImageUrl: string,
  },
  isHost?: boolean,
  onClick?: Function,
  payment: {
    beginAt: string,
    endAt: string,
    duration: string,
    price: string,
  },
};

export default ({ space, user, isHost, onClick, payment }: PropTypes) => (
  <Fragment>
    <PlaceListHorizonItem {...space} {...user} isHost={isHost} onClick={onClick} />
    <Payment {...payment} />
  </Fragment>
);
