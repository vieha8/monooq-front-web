import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Dimens, FontSizes, Colors } from 'variables';

const Wrap = styled.nav``;
const WrapPre = styled.ol``;

const Item = styled.li`
  position: relative;
  display: inline-block;
  font-size: ${FontSizes.small_15}px;
  line-height: normal;
  color: ${props => (props.fontColor ? props.fontColor : Colors.black2)};
  &:not(:first-child) {
    margin-left: ${Dimens.medium1}px;
    &:before {
      ${props =>
        props.separatorLandscape
          ? `
            content: '|';
            font-size: ${FontSizes.medium}px;
            `
          : `
            content: '>';
            font-size: ${FontSizes.medium_18}px;
            `};
      display: block;
      position: absolute;
      left: -${Dimens.medium_17}px;
      top: -2px;
      color: ${Colors.black};
    }
  }
`;

const LinkStyled = styled.a`
  line-height: ${Dimens.medium_20}px;
  color: ${Colors.lightGray3};
  &:hover {
    color: ${Colors.lightGray3};
    opacity: 0.8;
  }
  &:active {
    color: ${Colors.lightGray3};
    opacity: 0.8;
  }
`;

export default ({ breadcrumbsList, separatorLandscape, fontColor }) => (
  <Wrap>
    <WrapPre>
      {breadcrumbsList.map((item, i) => (
        <Item key={i.toString()} separatorLandscape={separatorLandscape} fontColor={fontColor}>
          {item.link ? (
            <Link href={item.link} passHref>
              <LinkStyled color={Colors.lightGray3}>{item.text}</LinkStyled>
            </Link>
          ) : (
            item.text
          )}
        </Item>
      ))}
    </WrapPre>
  </Wrap>
);
