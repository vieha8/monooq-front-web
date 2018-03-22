import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Path from 'config/path';
import Icon from 'components/Shared/Icon';
import Menu from 'containers/Menu';
import { Colors, Dimens, FontSizes, ZIndexes } from 'variables';
import { media, isMobileWindow } from 'helpers/style/media-query';
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

const LogoWrapper = styled(Link)`
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
  padding: 18px ${Dimens.small}px 0;
  vertical-align: top;
  cursor: pointer;
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

const AnonymousUserLink = styled(Link)`
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

const SearchFiled = styled.input`
  @keyframes show {
    0% {
      width: 0;
    }
    100% {
      width: ${props => (props.isMobile ? 100 : 300)}px;
    }
  }

  outline: none;
  height: 32px;
  margin-top: 14px;
  width: 0;
  border: none;
  border-bottom: 1px solid ${Colors.borderGray};
  ${props => props.show && `
    animation show 0.5s ease 0s;
    animation-fill-mode: forwards;
    width: 300px;
    ${media.phone`
      width: 100px;
    `}
  `}
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
      <AnonymousUserLink to={Path.login()}>ログイン</AnonymousUserLink>
      &nbsp;/&nbsp;
      <AnonymousUserLink to={Path.signup()}>登録</AnonymousUserLink>
    </LinkWrapper>
  );
}

function refSearchField(ref, props) {
  if (ref) {
    ref.addEventListener('keydown', props.onKeyDownSearchField);
  }
}

export default props => (
  <div>
    <Container>
      <LogoWrapper to={Path.top()}>
        <Logo src={logoUri} />
      </LogoWrapper>
      <MenuWrapper>
        <SearchFiled
          isMobile={isMobileWindow()}
          show={props.showSearchField}
          innerRef={ref => refSearchField(ref, props)}
          placeholder="どこの物置きを探す？"
        />
        <IconWrapper onClick={props.onClickSearchIcon}>
          <Icon name="fal fa-search" fontSize={FontSizes.medium2} color={Colors.lightGray1} />
        </IconWrapper>
        {renderMenuIcon(props)}
      </MenuWrapper>
    </Container>
    <TopPadding />
  </div>
);
