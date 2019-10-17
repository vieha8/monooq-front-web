// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens, Colors } from 'variables';

const List = styled.ul``;

const Item = styled.li`
  line-height: ${Dimens.medium1}px;
  position: relative;
  ${props =>
    props.landscape &&
    `
    display: inline-block;
    &:not(:first-child) {
      margin-left: ${Dimens.medium_20}px;
      &:before {
        content: '|';
        display: block;
        position: absolute;
        left: -${Dimens.small2_15}px;
      }
    }
  `};
`;

const Anchor = styled.a`
  ${props => props.color && `color: ${props.color};`}
  ${props =>
    props.current &&
    `
    color: ${Colors.black};
    pointer-events: none;
  `}
  text-decoration: none;
  :hover {
    ${props => props.color && `color: ${props.color};`}
    opacity: 0.8;
  }
`;

type PropTypes = {
  list: Array<{
    onClickItem?: Function,
    text: string,
    path: string,
    current?: boolean,
  }>,
  landscape?: boolean,
  color?: string,
  isLinkEvent?: Function,
};

export default ({ list, landscape, color, isLinkEvent }: PropTypes) => (
  <List>
    {list.map((item, i) => (
      <Item key={i.toString()} landscape={landscape}>
        {isLinkEvent ? (
          <Anchor onClick={item.onClickItem} color={color} current={item.current}>
            {item.text}
          </Anchor>
        ) : (
          <Anchor
            href={item.path}
            target={item.blank || '_self'}
            color={color}
            current={item.current}
          >
            {item.text}
          </Anchor>
        )}
      </Item>
    ))}
  </List>
);
