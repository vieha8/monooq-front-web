import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes, Colors } from 'variables';
import { media } from 'helpers/style/media-query';
import Button from 'components/LV1/Forms/Button';

const Wrap = styled.div`
  position: relative;
  max-width: 440px;
  margin: auto;
  ${props =>
    !props.isNoArrow &&
    `
      &:after {
        position: absolute;
        top: 50%;
        right: ${Dimens.medium2}px;
        display: block;
        content: '';
        width: ${Dimens.small2}px;
        height: ${Dimens.small2}px;
        margin-top: -${Dimens.xsmall}px;
        border-top: ${Dimens.xxsmall_4}px solid ${Colors.white};
        border-right: ${Dimens.xxsmall_4}px solid ${Colors.white};
        transform: rotate(45deg);
      }
    `};
  ${media.phone`
    ${props =>
      !props.isNoArrow &&
      `
        &:after {
          right: ${Dimens.medium_20}px;
        }
      `};
  `}
`;

const CaptionWrap = styled.span`
  vertical-align: top;
  padding: ${Dimens.xsmall}px;
  margin: auto ${Dimens.small2}px auto -${Dimens.medium2}px;
  font-size: ${FontSizes.small_12}px;
  background-color: ${Colors.white};
  color: ${Colors.black};
`;

export default ({ caption, text, onClick, link, href, isNoArrow }) => (
  <Wrap isNoArrow={isNoArrow}>
    <Button
      center
      primary
      fontbold
      fill={1}
      height={72}
      heightSp={60}
      fontSize={24}
      lineheight={46}
      lineheightSp={34}
      onClick={onClick}
      link={link}
      href={href}
    >
      <CaptionWrap>{caption}</CaptionWrap>
      {text}
    </Button>
  </Wrap>
);
