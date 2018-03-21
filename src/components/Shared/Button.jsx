import React from 'react';
import Buttons from './Buttons';

export default (props) => {
  if (props.secondary) {
    return <Buttons.Secondary {...props}>{props.children}</Buttons.Secondary>;
  }

  if (props.tertiary) {
    return <Buttons.Tertiary {...props}>{props.children}</Buttons.Tertiary>;    
  }

  return <Buttons.Primary {...props}>{props.children}</Buttons.Primary>;
};
