// @flow

import React from 'react';
import styled from 'styled-components';
import { Colors } from 'variables';

const NoticeCountCircle = styled.span`
  display: table-cell;
  font-size: ${props => props.fontSize}px;
`;

type PropTypes = {
  count: number,
  fontSize?: number,
};

export default (props: PropTypes) =>
  props.count > 0 && (
    <NoticeCountCircle className="fa-layers fa-fw" fontSize={props.fontSize}>
      <i className="fas fa-circle" style={{ color: Colors.brandPrimary }} />
      <span className="fa-layers-text fa-inverse" data-fa-transform="shrink-9">
        {props.count}
      </span>
    </NoticeCountCircle>
  );
