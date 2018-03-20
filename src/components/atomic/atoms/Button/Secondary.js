// @flow

import { Colors } from 'variables';
import Primary from './Primary';

const Secondary = Primary.extend`
  background: ${Colors.white};
  border: 1px solid ${Colors.brandPrimary};
  color: ${Colors.brandPrimary};

  ${props =>
    props.disabled
      ? `
    cursor: not-allowed;
    border-color: ${Colors.lightGray1};
    color: ${Colors.lightGray1};    
  `
      : `
    &:hover {
      background: ${Colors.white};
      border-color: ${Colors.brandTerciary};
      color: ${Colors.brandTerciary};
    }
  `};
`;

export default Secondary;
