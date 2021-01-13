import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  &:before {
    content: '';
    display: block;
  }
`;

const Image16x9 = styled.img`
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
`;

export default ({ src, alt }) => (
  <Wrapper>
    <Image16x9 src={src} alt={alt} />
  </Wrapper>
);
