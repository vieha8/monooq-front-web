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
  width: 100%;
`;

const NotificationWrapper = styled.span`
  display: table-cell;
  vertical-align: middle;
  width: 10vw;
`;

const LinkWrap = styled.div`
  ${props =>
    props.line &&
    `
      border-top: 1px solid ${Colors.borderGray};
    `};
  ${props =>
    props.logout &&
    `
      text-align: center;
      padding: ${Dimens.small_9}px 0px;
    `};
`;

type PropTypes = {
  props: Props,
  blank?: boolean,
  line?: boolean,
  logout?: boolean,
  href?: string,
  changePurposeEvent?: Function,
  logoutEvent?: Function,
  onClick?: Function,
  title: string,
  notificationCount?: number,
  to?: string,
};

const HyperLinkStyled = MenuLink.withComponent('a');

export default ({
  props,
  blank,
  line,
  logout,
  href,
  changePurposeEvent,
  logoutEvent,
  onClick,
  title,
  notificationCount,
  to,
}: PropTypes) =>
  blank ? (
    <MenuItem show {...props}>
      <LinkWrap line={line} logout={logout}>
        <HyperLinkStyled
          href={href || ''}
          onClick={changePurposeEvent || logoutEvent || onClick}
          target={changePurposeEvent || logoutEvent ? '' : '_blank'}
          logout={logout}
        >
          <MenuText>
            <InlineText.Base fontSize={FontSizes.small_15} color={logout && Colors.lightGray3}>
              {title}
            </InlineText.Base>
          </MenuText>
          <NotificationWrapper>
            <NotificationCount count={notificationCount} />
          </NotificationWrapper>
        </HyperLinkStyled>
      </LinkWrap>
    </MenuItem>
  ) : (
    <MenuItem show {...props}>
      <LinkWrap line={line}>
        <MenuLink to={to}>
          <MenuText>
            <InlineText.Base fontSize={FontSizes.small_15}>{title}</InlineText.Base>
          </MenuText>
          <NotificationWrapper>
            <NotificationCount count={notificationCount} />
          </NotificationWrapper>
        </MenuLink>
      </LinkWrap>
    </MenuItem>
  );
