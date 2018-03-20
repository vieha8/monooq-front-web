// @flow

import styled from 'styled-components';
import { Colors } from 'variables';

const Card = styled.div`
  display: ${props => (props.block ? 'block' : 'inline-block')};
  border: 1px solid ${Colors.borderGray};
  border-radius: 6px;
  overflow: hidden;
  ${props =>
    !props.noPadding &&
    `
    padding: 20px;  
  `} vertical-align: top;

  ${props =>
    props.background &&
    `
    background: ${props.background};
  `} ${props =>
      props.noBorder &&
      `
    border: none;
  `};

  ${props =>
    props.pointer &&
    `
    cursor: pointer;
  `};
`;

export default Card;
