// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
import NotificationCount from 'components/atomic/LV1/NotificationCount';
import MenuItem from 'components/atomic/LV1/Menu/Item';

const MenuLink = styled(Link)`
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
  onClick?: Function,
};

export default (props: PropTypes) => (
  <MenuItem show>
    <MenuLink to={props.href || ''} onClick={props.onClick}>
      <MenuText>
        <InlineText.Small>{props.title}</InlineText.Small>
      </MenuText>
      <NotificationWrapper>
        <NotificationCount count={props.notificationCount} />
      </NotificationWrapper>
    </MenuLink>
  </MenuItem>
);
