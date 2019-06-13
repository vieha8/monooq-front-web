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
  href: string,
  title: string,
  notificationCount: number,
  line?: boolean,
  onClick?: Function,
  logoutEvent?: Function,
};

const HyperLinkStyled = MenuLink.withComponent('a');

export default (props: PropTypes) =>
  props.blank ? (
    <MenuItem show {...props}>
      <LinkWrap line={props.line} logout={props.logout}>
        <HyperLinkStyled
          href={props.href || ''}
          onClick={props.logoutEvent || props.onClick}
          target={props.logoutEvent ? '' : '_blank'}
          logout={props.logout}
        >
          <MenuText>
            <InlineText.Base
              fontSize={FontSizes.small_15}
              color={props.logout && Colors.lightGray3}
            >
              {props.title}
            </InlineText.Base>
          </MenuText>
          <NotificationWrapper>
            <NotificationCount count={props.notificationCount} />
          </NotificationWrapper>
        </HyperLinkStyled>
      </LinkWrap>
    </MenuItem>
  ) : (
    <MenuItem show {...props}>
      <LinkWrap line={props.line}>
        <MenuLink to={props.to}>
          <MenuText>
            <InlineText.Base fontSize={FontSizes.small_15}>{props.title}</InlineText.Base>
          </MenuText>
          <NotificationWrapper>
            <NotificationCount count={props.notificationCount} />
          </NotificationWrapper>
        </MenuLink>
      </LinkWrap>
    </MenuItem>
  );
