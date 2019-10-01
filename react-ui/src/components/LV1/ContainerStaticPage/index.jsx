// @flow

import styled from 'styled-components';
import { Dimens } from 'variables';

const Container = styled.div`
  margin: ${Dimens.huge}px auto 0;
  ${props =>
    !props.maxWidth &&
    `
      max-width: 768px;
    `}
`;

export default Container;
