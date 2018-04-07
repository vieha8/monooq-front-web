// @flow

import React from 'react';

import Card from 'components/atomic/atoms/Card';
import PriceHead from 'components/atomic/molecules/Space/PriceHead';
import Price from 'components/atomic/molecules/Space/Price';

type PropTypes = {
  full?: string,
  half?: string,
  quarter?: string,
};

export default (props: PropTypes) => (
  <Card block>
    <PriceHead />
    {props.full && (
      <Price
        full
        price={props.full}
      />
    )}
    {props.half && (
      <Price
        half
        price={props.half}
      />
    )}
    {props.quarter && (
      <Price
        quarter
        price={props.quarter}
      />
    )}
  </Card>
);
