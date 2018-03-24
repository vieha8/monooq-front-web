// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/atoms/InlineText';
import NotificationCount from 'components/atomic/atoms/NotificationCount';
import MenuItem from 'components/atomic/atoms/Menu/Item';

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
  width: 90vw;
`;

const NotificationWrapper = styled.span`
  display: table-cell;
  vertical-align: middle;
  width: 10vw;
`;

type PropTypes = {
  href: string,
  title: string,
  notificationCount: number,
}

export default (props: PropTypes) => (
  <MenuItem show>
    <MenuLink href={props.href || ''}>
      <MenuText>
        <InlineText.Small>{props.title}</InlineText.Small>
      </MenuText>
      <NotificationWrapper>
        <NotificationCount count={props.notificationCount} />
      </NotificationWrapper>
    </MenuLink>
  </MenuItem>
);
