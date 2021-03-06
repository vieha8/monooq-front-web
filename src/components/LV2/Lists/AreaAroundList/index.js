import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { media, mediaMin } from 'helpers/style/media-query';
import { Dimens, FontSizes, Colors } from 'variables';
import Button from 'components/LV1/Forms/Button';

const Wrap = styled.div``;

const Caption = styled.div`
  font-size: ${FontSizes.small}px;
  font-weight: bold;
  line-height: normal;
  ${props =>
    props.captionColor &&
    `
      color: ${props.captionColor};    
  `};
`;

const AreaPinList = styled.ul`
  width: 100%;
  white-space: normal;
  padding: ${Dimens.small2}px 0 ${Dimens.small2_15}px;
  ${props =>
    !props.isNoScroll &&
    `
      white-space: nowrap;
      overflow-x: auto;
      padding: ${Dimens.small2}px ${Dimens.xxsmall}px ${Dimens.small2_15}px;
      ::-webkit-scrollbar-track {
        background-color: ${Colors.lightGray7};
      }
      ::-webkit-scrollbar-thumb {
        background-color: ${Colors.lightGray6};
      }
  `};
`;

const Item = styled.li`
  width: fit-content;
  position: relative;
  display: inline-block;
  font-size: ${FontSizes.small}px;
  line-height: normal;
  color: ${Colors.black2};
  &:not(:first-child) {
    margin-left: ${Dimens.small_11}px;
  }
  ${props =>
    props.isNoScroll &&
    `
      margin-top: ${Dimens.small}px;
      margin-left: ${Dimens.small_11}px;
  `};

  ${media.tablet`
    &:not(:first-child) {
      margin-left: ${Dimens.small}px;
    }
    ${props =>
      props.isNoScroll &&
      `
        margin-top: ${Dimens.small}px;
        margin-left: ${Dimens.small}px;
    `};
  `};
`;

const LinkStyled = styled(Link)`
  line-height: ${Dimens.medium_20}px;
  color: ${Colors.lightGray3};
  &:active {
    color: ${Colors.lightGray3};
    opacity: 0.8;
  }
  ${mediaMin.tablet`
    &:hover {
      color: ${Colors.lightGray3};
      opacity: 0.8;
    }
  `};
`;

export default ({ captionColor, areaAroundList, isNoScroll }) => (
  <Wrap>
    <Caption captionColor={captionColor}>周辺エリアで探す</Caption>
    <AreaPinList isNoScroll={isNoScroll}>
      {areaAroundList.map((item, i) => (
        <Item key={i.toString()} isNoScroll={isNoScroll}>
          <LinkStyled
            href={item.link}
            color={Colors.lightGray3}
            rel={item.count < 5 ? 'nofollow' : ''}
          >
            <a>
              <Button quaternary circle height={30} fontSize={14} lineheight={6}>
                {item.text}
              </Button>
            </a>
          </LinkStyled>
        </Item>
      ))}
    </AreaPinList>
  </Wrap>
);
