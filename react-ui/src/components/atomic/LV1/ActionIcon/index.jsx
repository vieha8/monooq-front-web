// @flow

import React from 'react';
import styled from 'styled-components';
import { Colors } from 'variables';

const Icon = styled.i`
  font-size: ${props => props.fontSize || 20}px;
  color: ${props => props.color || Colors.lightGray1};
  ${props =>
    props.rotateY180 &&
    `
    transform: rotateY(180deg);
  `}
  ${props =>
    props.verticalTop &&
    `
    vertical-align: top;
  `}
  ${props =>
    props.verticalMiddle &&
    `
    vertical-align: middle;
  `}
  ${props =>
    props.verticalBottom &&
    `
    vertical-align: bottom;
  `}
`;

type PropTypes = {
  fontSize: number,
};

export const SearchIcon = (props: PropTypes) => (
  <Icon {...props} className="fas fa-search color-darkGray1" />
);
export const MessageIcon = (props: PropTypes) => (
  <Icon {...props} className="fas fa-comment" rotateY180 />
);
export const PictureIcon = (props: PropTypes) => <Icon {...props} className="fal fa-image" />;
export const AngleRight = (props: PropTypes) => <Icon {...props} className="fal fa-angle-right" />;
export const AngleDown = (props: PropTypes) => <Icon {...props} className="fal fa-angle-down" />;
export const CircleRight = (props: PropTypes) => (
  <Icon {...props} className="fal fa-chevron-circle-right" />
);
export const CircleDown = (props: PropTypes) => (
  <Icon {...props} className="fal fa-chevron-circle-down" />
);
export const CloseIcon = (props: PropTypes) => <Icon {...props} className="fal fa-times" />;
