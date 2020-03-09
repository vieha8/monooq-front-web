import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Dimens, Colors, FontSizes } from 'variables';
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
  &:nth-child(2) {
    margin: 0 ${Dimens.small2}px;
  }

  ${mediaMin.tablet`
    ${props =>
      !props.disabled &&
      `
        &:hover {
          cursor: pointer;
          opacity: 0.8;
          color: ${Colors.black};
        }
      `};
  `};

  ${media.tablet`
    max-width: 100%;
    &:nth-child(2) {
      margin: auto;
    }
    margin: ${Dimens.small2}px auto;
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
  ${media.tablet1`
    font-size: ${FontSizes.medium1_22}px;
  `};
`;

export default ({ link, bgImage, type, titleSub, titleMain }) => (
  <Wrap to={link} bgImage={bgImage}>
    <TitleWrap type={type}>
      <TitleSub>{titleSub}</TitleSub>
      <TitleMain>{titleMain}</TitleMain>
    </TitleWrap>
  </Wrap>
);
