import React from 'react';
import Buttons from './Buttons';

export default (props) => {
  if (props.secondary) {
    return (
      <Buttons.Secondary
        {...props}
        onClick={props.disabled ? null : props.onClick}
      >
        {props.children}
      </Buttons.Secondary>
    );
  }

  if (props.tertiary) {
    return (
      <Buttons.Tertiary
        {...props}
        onClick={props.disabled ? null : props.onClick}
      >
        {props.children}
      </Buttons.Tertiary>
    );
  }

  if (props.facebook) {
    return (
      <Buttons.Facebook
        {...props}
        onClick={props.disabled ? null : props.onClick}
      >
        {props.children}
      </Buttons.Facebook>
    );
  }

  return (
    <Buttons.Primary
      {...props}
      onClick={props.disabled ? null : props.onClick}
    >
      {props.children}
    </Buttons.Primary>
  );
};
