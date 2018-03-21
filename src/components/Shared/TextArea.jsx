import styled from 'styled-components';
import { Colors, FontSizes, Dimens } from 'variables';

const TextArea = styled.textarea`
  width: 100%;
  margin-top: ${Dimens.medium}px;
  padding: ${Dimens.small2}px;
  color: ${Colors.darkGray1};
  font-size: ${FontSizes.medium}px;
  border: 1px solid ${Colors.borderGray};
  border-radius: 6px;
  outline: none;
  ${props => props.invalid && `
    border: 1px solid ${Colors.error};
  `}
`;

export default TextArea;
