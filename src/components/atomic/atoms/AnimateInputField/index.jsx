// @flow

import styled from 'styled-components';
import { Colors } from 'variables';

const InputField = styled.input`
  @keyframes show {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
  background: rgba(0,0,0,0);
  outline: none;
  height: 32px;
  width: 0;
  border: none;
  font-size: 16px;
  line-height: 1.5;
  padding: 0 12px;
  ${props => props.show && `
    animation show 0.5s ease 0s;
    animation-fill-mode: forwards;
    width: 100%;
    border-bottom: 1px solid ${Colors.borderGray};
  `}
`;

export default InputField;
