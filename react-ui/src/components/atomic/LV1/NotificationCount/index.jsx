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
  border-radius: 50%;
  width: 22px;
  height: 22px;
  color: ${Colors.white};
  background: ${Colors.brandPrimary};
`;

const NoticeCount = styled.div`
  font-size: ${FontSizes.small_12}px;
  line-height: normal;
`;

type PropTypes = {
  count: number,
  fontSize?: number,
};

export default (props: PropTypes) =>
  props.count > 0 && (
    <NoticeCountWrap>
      <NoticeCount>{props.count}</NoticeCount>
    </NoticeCountWrap>
  );
