// @flow

import styled from 'styled-components';

const Container = styled.div`
  &:after {
    clear: both;
    content: '';
    display: block;
  }
`;

export default Container;
