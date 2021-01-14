import React from 'react';
import { Loader } from 'semantic-ui-react';
import styled from 'styled-components';
import Primary from './Primary';
import Secondary from './Secondary';
import Tertiary from './Tertiary';
import Quaternary from './Quaternary';
import Quinary from './Quinary';
import Senary from './Senary';
import Facebook from './Facebook';
import Twitter from './Twitter';
import Line from './Line';
import AreaPin from './AreaPin';

const LoaderWrap = styled.span`
  display: inline-block;
  vertical-align: middle;
`;

const handleOnClick = ({ disabled, loading, onClick }) => (disabled || loading ? null : onClick);
const handleText = ({ loading, children, isInverted }) => {
  if (loading) {
    return (
      <LoaderWrap>
        <Loader active inverted={!isInverted} inline="centered" size="mini" />
      </LoaderWrap>
    );
  }
  return children;
};

export default ({ loading, disabled, isInverted, ...props }) => {
  const {
    secondary,
    tertiary,
    quaternary,
    senary,
    quinary,
    facebook,
    twitter,
    line,
    areaPin,
  } = props;
  if (secondary) {
    return (
      <Secondary
        {...props}
        disabled={disabled || loading}
        onClick={handleOnClick({ ...props, loading, disabled })}
      >
        {handleText({ ...props, loading, isInverted })}
      </Secondary>
    );
  }
  if (tertiary) {
    return (
      <Tertiary
        {...props}
        disabled={disabled || loading}
        onClick={handleOnClick({ ...props, loading, disabled })}
      >
        {handleText({ ...props, loading, isInverted })}
      </Tertiary>
    );
  }
  if (quaternary) {
    return (
      <Quaternary
        {...props}
        disabled={disabled || loading}
        onClick={handleOnClick({ ...props, loading, disabled })}
      >
        {handleText({ ...props, loading, isInverted })}
      </Quaternary>
    );
  }
  if (quinary) {
    return (
      <Quinary
        {...props}
        disabled={disabled || loading}
        onClick={handleOnClick({ ...props, loading, disabled })}
      >
        {handleText({ ...props, loading, isInverted })}
      </Quinary>
    );
  }
  if (senary) {
    return (
      <Senary {...props} onClick={handleOnClick({ ...props, loading, disabled })}>
        {handleText({ ...props, loading, isInverted })}
      </Senary>
    );
  }
  if (facebook) {
    return (
      <Facebook
        {...props}
        disabled={disabled || loading}
        onClick={handleOnClick({ ...props, loading, disabled })}
        loading={loading}
      >
        {handleText({ ...props, loading, isInverted })}
      </Facebook>
    );
  }
  if (twitter) {
    return (
      <Twitter
        {...props}
        disabled={disabled || loading}
        onClick={handleOnClick({ ...props, loading, disabled })}
        loading={loading}
      >
        {handleText({ ...props, loading, isInverted })}
      </Twitter>
    );
  }
  if (line) {
    return (
      <Line
        {...props}
        disabled={disabled || loading}
        onClick={handleOnClick({ ...props, loading, disabled })}
      >
        {handleText({ ...props, loading, isInverted })}
      </Line>
    );
  }
  if (areaPin) {
    return (
      <AreaPin
        {...props}
        disabled={disabled || loading}
        onClick={handleOnClick({ ...props, loading, disabled })}
      >
        {handleText({ ...props, loading, isInverted })}
      </AreaPin>
    );
  }

  return (
    <Primary
      {...props}
      disabled={disabled || loading}
      onClick={handleOnClick({ ...props, loading, disabled })}
    >
      {handleText({ ...props, loading, isInverted })}
    </Primary>
  );
};
