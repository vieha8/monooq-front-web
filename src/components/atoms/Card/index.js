// @flow

import styled from 'styled-components';
import { Colors } from 'variables';

const Card = styled.div`
  display: ${props => (props.block ? 'block' : 'inline-block')};
  border: 1px solid ${Colors.borderGray};
  border-radius: 6px;
  padding: 20px;
  vertical-align: top;
`;

export default Card;
