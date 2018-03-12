// @flow

import React from 'react';
import styled from 'styled-components';
import { Colors, Dimens } from 'variables';

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
  color: ${Colors.darkGray2};
  font-size: 14px;
  width: 92%;
`;

const NoticeCountCircle = styled.span`
  display: table-cell;
  font-size: 20px;
`;

type NoticePropTypes = {
  count: number,
}

const NoticeCount = (props: NoticePropTypes) => (
  (props.count > 0 &&
    <NoticeCountCircle className="fa-layers fa-fw">
      <i className="fas fa-circle" style={{ color: Colors.brandPrimary }} />
      <span className="fa-layers-text fa-inverse" data-fa-transform="shrink-9">
        {props.count}
      </span>
    </NoticeCountCircle>)
);

type PropTypes = {
  href: string,
  title: string,
  notificationCount: number,
}

export default (props: PropTypes) => (
  <MenuItem>
    <MenuLink href={props.href}>
      <MenuText>{props.title}</MenuText><NoticeCount count={props.notificationCount} />
    </MenuLink>
  </MenuItem>
);
