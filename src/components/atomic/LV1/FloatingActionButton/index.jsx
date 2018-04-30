// @flow

import React from 'react';
import styled from 'styled-components';
import { Colors, ZIndexes } from 'variables';

const DEFAULT_SIZE = 60;
const Button = styled.div`
  cursor: pointer;
  width: ${props => props.size || DEFAULT_SIZE}px;
  height: ${props => props.size || DEFAULT_SIZE}px;
  border-radius: ${props => (props.size || DEFAULT_SIZE) / 2}px;
  background: ${Colors.white};
  z-index: ${ZIndexes.float};
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const DEFAULT_FONT_SIZE = 32;
const Icon = styled.i`
  display: table-cell;
  height: ${props => props.buttonSize || DEFAULT_SIZE}px;
  font-size: ${props => props.fontSize || DEFAULT_FONT_SIZE}px;
  color: ${props => props.color || Colors.yellow};
  margin: 0 auto;
`;

type PropTypes = {
  iconFontClass: string,
  onClick: Function,
  buttonSize?: number,
  iconSize?: number,
  iconColor?: string,
};

export default (props: PropTypes) => (
  <Button onClick={props.onClick} size={props.buttonSize}>
    <Icon
      className={props.iconFontClass}
      fontSize={props.iconSize}
      buttonSize={props.buttonSize}
      color={props.iconColor}
    />
  </Button>
);
