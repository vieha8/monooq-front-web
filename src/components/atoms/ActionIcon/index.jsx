// @flow

import React from 'react';
import styled from 'styled-components';
import { Colors } from 'variables';

const Icon = styled.i`
  font-size: ${props => props.fontSize || 20}px;
  color: ${Colors.lightGray1};
  ${props => props.rotateY180 && `
    transform: rotateY(180deg);
  `}
`;

type PropTypes = {
  fontSize: number,
}

export const SearchIcon = (props: PropTypes) => <Icon {...props} className="fal fa-search" />;
export const MessageIcon = (props: PropTypes) => <Icon {...props} className="fas fa-comment" rotateY180 />;
