import styled, { css } from 'styled-components';
import { Colors, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';

const Base = styled.span`
  color: ${props => props.color || Colors.black};
  font-size: ${props => props.fontSize || 15}px;
  ${props =>
    props.bold &&
    `
    font-weight: bold;
  `};
  ${props =>
    props.nobold &&
    `
    font-weight: normal;
  `};
  line-height: ${props => props.lineheight || 'normal'};
  ${props =>
    props.float &&
    css`
      float: ${props.float};
    `};
  ${props => (props.whiteSpaceNormal ? `white-space: normal;` : `white-space: pre-wrap;`)};
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
  ${props =>
    props.margin &&
    css`
      display: inline-block;
      margin: ${props.margin};
    `};
    ${props =>
      props.lineClamp &&
      css`
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: ${props.lineClamp};
        overflow: hidden;
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
  font-size: ${FontSizes.small}px;
`;

const Tiny = styled(Base)`
  font-size: ${FontSizes.small_12}px;
`;

const EmphasisSmall = styled(Base)`
  font-size: ${FontSizes.small}px;
  color: ${Colors.darkGray2};
`;

const EmphasisTiny = styled(Base)`
  font-size: ${FontSizes.small_12}px;
  color: ${Colors.darkGray2};
`;

const H1 = Base.withComponent('h1');

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
  H1,
};
