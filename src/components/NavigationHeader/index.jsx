import React, { Fragment } from 'react';
import styled from 'styled-components';
import Path from 'config/path';
import Icon from 'components/Shared/Icon';
import Menu from 'containers/Menu';
import { Colors, Dimens, FontSizes, ZIndexes } from 'variables';
import { media } from 'helpers/style/media-query';
import logoUri from 'images/monooq_logo.svg';

const Container = styled.nav`
  position: fixed;
  display: table;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 60px;
  padding: 0 ${Dimens.small}px;
  border-bottom: 1px solid ${Colors.borderGray};
  background: ${Colors.white};
  z-index: ${ZIndexes.nav};
`;

export const TopPadding = styled.div`
  height: 60px;
  width: 100%;
`;

const LogoWrapper = styled.a`
  display: table-cell;
  vertical-align: middle;
  width: 20%;
`;

const Logo = styled.img`
  width: 120px;
`;

const MenuWrapper = styled.div`
  display: table-cell;
  text-align: right;
  width: 80%;
`;

const IconWrapper = styled.a`
  position: relative;
  display: inline-block;
  height: 100%;
  padding: 16px ${Dimens.small}px 0;
  vertical-align: top;
  cursor: pointer;
  ${media.phone`
    padding: 16px ${Dimens.small}px 0;
  `}
`;

const UserIconWrapper = IconWrapper.withComponent('div');

const LinkWrapper = styled.div`
  display: inline-block;
  height: 100%;
  padding: 22px ${Dimens.small}px 0;
  cursor: pointer;
  ${media.phone`
    padding: 22px ${Dimens.small}px 0;
  `}
`;

const UserImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

const AnonymousUserLink = styled.a`
  color: ${Colors.linkBlue};
  font-size: ${FontSizes.medium}px;
`;

const MenuContainer = styled.div`
  position: fixed;
  top: 60px;
  right: 0;
  z-index: ${ZIndexes.topmost};
  background: ${Colors.white};
  ${media.phone`
    left: 0;
    right: 0;
  `}
`;

const MenuBackground = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255,255,255,0.6);
  z-index: ${ZIndexes.topmost - 1};
`;

function renderMenu(props) {
  const { onClickToggleMenu } = props;

  return (
    <Fragment>
      <MenuBackground onClick={() => onClickToggleMenu()} />
      <MenuContainer>
        <Menu showMobile />
      </MenuContainer>
    </Fragment>
  );
}

function renderMenuIcon(props) {
  const { user, loginChecking, showMenu, onClickToggleMenu } = props;

  if (loginChecking) return null;

  if (user) {
    return (
      <Fragment>
        <IconWrapper href={Path.messages(user.ID)}>
          <Icon name="fas fa-comment" reverse fontSize={FontSizes.medium2} color={Colors.lightGray1} />
        </IconWrapper>
        <UserIconWrapper onClick={() => onClickToggleMenu()}>
          <UserImage src={user.ImageUrl} alt={user.name} />
        </UserIconWrapper>
        {showMenu && renderMenu(props)}
      </Fragment>
    );
  }

  return (
    <LinkWrapper>
      <AnonymousUserLink href={Path.login()}>ログイン</AnonymousUserLink>
      &nbsp;/&nbsp;
      <AnonymousUserLink href={Path.signup()}>登録</AnonymousUserLink>
    </LinkWrapper>
  );
}

export default props => (
  <div>
    <Container>
      <LogoWrapper href={Path.top()}>
        <Logo src={logoUri} />
      </LogoWrapper>
      <MenuWrapper>
        <IconWrapper href={`${Path.search()}?location=東京都`}>
          <Icon name="fal fa-search" fontSize={FontSizes.medium2} color={Colors.lightGray1} />
        </IconWrapper>
        {renderMenuIcon(props)}
      </MenuWrapper>
    </Container>
    <TopPadding />
  </div>
);
