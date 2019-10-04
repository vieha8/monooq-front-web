// @flow

import React, { Fragment } from 'react';
import PopupMenu from 'reactjs-popup';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from 'components/LV1/Forms/Button';
import ImageLogo from 'components/LV1/Images/ImageLogo';
import InlineText from 'components/LV1/Texts/InlineText';
import TextLink from 'components/LV1/Texts/TextLink';
import AvatarIcon from 'components/LV2/ButtonHeader/AvatarIcon';
import InfoUser from 'components/LV2/InfoUser';
import MenuItem from 'components/LV2/Items/MenuItem';
import ImageMenuHeader from 'components/LV2/ImageMenuHeader';
import { media } from 'helpers/style/media-query';
import { Colors, Dimens, FontSizes, ZIndexes } from 'variables';

export const Height = 85;
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
  z-index: ${ZIndexes.nav};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  height: ${Height}px;
  transition: 0.3s;
  ${props =>
    (!props.top || props.isOverTopView) &&
    `
    background: rgba(255, 255, 255, 0.8);
    transition: 0.3s;
  `}
  ${media.tablet`
    height: ${HeightPhone}px;
  `};
`;

const LogoWrapper = styled(Link)`
  width: 138px;
  display: inline-flex;
  margin-left: ${Dimens.medium3_40}px;
  margin-right: ${Dimens.medium_20}px;
  ${props =>
    props.hide &&
    `
    display: none;
  `} ${media.tablet`
    width: 100px;
    margin-top: 0px;
    margin-left: ${Dimens.medium_17}px;
  `};
`;

const ActionWrapper = styled.div`
  display: inline-flex;
  margin-left: auto;
  margin-right: ${Dimens.medium3_40}px;
  ${props =>
    props.fill &&
    `
    margin-left: 0;
  `};
  ${media.tablet`
    margin-left: auto;
    margin-right: ${Dimens.medium}px;
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
  margin: ${Dimens.xxsmall_5}px ${Dimens.medium1_26}px 0 ${Dimens.medium_20}px;
  ${media.tablet`
    margin: 0 ${Dimens.medium1_26}px 0 ${Dimens.medium_20}px;
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

const TextWrapper = styled.span`
  width: 106px;
  ${media.tablet`
    max-width: 106px;
  `};
  ${media.phone`
    min-width: 128px;
  `};
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  &:not(:first-child) {
    margin-left: 8px;
  }
`;

const TitleMenu = styled.div`
  padding-left: ${Dimens.medium_20}px;
  font-size: ${FontSizes.small_12}px;
  font-weight: 500;
  line-height: ${Dimens.medium_18}px;
  color: ${Colors.darkGray3};
`;

const trigger = imageUrl => {
  return (
    <div>
      <ActionCell>
        <AvatarIcon imageSrc={imageUrl} />
      </ActionCell>
      <ActionCell>
        <InlineText.Base bold>マイページ</InlineText.Base>
      </ActionCell>
    </div>
  );
};

const menuCommon = (aboutUrl, howtouseUrl, helpUrl) => {
  return (
    <OnlyPC>
      <TextWrapper>
        <TextLink to={aboutUrl} color={Colors.black}>
          モノオクとは？
        </TextLink>
      </TextWrapper>
      <TextWrapper>
        <TextLink to={howtouseUrl} color={Colors.black}>
          利用の流れ
        </TextLink>
      </TextWrapper>
      <TextWrapper>
        <TextLink href={helpUrl} color={Colors.black} target="_blank" rel="noopener noreferrer">
          よくある質問
        </TextLink>
      </TextWrapper>
    </OnlyPC>
  );
};

type PropTypes = {
  top?: boolean,
  isOverTopView?: boolean,
  stories?: boolean,
  topUrl: string,
  isCheckingLogin: boolean,
  noHeaderButton: boolean,
  user: {
    id: number,
    name: string,
    image: string,
    isHost: boolean,
  },
  messageUrl: string,
  messageCount?: number,
  spMenu: React.Element<*>,
  loginUrl: string,
  onClickSignup: Function,
  aboutpUrl: string,
  howtouseUrl: string,
  helpUrl: string,
  addSpace: MenuItemProps,
  spaces: MenuItemProps,
  isSchedule?: boolean,
  schedule: MenuItemProps,
  sales: MenuItemProps,
  logoutEvent: Function,
};

export default ({
  top,
  isOverTopView,
  stories,
  topUrl,
  isCheckingLogin,
  noHeaderButton,
  user,
  messageUrl,
  messageCount,
  spMenu,
  loginUrl,
  onClickSignup,
  aboutUrl,
  howtouseUrl,
  helpUrl,
  addSpace,
  spaces,
  isSchedule,
  schedule,
  sales,
  logoutEvent,
}: PropTypes) => {
  return (
    <Container stories={stories}>
      <Nav top={top} isOverTopView={isOverTopView} id="nav">
        <LogoWrapper to={topUrl}>
          <ImageLogo.HeaderFill />
        </LogoWrapper>
        {!isCheckingLogin && !noHeaderButton && (
          <ActionWrapper>
            {user ? (
              <ActionContainer>
                {menuCommon(aboutUrl, howtouseUrl, helpUrl)}
                <SearchFiledCell>
                  <ImageMenuHeader iconRight messageUrl={messageUrl} messageCount={messageCount} />
                </SearchFiledCell>
                <OnlyPhone>
                  <ActionCell noCursol>{spMenu}</ActionCell>
                </OnlyPhone>
                <OnlyPC>
                  <PopupMenu
                    trigger={trigger(user.image)}
                    position="bottom right"
                    closeOnDocumentClick
                  >
                    <div>
                      <InfoUser
                        isHost={user.isHost || false}
                        id={user.id}
                        imageUrl={user.image}
                        name={user.name}
                      />
                      {user.isHost && (
                        <Fragment>
                          <TitleMenu>スペース運営</TitleMenu>
                          <MenuItem title="スペースの新規登録" {...addSpace} />
                          <MenuItem title="スペースの管理" {...spaces} />
                          {isSchedule && <MenuItem title="利用状況" {...schedule} />}
                          <MenuItem title="売上・振込申請" {...sales} />
                        </Fragment>
                      )}
                      {user && <MenuItem title="ログアウト" {...logoutEvent} blank logout />}
                    </div>
                  </PopupMenu>
                </OnlyPC>
              </ActionContainer>
            ) : (
              <ActionContainer>
                {menuCommon(aboutUrl, howtouseUrl, helpUrl)}
                <AnonymouseWrapper>
                  <OnlyPhone>
                    <ActionCell noCursol>{spMenu}</ActionCell>
                  </OnlyPhone>
                  <OnlyPC>
                    <TextWrapper>
                      <TextLink
                        href={loginUrl}
                        color={!top || isOverTopView ? Colors.brandPrimary : Colors.white}
                        colorHover={!top || isOverTopView ? Colors.brandTerciary : Colors.white}
                        bold
                      >
                        ログイン
                      </TextLink>
                    </TextWrapper>
                    <TextWrapper>
                      <Button
                        quaternary
                        link
                        onClick={onClickSignup}
                        fontbold
                        height={40}
                        lineheight={15}
                        color={!top || isOverTopView ? Colors.brandPrimary : Colors.white}
                      >
                        新規登録
                      </Button>
                    </TextWrapper>
                  </OnlyPC>
                </AnonymouseWrapper>
              </ActionContainer>
            )}
          </ActionWrapper>
        )}
      </Nav>
    </Container>
  );
};
