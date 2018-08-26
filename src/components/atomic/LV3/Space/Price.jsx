// @flow

import React from 'react';

import Card from 'components/atomic/LV1/Card';
import PriceHead from 'components/atomic/LV2/Space/PriceHead';
import Price from 'components/atomic/LV2/Space/Price';

type PropTypes = {
  full?: string,
  half?: string,
  quarter?: string,
};

export default (props: PropTypes) => (
  <Card block noBorderPhone>
    <PriceHead />
    {props.full && <Price full price={props.full} />}
    {props.half && <Price half price={props.half} />}
    {props.quarter && <Price quarter price={props.quarter} />}
  </Card>
);
