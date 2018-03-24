import styled from 'styled-components';

import { FontSizes, Dimens, Colors } from 'variables';

const Caption = styled.div`
  line-height: 1.5;
  font-size: ${FontSizes.xsmall}px;
  color: ${Colors.black};
  margin-top: ${Dimens.medium2}px;
`;

export default Caption;
