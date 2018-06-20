// @flow

import React from 'react';

import Card from 'components/atomic/LV1/Card';
import HeroImage from 'components/atomic/LV1/HeroImage';
import InlineText from 'components/atomic/LV1/InlineText';

type PropTypes = {
  user: {
    image: String,
    name: String,
  },
  space: {
    price: String,
    area: String,
    description: String,
    color?: String,
  },
};

export default (props: PropTypes) => (
  <Card>
    <InlineText.Base color={props.space.color} />
  </Card>
);
