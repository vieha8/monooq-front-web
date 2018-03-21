import React from 'react';
import styled from 'styled-components';
import { FontSizes, Colors, Dimens } from 'variables';

const PaidError = styled.div`
  border: 1px solid ${Colors.error};
  color: ${Colors.error};
  padding: ${Dimens.medium}px;
  font-size: ${FontSizes.xsmall}px;
  line-height: 1.5;
`;

export default () => (
  <PaidError>
    決済エラーが発生しました。名義・カード番号・有効期限・セキュリティコードをお確かめください。
  </PaidError>
);
