import React from 'react';
import styled from 'styled-components';
import { FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';

const SectionTitle = styled.span`
  position: relative;
  display: block;
  font-size: ${FontSizes.medium2_26}px;
  font-weight: bold;
  text-align: center;
  margin-top: 0.7em;
  margin-bottom: 2em;
  &::before {
    content: '';
    position: absolute;
    display: block;
    width: 60px;
    height: 3px;
    bottom: -16px;
    left: 50%;
    -moz-transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    background-color: black;
    border-radius: 10px;
  }
  ${media.phone`
    font-size: ${FontSizes.medium1}px;
  `};
`;

export default ({ text }) => <SectionTitle>{text}</SectionTitle>;
