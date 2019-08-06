// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ImageLogo from 'components/LV1/Images/ImageLogo';
import AvatarIcon from 'components/LV2/HeaderAction/AvatarIcon';
import Anonymouse from 'components/LV2/HeaderAction/Anonymouse';
import AnimateSearchInputField from 'components/LV2/AnimateSearchInputField';
import { media } from 'helpers/style/media-query';
import { Colors, Dimens, ZIndexes } from 'variables';
import { formatName } from 'helpers/string';

export const Height = 64;
export const HeightPhone = 54;

const Container = styled.header`
  position: fixed;
  ${props =>
    props.stories &&
    `
    position: relative;
  `} top: 0;
  width: 100%;
  min-width: 260px;
  border-bottom: 1px solid ${Colors.borderGray};
  background: ${Colors.white};
  z-index: ${ZIndexes.nav};
  ${props =>
    props.top &&
    `
    background: rgba(255, 255, 255, 0.6);
  `};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  height: ${Height}px;
  ${media.tablet`
    height: ${HeightPhone}px;
  `};
`;

const LogoWrapper = styled(Link)`
  width: 138px;
  display: inline-flex;
  margin-left: 52px;
  ${props =>
    props.hide &&
    `
    display: none;
  `} ${media.tablet`
    width: 100px;
    margin-top: 0px;
    margin-left: 17px;
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
    margin-right: 16px;
  `};
`;

const ActionContainer = styled.div`
  display: table;
  ${media.tablet`
    margin-top: 0px;
  `};
`;

const ActionCell = styled.div`
  display: table-cell;
  vertical-align: middle;
  max-width: 300px;
  &:not(:last-child) {
    padding-right: ${Dimens.medium}px;
  }
  ${props =>
    props.hide &&
    `
    display: none;
  `};
  ${props =>
    !props.noCursol &&
    `
    cursor: pointer;
  `};
`;

const SearchFiledCell = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: auto;
  margin-right: ${Dimens.medium}px;
  ${media.tablet`
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
    display: inline-block;
    vertical-align: middle;
  `};
`;

type PropTypes = {
  top?: boolean,
  stories?: boolean,
  topUrl: string,
  isCheckingLogin: boolean,
  noHeaderButton: boolean,
  user: {
    name: string,
    image: string,
  },
  messageUrl: string,
  messageCount?: number,
  searchConditionUrl: string,
  spMenu: React.Element<*>,
  homeUrl: string,
  loginUrl: string,
  signupUrl: string,
};

export default ({
  top,
  stories,
  topUrl,
  isCheckingLogin,
  noHeaderButton,
  user,
  messageUrl,
  messageCount,
  searchConditionUrl,
  spMenu,
  homeUrl,
  loginUrl,
  signupUrl,
}: PropTypes) => {
  return (
    <Container top={top} stories={stories}>
      <Nav>
        <LogoWrapper to={topUrl}>
          {top ? <ImageLogo.HeaderWhiteFill /> : <ImageLogo.HeaderFill />}
        </LogoWrapper>
        {!isCheckingLogin && !noHeaderButton && (
          <ActionWrapper>
            {user ? (
              <ActionContainer>
                <SearchFiledCell>
                  <OnlyPhone>
                    <AnimateSearchInputField
                      iconRight
                      messageUrl={messageUrl}
                      messageCount={messageCount}
                      searchConditionUrl={searchConditionUrl}
                      isPhone
                    />
                  </OnlyPhone>
                  <OnlyPC>
                    <AnimateSearchInputField iconRight searchConditionUrl={searchConditionUrl} />
                  </OnlyPC>
                </SearchFiledCell>
                <OnlyPhone>
                  <ActionCell noCursol>{spMenu}</ActionCell>
                </OnlyPhone>
                <OnlyPC>
                  <ActionCell>
                    <AvatarIcon imageSrc={user.image} to={homeUrl} />
                  </ActionCell>
                  <ActionCell>
                    <Link to={homeUrl}>
                      <AvaterName>{formatName(user.name)}</AvaterName>
                    </Link>
                  </ActionCell>
                </OnlyPC>
              </ActionContainer>
            ) : (
              <ActionContainer>
                <AnonymouseWrapper>
                  <Anonymouse loginUrl={loginUrl} signupUrl={signupUrl} />
                </AnonymouseWrapper>
              </ActionContainer>
            )}
          </ActionWrapper>
        )}
      </Nav>
    </Container>
  );
};
