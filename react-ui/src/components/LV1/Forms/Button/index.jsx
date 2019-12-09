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
const handleText = ({ loading, children }) => {
  if (loading) {
    return (
      <LoaderWrap>
        <Loader active inverted inline="centered" size="mini" />
      </LoaderWrap>
    );
  }
  return children;
};

export default ({ loading, ...props }) => {
  const {
    secondary,
    tertiary,
    quaternary,
    quinary,
    senary,
    facebook,
    twitter,
    line,
    areaPin,
  } = props;
  if (secondary) {
    return (
      <Secondary {...props} onClick={handleOnClick(props)}>
        {handleText({ ...props, loading })}
      </Secondary>
    );
  }
  if (tertiary) {
    return (
      <Tertiary {...props} onClick={handleOnClick(props)}>
        {handleText({ ...props, loading })}
      </Tertiary>
    );
  }
  if (quaternary) {
    return (
      <Quaternary {...props} onClick={handleOnClick(props)}>
        {handleText({ ...props, loading })}
      </Quaternary>
    );
  }
  if (quinary) {
    return (
      <Quinary {...props} onClick={handleOnClick(props)}>
        {handleText({ ...props, loading })}
      </Quinary>
    );
  }
  if (senary) {
    return (
      <Senary {...props} onClick={handleOnClick(props)}>
        {handleText({ ...props, loading })}
      </Senary>
    );
  }
  if (facebook) {
    return (
      <Facebook {...props} onClick={handleOnClick(props)} loading={loading}>
        {handleText({ ...props, loading })}
      </Facebook>
    );
  }
  if (twitter) {
    return (
      <Twitter {...props} onClick={handleOnClick(props)} loading={loading}>
        {handleText({ ...props, loading })}
      </Twitter>
    );
  }
  if (line) {
    return (
      <Line {...props} onClick={handleOnClick(props)}>
        {handleText({ ...props, loading })}
      </Line>
    );
  }
  if (areaPin) {
    return (
      <AreaPin {...props} onClick={handleOnClick(props)}>
        {handleText({ ...props, loading })}
      </AreaPin>
    );
  }

  return (
    <Primary {...props} onClick={handleOnClick(props)}>
      {handleText({ ...props, loading })}
    </Primary>
  );
};
