// @flow

import React from 'react';
import styled from 'styled-components';
import { Colors, Dimens } from 'variables';
import InlineText from 'components/atoms/InlineText';
import NotificationCount from 'components/atoms/NotificationCount';

const MenuItem = styled.li`
  display: table;
  width: 100%;
  border: 1px solid ${Colors.borderGray};
  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.1);
  }
  &:not(:last-child) {
    border-bottom: none;
  }
`;

const MenuLink = styled.a`
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  padding: 20px 16px;
`;

const MenuText = styled.span`
  display: table-cell;
  vertical-align: middle;
  width: 92%;
`;

type PropTypes = {
  href: string,
  title: string,
  notificationCount: number,
}

export default (props: PropTypes) => (
  <MenuItem>
    <MenuLink href={props.href}>
      <MenuText>
        <InlineText.Small>{props.title}</InlineText.Small>
      </MenuText>
      <NotificationCount count={props.notificationCount} />
    </MenuLink>
  </MenuItem>
);
