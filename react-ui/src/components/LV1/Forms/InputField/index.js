import styled, { css } from 'styled-components';
import { Colors, FontSizes } from 'variables';

const InputField = styled.input`
  width: ${props => props.width || '100%'};
  padding: 14px 15px;
  box-sizing: border-box;
  font-size: ${FontSizes.small_15}px;
  line-height: normal;
  border: 1px solid ${Colors.lightGray1};
  border-radius: 3px;
  color: ${Colors.black};
  outline: none;
  background: ${Colors.white};
  -webkit-appearance: none;

  &:placeholder-shown {
    color: ${Colors.lightGray3};
  }

  &:focus {
    border-color: ${Colors.brandPrimary};
    background: ${Colors.white};
    color: ${Colors.black};
  }

  &:disabled {
    cursor: not-allowed;
  }

  ${props =>
    props.disabled &&
    `
      background-color: ${Colors.disabled2};
    `};

  ${props =>
    props.error &&
    css`
      color: ${Colors.red};
      border-color: ${Colors.error};
      background: ${Colors.white};
    `};
`;

export default InputField;
