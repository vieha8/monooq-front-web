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

export default props => {
  const { secondary, tertiary, quaternary, quinary, facebook, twitter, line, areaPin } = props;
  if (secondary) {
    return (
      <Secondary {...props} onClick={handleOnClick(props)}>
        {handleText(props)}
      </Secondary>
    );
  }
  if (tertiary) {
    return (
      <Tertiary {...props} onClick={handleOnClick(props)}>
        {handleText(props)}
      </Tertiary>
    );
  }
  if (quaternary) {
    return (
      <Quaternary {...props} onClick={handleOnClick(props)}>
        {handleText(props)}
      </Quaternary>
    );
  }
  if (quinary) {
    return (
      <Quinary {...props} onClick={handleOnClick(props)}>
        {handleText(props)}
      </Quinary>
    );
  }
  if (facebook) {
    return (
      <Facebook {...props} onClick={handleOnClick(props)}>
        {handleText(props)}
      </Facebook>
    );
  }
  if (twitter) {
    return (
      <Twitter {...props} onClick={handleOnClick(props)}>
        {handleText(props)}
      </Twitter>
    );
  }
  if (line) {
    return (
      <Line {...props} onClick={handleOnClick(props)}>
        {handleText(props)}
      </Line>
    );
  }
  if (areaPin) {
    return (
      <AreaPin {...props} onClick={handleOnClick(props)}>
        {handleText(props)}
      </AreaPin>
    );
  }

  return (
    <Primary {...props} onClick={handleOnClick(props)}>
      {handleText(props)}
    </Primary>
  );
};
