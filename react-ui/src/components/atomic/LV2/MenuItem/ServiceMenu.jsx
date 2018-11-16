// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
import NotificationCount from 'components/atomic/LV1/NotificationCount';
import MenuItem from 'components/atomic/LV1/Menu/Item';
import { Dimens } from 'variables';

const MenuLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  padding: ${Dimens.medium}px 10px;
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

const HyperLink = MenuLink.withComponent('a');

export default (props: PropTypes) =>
  props.blank ? (
    <MenuItem show {...props}>
      <HyperLink href={props.href || ''} onClick={props.onClick} target="_blank">
        <MenuText>
          <InlineText.Small>{props.title}</InlineText.Small>
        </MenuText>
        <NotificationWrapper>
          <NotificationCount count={props.notificationCount} />
        </NotificationWrapper>
      </HyperLink>
    </MenuItem>
  ) : (
    <MenuItem show {...props}>
      <HyperLink href={props.href || ''} onClick={props.onClick}>
        <MenuText>
          <InlineText.Small>{props.title}</InlineText.Small>
        </MenuText>
        <NotificationWrapper>
          <NotificationCount count={props.notificationCount} />
        </NotificationWrapper>
      </HyperLink>
    </MenuItem>
  );
