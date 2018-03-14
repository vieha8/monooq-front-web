// @flow

import styled from 'styled-components';
import { Colors } from 'variables';

const Base = styled.span`
  color: ${props => props.color || Colors.black};
  font-size: ${props => props.fontSize || 16}px;
  line-height: 1.6;
  ${props =>
    props.verticalTop &&
    `
    vertical-align: top;
  `} ${props =>
      props.verticalMiddle &&
      `
    vertical-align: middle;
  `} ${props =>
      props.verticalBottom &&
      `
    vertical-align: bottom;
  `};
`;

const Strong = Base.withComponent('strong').extend`
  font-weight: bold;
`;

const Bold = Strong.withComponent('b');

const Del = Base.withComponent('del');

const Ins = Base.withComponent('ins');

const Small = Base.extend`
  font-size: 12px;
`;

const Emphasis = Base.extend`
  font-size: 11px;
  color: ${Colors.darkGray2};
`;

export default {
  Base,
  Strong,
  Bold,
  Del,
  Ins,
  Small,
  Emphasis,
};
