// @flow

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from 'components/atomic/LV1/Logo';
import SlideMenu from 'components/atomic/LV1/SlideMenu';
import CloseIcon from 'components/atomic/LV2/HeaderAction/CloseIcon';
import AvatarIcon from 'components/atomic/LV2/HeaderAction/AvatarIcon';
import Anonymouse from 'components/atomic/LV2/HeaderAction/Anonymouse';
import AnimateSearchInputField from 'components/atomic/LV2/AnimateSearchInputField';
import ServiceMenu from 'components/atomic/LV3/ServiceMenu';
import { media, isMobileWindow } from 'helpers/style/media-query';
import { Colors, Dimens, ZIndexes } from 'variables';

export const Height = 60;

const Container = styled.header`
  position: fixed;
  ${props =>
    props.storys &&
    `
    position: relative;
  `} top: 0;
  width: 100%;
  border-bottom: 1px solid ${Colors.borderGray};
  background: ${Colors.white};
  z-index: ${ZIndexes.nav};
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
`;

const LogoWrapper = styled(Link)`
  width: 138px;
  display: inline-flex;
  margin-left: 50px;
  ${props =>
    props.hide &&
    `
    display: none;
  `} ${media.phone`
    width: 100px;
    margin-top: 4px;
    margin-left: 20px;
  `};
`;

const ActionWrapper = styled.div`
  display: inline-flex;
  margin-left: auto;
  margin-right: 46px;
  ${props =>
    props.fill &&
    `
    margin-left: 0;
  `};
  ${media.phone`
    margin-left: auto;
    margin-right: 10px;
  `};
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
  max-width: 140px;
  &:not(:last-child) {
    padding-right: ${Dimens.medium}px;
  }
  ${props =>
    props.hide &&
    `
    display: none;
  `};
`;

const SearchFiledCell = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: auto;
  margin-right: ${Dimens.medium}px;
  ${media.phone`
    width: 50px;
    ${props =>
      props.fill &&
      `
      width: 260px;
    `}
  `};
`;

const AnonymouseWrapper = styled.div`
  display: inline-block;
  vertical-align: middle;
  ${props =>
    props.hide &&
    `
    display: none;
  `};
`;

const MenuWrapper = styled.div`
  position: fixed;
  top: ${Height}px;
  width: 328px;
  ${media.phone`
    position: fixed;
    overflow: auto;
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
`;

const CloseIconWrapper = styled.span`
  display: inline-block;
  margin-left: 12px;
`;

const AvaterName = styled.span`
  font-weight: bold;
`;

const OnlyPC = styled.span`
  display: contents;
  ${media.phone`
    display: none;
  `};
`;

const OnlyPhone = styled.span`
  display: none;
  ${media.phone`
    display: contents;
  `};
`;

type PropTypes = {
  homeUri: string,
  user: {
    name: string,
    image: string,
  },
  isCheckingLogin: boolean,
  loginUri: string,
  signupUri: string,
  onClickSearchIcon: Function,
  onClickCloseSearch: Function,
  showSearchField: boolean,
  onKeyDownSearch: Function,
  onChangeSearchField: Function,
  onClickAvatar: Function,
  onClickCloseMenu: Function,
  showMenu: boolean,
  menu: React.Element<ServiceMenu>,
  top?: boolean,
  help?: boolean,
  storys?: boolean,
};

export default (props: PropTypes) => {
  const isFillSearchField = props.showSearchField && isMobileWindow() ? 'fill' : '';
  return (
    <Container top={props.top} help={props.help} storys={props.storys}>
      <Nav>
        <LogoWrapper to={props.homeUri} hide={isFillSearchField}>
          {props.top || props.help ? <Logo.HeaderWhiteFill /> : <Logo.HeaderFill />}
        </LogoWrapper>
        {!props.isCheckingLogin && (
          <ActionWrapper fill={isFillSearchField}>
            {props.user ? (
              <ActionContainer>
                <SearchFiledCell fill={isFillSearchField}>
                  <AnimateSearchInputField
                    iconRight
                    iconColor={(props.top || props.help) && Colors.white}
                    placeholder="どこの物置きを探す？"
                    show={props.showSearchField}
                    onClickIcon={props.onClickSearchIcon}
                    onKeyDownInputField={props.onKeyDownSearch}
                    onChange={props.onChangeSearchField}
                  />
                </SearchFiledCell>
                <ActionCell hide={!isFillSearchField}>
                  <CloseIconWrapper>
                    <CloseIcon
                      color={(props.top || props.help) && Colors.white}
                      onClick={props.onClickCloseSearch}
                    />
                  </CloseIconWrapper>
                </ActionCell>
                <OnlyPhone>
                  <ActionCell hide={isFillSearchField}>
                    <SlideMenu {...props} />
                  </ActionCell>
                </OnlyPhone>
                <OnlyPC>
                  <ActionCell hide={isFillSearchField}>
                    <AvatarIcon imageSrc={props.user.image} onClick={props.onClickAvatar} />
                  </ActionCell>
                  <ActionCell hide={isFillSearchField}>
                    <AvaterName>{props.user.name}</AvaterName>
                  </ActionCell>
                </OnlyPC>
              </ActionContainer>
            ) : (
              <ActionContainer>
                <AnonymouseWrapper hide={isFillSearchField}>
                  <Anonymouse loginUri={props.loginUri} signupUri={props.signupUri} />
                </AnonymouseWrapper>
              </ActionContainer>
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
};
