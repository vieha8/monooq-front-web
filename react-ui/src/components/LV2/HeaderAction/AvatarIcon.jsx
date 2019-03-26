// @flow

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import AvatarImage from 'components/LV1/AvatarImage';

type PropTypes = {
  to?: string,
  size?: string,
  imageSrc: string,
};

export default (props: PropTypes) =>
  props.to ? (
    <Link to={props.to}>
      <AvatarImage src={props.imageSrc} size={props.size || 32} />
    </Link>
  ) : (
    <Fragment>
      <AvatarImage src={props.imageSrc} size={props.size || 32} />
    </Fragment>
  );
