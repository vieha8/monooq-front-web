import styled from 'styled-components';
import { Colors } from 'variables';

import arrowImage from './drop-down-arrow.png';

const Select = styled.select`
  appearance: none;
  width: ${props => props.width || '100%'};
  height: 50px;
  padding: 9px 15px;
  font-size: 14px;
  border: 1px solid ${Colors.lightGray1};
  color: ${Colors.black};
  outline: none;
  background: ${Colors.lightGray2Bg} url(${arrowImage}) 95% 50% no-repeat;
  background-size: 10px 8px;
  &:focus {
    border-color: ${Colors.brandPrimary};
  }
`;

export default Select;
