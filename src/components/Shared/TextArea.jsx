import styled from 'styled-components';
import { Colors, FontSizes, Dimens } from 'variables';

const TextArea = styled.textarea`
  width: 100%;
  margin-top: ${Dimens.medium}px;
  padding: ${Dimens.small2}px;
  color: ${Colors.darkGray1};
  font-size: ${FontSizes.small}px;
  line-height: 1.5;
  border: 1px solid ${Colors.borderGray};
  border-radius: 3px;
  outline: none;
  background: ${Colors.lightGray1Bg};
  &:focus {
    background: ${Colors.white};
  }
  &::placeholder {
    color: ${Colors.lightGray1};
  }
  ${props => props.invalid && `
    border: 1px solid ${Colors.error};
  `}
`;

export default TextArea;
