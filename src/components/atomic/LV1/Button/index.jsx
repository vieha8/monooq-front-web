// @flow

import React from 'react';
import { Loader } from 'semantic-ui-react';

import Primary from './Primary';
import Secondary from './Secondary';
import Tertiary from './Tertiary';
import Facebook from './Facebook';
import Hub from './Hub';

type PropTypes = {
  primary?: boolean,
  secondary?: boolean,
  tertiary?: boolean,
  facebook?: boolean,
  hub?: boolean,
  disabled?: boolean,
  loading?: boolean,
  onClick: Function,
  children: any,
};

export default (props: PropTypes) => {
  if (props.secondary) {
    return (
      <Secondary {...props} onClick={props.disabled || props.loading ? null : props.onClick}>
        {props.loading ? <Loader active inline="centered" size="mini" /> : props.children}
      </Secondary>
    );
  }

  if (props.tertiary) {
    return (
      <Tertiary {...props} onClick={props.disabled || props.loading ? null : props.onClick}>
        {props.loading ? <Loader active inverted inline="centered" size="mini" /> : props.children}
      </Tertiary>
    );
  }

  if (props.facebook) {
    return (
      <Facebook {...props} onClick={props.disabled || props.loading ? null : props.onClick}>
        {props.loading ? <Loader active inverted inline="centered" size="mini" /> : props.children}
      </Facebook>
    );
  }

  if (props.hub) {
    return (
      <Hub {...props} onClick={props.disabled || props.loading ? null : props.onClick}>
        {props.loading ? <Loader active inverted inline="centered" size="mini" /> : props.children}
      </Hub>
    );
  }

  return (
    <Primary {...props} onClick={props.disabled || props.loading ? null : props.onClick}>
      {props.loading ? <Loader active inverted inline="centered" size="mini" /> : props.children}
    </Primary>
  );
};
