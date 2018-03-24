// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import Logo from 'components/atomic/atoms/Logo';
import MessageIcon from 'components/atomic/molecules/HeaderAction/MessageIcon';
import AvatarIcon from 'components/atomic/molecules/HeaderAction/AvatarIcon';
import Anonymouse from 'components/atomic/molecules/HeaderAction/Anonymouse';
import AnimateSearchInputField from 'components/atomic/molecules/AnimateSearchInputField';
import ServiceMenu from 'components/atomic/organisms/ServiceMenu';
import { media } from 'helpers/style/media-query';
import { Colors, ZIndexes } from 'variables';

export const Height = 60;

const Container = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  border-bottom: 2px solid ${Colors.borderGray};
  background: ${Colors.white};
  ${props =>
    props.top &&
    `
    background: rgba(255, 255, 255, 0.6);
  `} ${props =>
      props.help &&
      `
    background: ${Colors.brandAccent};
  `};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  height: ${Height}px;
  ${media.phone`
  `} z-index: ${ZIndexes.nav};
`;

const LogoWrapper = styled.a`
  display: inline-flex;
  margin-left: 12px;
  ${media.phone`
    margin-top: 4px;
  `};
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
  `};
`;

const ActionCell = styled.div`
  display: table-cell;
  vertical-align: middle;
  cursor: pointer;
  &:not(:last-child) {
    padding-right: 12px;
  }
`;

const SearchFiledCell = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 300px;
  margin-right: 8px;
`;

const AnonymouseWrapper = styled.div`
  display: inline-block;
  margin-left: 16px;
  vertical-align: middle;
`;

const MenuWrapper = styled.div`
  position: fixed;
  top: ${Height}px;
  width: 328px;
  ${media.phone`
    position: fixed;
    overflow: scroll;
    bottom: 0;
    width: 100%;
  `} right: 0;
  z-index: ${ZIndexes.nav};
`;

const MenuBackground = styled.div`
  position: fixed;
  top: ${Height}px;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.6);
  z-index: ${ZIndexes.modal};
  ${media.phone`
    display: none;
  `};
`;

type PropTypes = {
  homeUri: string,
  messageUri: string,
  messageCount: number,
  user: {
    image: string,
    name: string,
  },
  loginUri: string,
  signupUri: string,
  onClickSearchIcon: Function,
  showSearchField: boolean,
  onKeyDownSearch: Function,
  onClickAvatar: Function,
  onClickCloseMenu: Function,
  showMenu: boolean,
  menu: React.Element<ServiceMenu>,
  top?: boolean,
  help?: boolean,
  hideActions?: boolean,
};

export default (props: PropTypes) => (
  <Container top={props.top} help={props.help}>
    <Nav>
      <LogoWrapper href={props.homeUri}>
        {(props.top || props.help) ? <Logo.HeaderWhite /> : <Logo.Header />}
      </LogoWrapper>
      {!props.hideActions && (
        <ActionWrapper>
          {props.user ? (
            <ActionContainer>
              <SearchFiledCell>
                <AnimateSearchInputField
                  iconRight
                  iconColor={(props.top || props.help) && Colors.white}
                  placeholder="どこの物置きを探す？"
                  show={props.showSearchField}
                  onClickIcon={props.onClickSearchIcon}
                  onKeyDownInputField={props.onKeyDownSearch}
                />
              </SearchFiledCell>
              <ActionCell>
                <MessageIcon
                  color={(props.top || props.help) && Colors.white}
                  href={props.messageUri}
                  notificationCount={props.messageCount}
                />
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
            <Fragment>
              <SearchFiledCell>
                <AnimateSearchInputField
                  iconRight
                  iconColor={(props.top || props.help) && Colors.white}
                  placeholder="どこの物置きを探す？"
                  show={props.showSearchField}
                  onClickIcon={props.onClickSearchIcon}
                  onKeyDownInputField={props.onKeyDownSearch}
                />
              </SearchFiledCell>
              <AnonymouseWrapper>
                <Anonymouse loginUri={props.loginUri} signupUri={props.signupUri} />
              </AnonymouseWrapper>
            </Fragment>
          )}
        </ActionWrapper>
      )}
    </Nav>
    {props.showMenu && (
      <Fragment>
        <MenuBackground onClick={props.onClickCloseMenu} />
        <MenuWrapper>{props.menu}</MenuWrapper>
      </Fragment>
    )}
  </Container>
);
