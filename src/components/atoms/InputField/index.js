// @flow

import styled from 'styled-components';
import { Colors } from 'variables';

const InputField = styled.input`
  width: ${props => props.width || '100%'};
  padding: 18px 25px;
  font-size: 14px;
  border: 1px solid ${Colors.lightGray1};
  border-radius: 6px;
  color: ${Colors.lightGray1};
  outline: none;
  background: ${Colors.lightGray2Bg};

  &:focus {
    border-color: ${Colors.brandPrimary};
    background: ${Colors.white};
    color: ${Colors.black};
  }

  ${props =>
    props.error &&
    `
    color: ${Colors.red};
    border-color: ${Colors.error};
    background: ${Colors.white};
  `} :disabled {
    cursor: not-allowed;
  }
`;

export default InputField;
