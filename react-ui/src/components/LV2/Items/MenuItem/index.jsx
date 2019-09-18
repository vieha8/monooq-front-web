// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NotificationCount from 'components/LV1/NotificationCount';
import MenuItem from 'components/LV1/MenuItem';
import InlineText from 'components/LV1/Texts/InlineText';
import { Dimens, FontSizes, Colors } from 'variables';

const MenuLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  padding: ${Dimens.medium}px 0 ${Dimens.medium}px ${Dimens.medium_20}px;
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
  font-size: ${FontSizes.small}px;
  font-weight: 500;
  line-height: 100%;
  ${props =>
    props.line &&
    `
      border-top: 1px solid ${Colors.borderGray};
    `};
  ${props =>
    props.logout &&
    `
      text-align: center;
    `};
`;

type PropTypes = {
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
    <MenuItem>
      <LinkWrap line={line} logout={logout}>
        <HyperLinkStyled
          href={href || ''}
          onClick={changePurposeEvent || logoutEvent || onClick}
          target={changePurposeEvent || logoutEvent ? '' : '_blank'}
          logout={logout}
        >
          <MenuText>
            <InlineText.Base fontSize={FontSizes.small} color={logout && Colors.lightGray3}>
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
    <MenuItem>
      <LinkWrap line={line}>
        <MenuLink to={to} onClick={onClick}>
          <MenuText>
            <InlineText.Base fontSize={FontSizes.small}>{title}</InlineText.Base>
          </MenuText>
          <NotificationWrapper>
            <NotificationCount count={notificationCount} />
          </NotificationWrapper>
        </MenuLink>
      </LinkWrap>
    </MenuItem>
  );
