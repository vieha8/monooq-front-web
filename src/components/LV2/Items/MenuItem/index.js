import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import NotificationCount from 'components/LV1/NotificationCount';
import MenuItem from 'components/LV1/MenuItem';
import InlineText from 'components/LV1/Texts/InlineText';
import { Dimens, FontSizes, Colors } from 'variables';

const MenuLink = styled.div`
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

export default ({
  blank,
  line,
  logout,
  href,
  logoutEvent,
  onClick,
  title,
  notificationCount,
  to,
  header,
}) =>
  blank ? (
    <MenuItem logout={logout}>
      <LinkWrap line={line} logout={logout}>
        <Link href={href || ''}>
          <MenuLink
            as="a"
            onClick={logoutEvent || onClick}
            target={logoutEvent ? '' : '_blank'}
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
          </MenuLink>
        </Link>
      </LinkWrap>
    </MenuItem>
  ) : header ? (
    <MenuItem header={header}>
      <MenuText>
        <InlineText.Base fontSize={FontSizes.small_12} color={Colors.darkGray3}>
          {title}
        </InlineText.Base>
      </MenuText>
    </MenuItem>
  ) : (
    <MenuItem>
      <LinkWrap line={line}>
        <MenuLink as={Link} href={to} onClick={onClick}>
          <a>
            <MenuText>
              <InlineText.Base fontSize={FontSizes.small}>{title}</InlineText.Base>
            </MenuText>
            <NotificationWrapper>
              <NotificationCount count={notificationCount} />
            </NotificationWrapper>
          </a>
        </MenuLink>
      </LinkWrap>
    </MenuItem>
  );
