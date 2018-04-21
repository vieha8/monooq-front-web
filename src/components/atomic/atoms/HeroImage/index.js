// @flow

import styled from 'styled-components';

const HeroImage = styled.img`
  width: 100%;
  ${props =>
    props.large &&
    `
    max-width: 608px;
    max-height: 376px;
  `} ${props =>
  props.medium &&
  `
    max-width: 320px;
    max-height: 198px;
  `} ${props =>
  props.small &&
  `
    max-width: 104px;
    max-height: 79px;
  `} border-radius: 6px;

  ${props =>
    props.height &&
    `
    height: ${props.height}px;
  `};
  object-fit: cover;
`;

export default HeroImage;
