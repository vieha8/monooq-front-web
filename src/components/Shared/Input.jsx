import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import { Colors, FontSizes, Dimens } from 'variables';

const StyledInput = styled(Input)`
  width: 100%;
  margin-top: ${Dimens.medium}px;
  color: ${Colors.darkGray1};
  font-size: ${FontSizes.medium}px;
  border: 1px solid ${Colors.borderGray};
  border-radius: 6px;
  ${props => props.hasError && `
    border: 1px solid ${Colors.error};
  `}
  input {
    outline: none !important;
    border: none !important;
  }
`;

export default StyledInput;
