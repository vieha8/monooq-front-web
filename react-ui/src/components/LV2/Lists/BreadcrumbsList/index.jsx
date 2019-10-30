// @flow

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Dimens, FontSizes, Colors } from 'variables';

const Wrap = styled.nav``;
const WrapPre = styled.ol``;

const Item = styled.li`
  position: relative;
  display: inline;
  font-size: ${FontSizes.small_15}px;
  line-height: normal;
  color: ${Colors.black2};
  &:not(:first-child) {
    margin-left: ${Dimens.medium1}px;
    &:before {
      content: '>';
      display: block;
      position: absolute;
      font-size: ${FontSizes.medium_18}px;
      top: -2px;
      left: -${Dimens.medium_17}px;
    }
  }
`;

const LinkStyled = styled(Link)`
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

export type PropTypes = {
  breadcrumbsList: Array<{
    text: string,
    link?: string,
  }>,
};

export default ({ breadcrumbsList }: PropTypes) => (
  <Wrap>
    <WrapPre>
      {breadcrumbsList.map((item, i) => (
        <Item key={i.toString()}>
          {item.link ? (
            <LinkStyled to={item.link} color={Colors.lightGray3}>
              {item.text}
            </LinkStyled>
          ) : (
            item.text
          )}
        </Item>
      ))}
    </WrapPre>
  </Wrap>
);
