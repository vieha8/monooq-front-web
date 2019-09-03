// @flow

import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Colors } from 'variables';

const Card = styled.div`
  width: 100%;
  display: ${props => (props.block ? 'block' : 'inline-block')};
  background-color: ${Colors.white};
  border: 1px solid ${Colors.borderGray};
  border-radius: 4px;
  overflow: hidden;
  ${props =>
    !props.noPadding &&
    `
    padding: 20px;  
  `};
  ${props =>
    props.isPadding &&
    `
    padding: ${props.isPadding}px;
  `};
  vertical-align: middle;

  ${props =>
    props.background &&
    `
    background: ${props.background};
  `} ${props =>
    props.noBorder &&
    `
    border: none;
  `};

  ${media.tablet`
    ${props =>
      props.noBorderPhone &&
      `
      border: none;
    `}
  `};

  ${props =>
    props.pointer &&
    `
    cursor: pointer;
  `} ${props =>
    props.customStyle &&
    `
    ${props.customStyle}
  `};

  ${media.phone`
    ${props =>
      props.customStylePhone &&
      `
      ${props.customStylePhone}
    `}
  `};
`;

export default Card;
