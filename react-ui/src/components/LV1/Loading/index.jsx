// @flow

import React from 'react';
import { Loader } from 'semantic-ui-react';

type PropTypes = {
  size: 'mini' | 'medium' | 'large',
};

export default ({ size }: PropTypes) => (
  <span>
    <Loader active inline="centered" size={size} />
  </span>
);
