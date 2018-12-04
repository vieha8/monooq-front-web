// @flow

import styled, { css } from 'styled-components';
import { Colors } from 'variables';
import { media } from 'helpers/style/media-query';

const Base = styled.span`
  color: ${props => props.color || Colors.black};
  font-size: ${props => props.fontSize || 15}px;
  ${props =>
    props.bold &&
    `
    font-weight: bold;
  `};
  line-height: ${props => props.lineheight || 'normal'};
  ${props =>
    props.float &&
    css`
      float: ${props.float};
    `};
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
  ${props =>
    props.inLineBlock &&
    `
    display: inline-block;
  `};
  ${media.phone`
    ${props =>
      props.fontSizeSp &&
      css`
        font-size: ${props.fontSizeSp}px;
      `}
    ${props =>
      props.maxWidthSp &&
      css`
        max-width: ${props.maxWidthSp}px;
      `}
  `};
`;

const Strong = styled(Base.withComponent('strong'))`
  font-weight: bold;
`;

const Bold = Strong.withComponent('b');

const Del = Base.withComponent('del');

const Ins = Base.withComponent('ins');

const Small = styled(Base)`
  font-size: 14px;
`;

const Tiny = styled(Base)`
  font-size: 11px;
`;

const EmphasisSmall = styled(Base)`
  font-size: 14px;
  color: ${Colors.darkGray2};
`;

const EmphasisTiny = styled(Base)`
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
