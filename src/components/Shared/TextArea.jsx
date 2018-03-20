import styled from 'styled-components';
import { TextArea } from 'semantic-ui-react';
import { Colors, FontSizes, Dimens } from 'variables';

const StyledInput = styled(TextArea)`
  width: 100%;
  margin-top: ${Dimens.medium}px !important;
  color: ${Colors.darkGray1};
  font-size: ${FontSizes.medium}px;
  border: 1px solid ${Colors.borderGray};
  border-radius: 6px;
  ${props => props.hasError && `
    border: 1px solid ${Colors.error} !important;
  `}
  &:focus {
    border-color: ${Colors.borderGray} !important;  
    ${props => props.hasError && `
      border-color: ${Colors.error} !important;
    `}
  }
`;

export default StyledInput;
