// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import Logo from 'components/atoms/Logo';
import SearchIcon from 'components/molecules/HeaderAction/SearchIcon';
import MessageIcon from 'components/molecules/HeaderAction/MessageIcon';
import AvatarIcon from 'components/molecules/HeaderAction/AvatarIcon';
import Anonymouse from 'components/molecules/HeaderAction/Anonymouse';
import Menu from 'components/organisms/Menu';
import { media } from 'helpers/style/media-query';
import { Colors, ZIndexes } from 'variables';

const HeightDesktop = 80;
const HeightSmp = 48;

const Container = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  border-bottom: 2px solid ${Colors.borderGray};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  height: ${HeightDesktop}px;
  ${media.phone`
    height: ${HeightSmp}px;  
  `}
  z-index: ${ZIndexes.nav};
`;

const LogoWrapper = styled.a`
  display: inline-flex;
  margin-left: 12px;
  ${media.phone`
    margin-top: 4px;
  `}
`;

const ActionWrapper = styled.div`
  display: inline-flex;
  margin-left: auto;
  margin-right: 12px;
`;

const ActionContainer = styled.div`
  display: table;
  ${media.phone`
    margin-top: 4px;
  `}
`;

const ActionCell = styled.div`
  display: table-cell;
  vertical-align: middle;
  cursor: pointer;
  &:not(:last-child) {
    padding-right: 12px;
  }
`;

const MenuWrapper = styled.div`
  position: fixed;
  top: ${HeightDesktop}px;
  width: 328px;
  ${media.phone`
    position: fixed;
    overflow: scroll;
    top: ${HeightSmp}px;
    bottom: 0;
    width: 100%;
  `}
  right: 0;
  z-index: ${ZIndexes.nav};
`;

const MenuBackground = styled.div`
  position: fixed;
  top: ${HeightDesktop}px;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
  background: rgba(255, 255, 255 ,0.6);
  z-index: ${ZIndexes.modal};
  ${media.phone`
    display: none;
  `}
`;

type PropTypes = {
  homeUri: string,
  searchUri: string,
  messageUri: string,
  messageCount: number,
  user: {
    image: string,
    name: string,
  },
  loginUri: string,
  signupUri: string,
  onClickAvatar: Function,
  onClickCloseMenu: Function,
  showMenu: boolean,
  menu: React.Element<Menu>,
}

export default (props: PropTypes) => (
  <Container>
    <Nav>
      <LogoWrapper href={props.homeUri}>
        <Logo.Header />
      </LogoWrapper>
      <ActionWrapper>
        {props.user ? (
          <ActionContainer>
            <ActionCell>
              <SearchIcon href={props.searchUri} />
            </ActionCell>
            <ActionCell>
              <MessageIcon href={props.messageUri} notificationCount={props.messageCount} />
            </ActionCell>
            <ActionCell>
              <AvatarIcon
                imageSrc={props.user.image}
                imageAlt={props.user.name}
                onClick={props.onClickAvatar}
              />
            </ActionCell>
          </ActionContainer>
        ) : (
          <Anonymouse
            loginUri={props.loginUri}
            signupUri={props.signupUri}
          />
        )}
      </ActionWrapper>
    </Nav>
    {props.showMenu && (
      <Fragment>
        <MenuBackground onClick={props.onClickCloseMenu} />
        <MenuWrapper>
          {props.menu}
        </MenuWrapper>
      </Fragment>
    )}
  </Container>
);
