// @flow

import styled from 'styled-components';
import { Colors } from 'variables';

import arrowImageUri from './drop-down-arrow.png';

const Select = styled.select`
  appearance: none;
  width: ${props => props.width || '100%'};
  height: 50px;
  padding: 9px 22px;
  font-size: 14px;
  border: 1px solid ${Colors.lightGray1};
  color: ${Colors.lightGray1};
  outline: none;
  background: ${Colors.lightGray2Bg} url(${arrowImageUri}) 95% 50% no-repeat;
`;

export default Select;
