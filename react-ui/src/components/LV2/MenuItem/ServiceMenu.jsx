// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import InlineText from 'components/LV1/InlineText';
import NotificationCount from 'components/LV1/NotificationCount';
import MenuItem from 'components/LV1/Menu/Item';
import { Dimens, FontSizes, Colors } from 'variables';

const MenuLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  padding: ${Dimens.medium}px 0;
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
  line?: boolean,
  onClick?: Function,
};

const MenuLinkStyled = styled(MenuLink)`
  ${props =>
    props.line &&
    `
      border-top: 1px solid ${Colors.borderGray};
    `};
`;

const HyperLinkStyled = styled(MenuLink.withComponent('a'))`
  ${props =>
    props.line &&
    `
      border-top: 1px solid ${Colors.borderGray};
    `};
`;

export default (props: PropTypes) =>
  props.blank ? (
    <MenuItem show {...props}>
      <HyperLinkStyled
        href={props.href || ''}
        onClick={props.onClick}
        target="_blank"
        line={props.line}
      >
        <MenuText>
          <InlineText.Base fontSize={FontSizes.small_15}>{props.title}</InlineText.Base>
        </MenuText>
        <NotificationWrapper>
          <NotificationCount count={props.notificationCount} />
        </NotificationWrapper>
      </HyperLinkStyled>
    </MenuItem>
  ) : (
    <MenuItem show {...props}>
      <MenuLinkStyled to={props.to} line={props.line}>
        <MenuText>
          <InlineText.Base fontSize={FontSizes.small_15}>{props.title}</InlineText.Base>
        </MenuText>
        <NotificationWrapper>
          <NotificationCount count={props.notificationCount} />
        </NotificationWrapper>
      </MenuLinkStyled>
    </MenuItem>
  );
