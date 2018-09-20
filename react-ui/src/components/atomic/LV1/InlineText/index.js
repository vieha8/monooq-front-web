// @flow

import styled, { css } from 'styled-components';
import { Colors } from 'variables';
import { media } from 'helpers/style/media-query';

const Base = styled.span`
  color: ${props => props.color || Colors.black};
  font-size: ${props => props.fontSize || 16}px;
  line-height: 1.6;
  white-space: pre-wrap;
  ${props =>
    props.verticalTop &&
    css`
      vertical-align: top;
    `} ${props =>
  props.verticalMiddle &&
  css`
    vertical-align: middle;
  `} ${props =>
  props.verticalBottom &&
  css`
    vertical-align: bottom;
  `};
  ${props =>
    props.singleLine &&
    `
    width: 100%;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `};
  ${media.phone`
    ${props =>
      props.fontSizeSp &&
      css`
        font-size: ${props.fontSizeSp}px;
      `}
  `};
`;

const Strong = Base.withComponent('strong').extend`
  font-weight: bold;
`;

const Bold = Strong.withComponent('b');

const Del = Base.withComponent('del');

const Ins = Base.withComponent('ins');

const Small = Base.extend`
  font-size: 14px;
`;

const Tiny = Base.extend`
  font-size: 11px;
`;

const EmphasisSmall = Base.extend`
  font-size: 14px;
  color: ${Colors.darkGray2};
`;

const EmphasisTiny = Base.extend`
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
  Tiny,
  EmphasisSmall,
  EmphasisTiny,
};
