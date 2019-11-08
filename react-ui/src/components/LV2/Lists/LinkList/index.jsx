import React from 'react';
import styled from 'styled-components';
import { mediaMin } from 'helpers/style/media-query';
import { Dimens, Colors, FontSizes } from 'variables';
import { Link } from 'react-router-dom';

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
        top: 1px;
        left: -${Dimens.small2_13}px;
        font-size: ${FontSizes.small_13}px;
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
  `};
  vertical-align: middle;
  text-decoration: none;
  &:active {
    ${props => props.color && `color: ${props.color};`}
    opacity: 0.8;
  }
  ${mediaMin.tablet`
    &:hover {
      ${props => props.color && `color: ${props.color};`}
      opacity: 0.8;
    }
  `};
`;

const StyledLink = styled(Link)`
  ${props => props.color && `color: ${props.color};`}
  ${props =>
    props.current &&
    `
    color: ${Colors.black};
    pointer-events: none;
  `};
  vertical-align: middle;
  text-decoration: none;
  &:hover {
    ${props => props.color && `color: ${props.color};`}
    opacity: 0.8;
  }
  &:active {
    ${props => props.color && `color: ${props.color};`}
    opacity: 0.8;
  }
  ${mediaMin.tablet`
    &:hover {
      ${props => props.color && `color: ${props.color};`}
      opacity: 0.8;
    }
  `};
`;

export default ({ list, landscape, color, isLinkEvent }) => (
  <List>
    {list.map((item, i) => (
      <Item key={i.toString()} landscape={landscape}>
        {isLinkEvent ? (
          <StyledLink to={item.path} color={color} current={item.current}>
            {item.text}
          </StyledLink>
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
