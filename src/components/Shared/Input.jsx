import styled from 'styled-components';
import { Colors, FontSizes, Dimens } from 'variables';

const Input = styled.input`
  width: 100%;
  padding: ${Dimens.small2}px;
  margin-top: ${Dimens.medium}px;
  color: ${Colors.darkGray1};
  border: 1px solid ${Colors.borderGray};
  outline: none;
  font-size: ${FontSizes.small}px;
  line-height: 1.5;
  border-radius: 3px;
  background: ${Colors.lightGray1Bg};
  &:focus {
    background: ${Colors.white};
  }
  &::placeholder {
    color: ${Colors.lightGray1};
  }
  ${props => props.invalid && `
    border-color: ${Colors.error};
    background: ${Colors.white};
    color: ${Colors.darkGray1};
  `}
`;

export default Input;
