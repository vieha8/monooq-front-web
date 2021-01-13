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

export const SearchIcon = props => <Icon {...props} className="fas fa-search color-darkGray1" />;
export const MessageIcon = props => <Icon {...props} className="fas fa-comment" rotateY180 />;
export const OtherIcon = props => (
  <Icon {...props} className="fal fa-ellipsis-h fa-2x color-darkGray1" />
);
export const PictureIcon = props => <Icon {...props} className="fal fa-image fa-2x" />;
export const AngleRight = props => <Icon {...props} className="fal fa-angle-right" />;
export const AngleDown = props => <Icon {...props} className="fal fa-angle-down" />;
export const CircleRight = props => <Icon {...props} className="fal fa-chevron-circle-right" />;
export const CircleDown = props => <Icon {...props} className="fal fa-chevron-circle-down" />;
export const CloseIcon = props => <Icon {...props} className="fas fa-times color-white" />;
