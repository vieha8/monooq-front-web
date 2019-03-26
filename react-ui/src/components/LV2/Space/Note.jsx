// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/LV1/InlineText';

const Caption = styled.div`
  text-align: center;
`;

type PropTypes = {
  onClick: Function,
  loading: boolean,
  disabled: boolean,
};

export default (props: PropTypes) => (
  <div>
    <Caption>
      <InlineText.EmphasisTiny>
        ※お支払いは各種クレジットカード決済・銀行振込に対応しています。
      </InlineText.EmphasisTiny>
    </Caption>
  </div>
);
