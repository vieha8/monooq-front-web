import React from 'react';
import { Loader } from 'semantic-ui-react';
import styled from 'styled-components';
import Primary from './Primary';
import Secondary from './Secondary';
import Tertiary from './Tertiary';
import Quaternary from './Quaternary';
import Quinary from './Quinary';

import Facebook from './Facebook';
import Twitter from './Twitter';
import Line from './Line';
import AreaPin from './AreaPin';

export const LoaderWrap = styled.span`
  display: inline-block;
  vertical-align: middle;
`;

export default props => {
  if (props.secondary) {
    return (
      <Secondary {...props} onClick={props.disabled || props.loading ? null : props.onClick}>
        {props.loading ? (
          <LoaderWrap>
            <Loader active inline="centered" size="mini" />
          </LoaderWrap>
        ) : (
          props.children
        )}
      </Secondary>
    );
  }

  if (props.tertiary) {
    return (
      <Tertiary {...props} onClick={props.disabled || props.loading ? null : props.onClick}>
        {props.loading ? (
          <LoaderWrap>
            <Loader active inverted inline="centered" size="mini" />
          </LoaderWrap>
        ) : (
          props.children
        )}
      </Tertiary>
    );
  }

  if (props.quaternary) {
    return (
      <Quaternary {...props} onClick={props.disabled || props.loading ? null : props.onClick}>
        {props.loading ? (
          <LoaderWrap>
            <Loader active inverted inline="centered" size="mini" />
          </LoaderWrap>
        ) : (
          props.children
        )}
      </Quaternary>
    );
  }

  if (props.quinary) {
    return (
      <Quinary {...props} onClick={props.disabled || props.loading ? null : props.onClick}>
        {props.loading ? (
          <LoaderWrap>
            <Loader active inverted inline="centered" size="mini" />
          </LoaderWrap>
        ) : (
          props.children
        )}
      </Quinary>
    );
  }

  if (props.facebook) {
    return (
      <Facebook {...props} onClick={props.disabled || props.loading ? null : props.onClick}>
        {props.loading ? (
          <LoaderWrap>
            <Loader active inverted inline="centered" size="mini" />
          </LoaderWrap>
        ) : (
          props.children
        )}
      </Facebook>
    );
  }

  if (props.twitter) {
    return (
      <Twitter {...props} onClick={props.disabled || props.loading ? null : props.onClick}>
        {props.loading ? (
          <LoaderWrap>
            <Loader active inverted inline="centered" size="mini" />
          </LoaderWrap>
        ) : (
          props.children
        )}
      </Twitter>
    );
  }

  if (props.line) {
    return (
      <Line {...props} onClick={props.disabled || props.loading ? null : props.onClick}>
        {props.loading ? (
          <LoaderWrap>
            <Loader active inverted inline="centered" size="mini" />
          </LoaderWrap>
        ) : (
          props.children
        )}
      </Line>
    );
  }

  if (props.areaPin) {
    return (
      <AreaPin {...props} onClick={props.disabled || props.loading ? null : props.onClick}>
        {props.loading ? (
          <LoaderWrap>
            <Loader active inverted inline="centered" size="mini" />
          </LoaderWrap>
        ) : (
          props.children
        )}
      </AreaPin>
    );
  }

  return (
    <Primary {...props} onClick={props.disabled || props.loading ? null : props.onClick}>
      {props.loading ? (
        <LoaderWrap>
          <Loader active inverted inline="centered" size="mini" />
        </LoaderWrap>
      ) : (
        props.children
      )}
    </Primary>
  );
};
