import React from 'react';
import { Loader } from 'semantic-ui-react';
import Buttons from './Buttons';

export default (props) => {
  if (props.secondary) {
    return (
      <Buttons.Secondary
        {...props}
        onClick={props.disabled ? null : props.onClick}
      >
        {props.loading ? <Loader active inline="centered" /> : props.children}
      </Buttons.Secondary>
    );
  }

  if (props.tertiary) {
    return (
      <Buttons.Tertiary
        {...props}
        onClick={props.disabled ? null : props.onClick}
      >
        {props.loading ? <Loader active inline="centered" /> : props.children}
      </Buttons.Tertiary>
    );
  }

  if (props.facebook) {
    return (
      <Buttons.Facebook
        {...props}
        onClick={props.disabled ? null : props.onClick}
      >
        {props.loading ? <Loader active inline="centered" /> : props.children}
      </Buttons.Facebook>
    );
  }

  return (
    <Buttons.Primary
      {...props}
      onClick={props.disabled ? null : props.onClick}
    >
      {props.loading ? <Loader active inline="centered" /> : props.children}
    </Buttons.Primary>
  );
};
