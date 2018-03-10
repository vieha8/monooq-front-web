// @flow

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  &:before {
    content: '';
    display: block;
    padding-top: 56.25%;
  }
`;

const Image16x9 = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
`;

type PropTypes = {
  src: string,
  alt: string,
};

export default (props: PropTypes) => (
  <Wrapper>
    <Image16x9 {...props} />
  </Wrapper>
);
