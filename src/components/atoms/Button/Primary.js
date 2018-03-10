// @flow

import styled from 'styled-components';
import { Colors } from 'variables';

const Button = styled.div`
  width: 100%;
  max-width: 300px;
  padding: 17px 70px;
  text-align: center;
  font-size: 16px;
  color: ${Colors.white};
  background: ${Colors.brandPrimary};
  border-radius: 6px;
  cursor: pointer;

  &:focus {
    background: ${Colors.brandSecondary};
  }

  ${props =>
    props.disabled
      ? `
    background: ${Colors.lightGray1};
    cursor: not-allowed;
  `
      : `
    &:hover {
      background: ${Colors.brandTerciary};
    }
  `};
`;

export default Button;
