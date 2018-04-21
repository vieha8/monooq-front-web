// @flow

import React from 'react';
import { Loader } from 'semantic-ui-react';

type PropTypes = {
  size: 'mini' | 'medium' | 'large',
};

export default (props: PropTypes) => (
  <span>
    <Loader active inline="centered" size={props.size} />
  </span>
);
