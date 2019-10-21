// @flow

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Dimens, FontSizes, Colors } from 'variables';

const Wrap = styled.nav``;
const WrapPre = styled.ol``;

const Item = styled.li`
  width: 100%;
  position: relative;
  display: inline;
  font-size: ${FontSizes.small_15}px;
  line-height: normal;
  color: ${Colors.black2};
  &:not(:first-child) {
    margin-left: ${Dimens.medium_20}px;
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: calc(50% - 3px);
      left: -${Dimens.medium}px;
      width: 8px;
      height: 8.25px;
      border-top: 1px solid ${Colors.black2};
      border-right: 1px solid ${Colors.black2};
      transform: rotate(45deg);
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
