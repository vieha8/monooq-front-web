// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from 'components/atomic/LV1/Logo';
import SlideMenu from 'components/atomic/LV1/SlideMenu';
import AvatarIcon from 'components/atomic/LV2/HeaderAction/AvatarIcon';
import Anonymouse from 'components/atomic/LV2/HeaderAction/Anonymouse';
import AnimateSearchInputField from 'components/atomic/LV2/AnimateSearchInputField';
import ServiceMenu from 'components/atomic/LV3/ServiceMenu';
import { media } from 'helpers/style/media-query';
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
  `} ${media.tablet`
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
  ${media.tablet`
    margin-left: auto;
    margin-right: 10px;
  `};
`;

const ActionContainer = styled.div`
  display: table;
  ${media.tablet`
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
  ${media.tablet`
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

const AvaterName = styled.span`
  font-weight: bold;
  color: ${Colors.black};
`;

const OnlyPC = styled.span`
  display: inline-block;
  vertical-align: middle;
  ${media.tablet`
    display: none;
  `};
`;

const OnlyPhone = styled.span`
  display: none;
  ${media.tablet`
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
  onClickAvatar: Function,
  menu: React.Element<ServiceMenu>,
  top?: boolean,
  help?: boolean,
  storys?: boolean,
  searchConditionUri: string,
};

export default (props: PropTypes) => {
  return (
    <Container top={props.top} help={props.help} storys={props.storys}>
      <Nav>
        <LogoWrapper to={props.topUri}>
          {props.top || props.help ? <Logo.HeaderWhiteFill /> : <Logo.HeaderFill />}
        </LogoWrapper>
        {!props.isCheckingLogin && (
          <ActionWrapper>
            {props.user ? (
              <ActionContainer>
                <SearchFiledCell>
                  <AnimateSearchInputField
                    iconRight
                    iconColor={(props.top || props.help) && Colors.white}
                    searchConditionUri={props.searchConditionUri}
                  />
                </SearchFiledCell>
                <OnlyPhone>
                  <ActionCell>
                    <SlideMenu {...props} />
                  </ActionCell>
                </OnlyPhone>
                <OnlyPC>
                  <ActionCell>
                    <AvatarIcon imageSrc={props.user.image} to={props.homeUri} />
                  </ActionCell>
                  <ActionCell>
                    <Link to={props.homeUri}>
                      <AvaterName>{props.user.name}</AvaterName>
                    </Link>
                  </ActionCell>
                </OnlyPC>
              </ActionContainer>
            ) : (
              <ActionContainer>
                <AnonymouseWrapper>
                  <Anonymouse loginUri={props.loginUri} signupUri={props.signupUri} />
                </AnonymouseWrapper>
              </ActionContainer>
            )}
          </ActionWrapper>
        )}
      </Nav>
    </Container>
  );
};
