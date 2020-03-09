import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Colors, FontSizes } from 'variables';
import { media, mediaMin } from 'helpers/style/media-query';

const Wrap = styled(Link)`
  display: inline-block;
  position: relative;
  width: 100%;
  max-width: 380px;
  height: 143px;
  font-weight: bold;
  line-height: normal;
  text-decoration: none;
  color: ${Colors.black};
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  ${mediaMin.tablet`
    ${props =>
      !props.disabled &&
      `
        &:hover {
          cursor: pointer;
          opacity: 0.8;
        }
      `};
  `};
`;

const TitleWrap = styled.div`
  position: absolute;
  top: calc(50% - 20px);
  left: 0;
  right: 0;
  text-align: center;
  ${props =>
    props.type === 'howto' &&
    `
      top: auto;
      right: 16px;
      bottom: 10px;
      text-align: right;
    `};
  ${props =>
    props.type === 'qa' &&
    `
      top: auto;
      left: 16px;
      top: 12px;
      text-align: left;
    `};
`;

const TitleSub = styled.div`
  font-size: ${FontSizes.small}px;
`;

const TitleMain = styled.div`
  font-size: ${FontSizes.medium2_26}px;
`;

export default ({ titleSub, titleMain, link, type, bgImage }) => (
  <Wrap to={link} bgImage={bgImage}>
    <TitleWrap type={type}>
      <TitleSub>{titleSub}</TitleSub>
      <TitleMain>{titleMain}</TitleMain>
    </TitleWrap>
  </Wrap>
);
