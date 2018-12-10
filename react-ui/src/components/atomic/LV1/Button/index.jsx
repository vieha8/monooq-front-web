// @flow

import React from 'react';
import { Loader } from 'semantic-ui-react';
import styled from 'styled-components';
import Primary from './Primary';
import Secondary from './Secondary';
import Tertiary from './Tertiary';
import Facebook from './Facebook';

type PropTypes = {
  primary?: boolean,
  secondary?: boolean,
  tertiary?: boolean,
  facebook?: boolean,
  disabled?: boolean,
  loading?: boolean,
  onClick: Function,
  children: any,
};

export const LoaderWrap = styled.span`
  display: inline-block;
  vertical-align: middle;
`;

export default (props: PropTypes) => {
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
