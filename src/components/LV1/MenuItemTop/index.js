import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Dimens, Colors, FontSizes } from 'variables';
import { media, mediaMin } from 'helpers/style/media-query';

const Wrap = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  max-width: 380px;
  height: 143px;
  font-weight: bold;
  line-height: normal;
  text-decoration: none;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  &:nth-child(2) {
    margin: 0 ${Dimens.small2}px;
  }
  &:active {
    opacity: 0.8;
  }

  ${mediaMin.tablet`
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  `};

  ${media.tablet`
    max-width: 100%;
    &:nth-child(2) {
      margin: auto;
    }
    margin: ${Dimens.small2}px auto;
  `};
`;

const LinkStyled = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  color: ${Colors.black} !important;
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

const getTitle = (type, titleSub, titleMain) => {
  return (
    <TitleWrap type={type}>
      <TitleSub>{titleSub}</TitleSub>
      <TitleMain>{titleMain}</TitleMain>
    </TitleWrap>
  );
};

export default ({ link, bgImage, type, titleSub, titleMain, isLinkBlank }) => (
  <Wrap bgImage={bgImage}>
    {isLinkBlank ? (
      <Link href={link} passHref>
        <LinkStyled as="a" target="_blank" rel="noopener noreferrer">
          {getTitle(type, titleSub, titleMain)}
        </LinkStyled>
      </Link>
    ) : (
      <LinkStyled as={Link} href={link} passHref>
        <a>{getTitle(type, titleSub, titleMain)}</a>
      </LinkStyled>
    )}
  </Wrap>
);
