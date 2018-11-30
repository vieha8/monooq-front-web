// @flow

import styled from 'styled-components';

const DEFAULT_SIZE = 64;
const AvaterImage = styled.img`
  width: ${props => props.size || DEFAULT_SIZE}px;
  height: ${props => props.size || DEFAULT_SIZE}px;
  border-radius: ${props => (props.size || DEFAULT_SIZE) / 2}px;
  object-fit: cover;
  vertical-align: middle;
`;

export default AvaterImage;
