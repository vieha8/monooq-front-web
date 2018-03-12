// @flow

import { Colors } from 'variables';
import Primary from './Primary';

const Tertiary = Primary.extend`
  background: ${Colors.facebook};
  color: ${Colors.white};

  ${props =>
    props.disabled
      ? `
      cursor: not-allowed;
      border-color: ${Colors.lightGray1};
      color: ${Colors.lightGray1};    
    `
      : `
      &:hover {
        background: ${Colors.facebookHover};
      }
    `};
`;

export default Tertiary;
