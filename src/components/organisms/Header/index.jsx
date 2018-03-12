// @flow

import React from 'react';
import styled from 'styled-components';
import Logo from 'components/atoms/Logo';
import SearchIcon from 'components/molecules/HeaderAction/SearchIcon';
import MessageIcon from 'components/molecules/HeaderAction/MessageIcon';
import AvatarIcon from 'components/molecules/HeaderAction/AvatarIcon';
import Anonymouse from 'components/molecules/HeaderAction/Anonymouse';
import { media } from 'helpers/style/media-query';
import { Colors } from 'variables';

const Container = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  border-bottom: 2px solid ${Colors.borderGray};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  height: 80px;
  ${media.phone`
    height: 48px;  
  `}
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
  cursor: pointer;
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
  padding-right: 12px;
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
  </Container>
);
