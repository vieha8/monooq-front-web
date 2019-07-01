// @flow

import React from 'react';
import styled from 'styled-components';
import { Colors, FontSizes } from 'variables';

const NoticeCountWrap = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
  vertical-align: top;
  border-radius: 4px;
  width: 31px;
  height: 24px;
  color: ${Colors.white};
  background: ${Colors.brandPrimary};
`;

const NoticeCount = styled.div`
  font-size: ${FontSizes.small_12}px;
  line-height: normal;
`;

type PropTypes = {
  count: number,
};

export default ({ count }: PropTypes) =>
  count > 0 && (
    <NoticeCountWrap>
      <NoticeCount>{count}</NoticeCount>
    </NoticeCountWrap>
  );
