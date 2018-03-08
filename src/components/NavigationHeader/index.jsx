import React from 'react';
import styled from 'styled-components';
import Path from 'config/path';
import Icon from 'components/Shared/Icon';
import { Colors, Dimens, FontSizes } from 'variables';
import logoUri from 'images/monooq_logo.svg';

const Container = styled.nav`
  position: fixed;
  display: table;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 80px;
  padding: 0 ${Dimens.small}px;
  border-bottom: 1px solid ${Colors.borderGray};
  background: ${Colors.white};
`;

export const TopPadding = styled.div`
  height: 80px;
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

const IconWrapper = styled.div`
  position: relative;
  display: inline-block;
  height: 100%;
  padding: 22px ${Dimens.small}px 0;
  vertical-align: top;
`;

const UserImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export default () => (
  <Container>
    <LogoWrapper href={Path.top()}>
      <Logo src={logoUri} />
    </LogoWrapper>
    <MenuWrapper>
      <IconWrapper>
        <Icon name="search" fontSize={FontSizes.large} color={Colors.lightGray1} />
      </IconWrapper>
      <IconWrapper>
        <Icon name="comment" fontSize={FontSizes.large} color={Colors.lightGray1} />
      </IconWrapper>
      <IconWrapper>
        <UserImage src="http://placehold.jp/500x500.png" alt="" />
      </IconWrapper>
    </MenuWrapper>
  </Container>
);
