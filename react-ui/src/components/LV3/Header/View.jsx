import React, { Fragment } from 'react';
import PopupMenu from 'reactjs-popup';
import styled from 'styled-components';
import Path from 'config/path';
import { Colors, Dimens, FontSizes, ZIndexes } from 'variables';
import { media } from 'helpers/style/media-query';
import Button from 'components/LV1/Forms/Button';
import InlineText from 'components/LV1/Texts/InlineText';
import TextLink from 'components/LV1/Texts/TextLink';
import AvatarIcon from 'components/LV2/ButtonHeader/AvatarIcon';
import InfoUser from 'components/LV2/InfoUser';
import MenuItem from 'components/LV2/Items/MenuItem';
import ServiceMenu from 'components/LV3/Header/Menu';
import Logo from 'components/LV3/Header/Logo';
import MessagesIcon from 'components/LV3/Header/MessagesIcon';

export const Height = 85;
export const HeightPhone = 54;

const Wrap = styled.header`
  position: fixed;
  ${props =>
    props.stories &&
    `
    position: relative;
  `};
  top: 0;
  width: 100%;
  min-width: 320px;
  z-index: ${ZIndexes.nav};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  height: ${Height}px;
  transition: 0.3s;
  ${props =>
    (props.isOverTopView || (!props.isLinkRed && !props.top)) &&
    `
    background: rgba(255, 255, 255, 0.8);
    transition: 0.3s;
  `}
  ${media.tablet`
    height: ${HeightPhone}px;
    position: relative;
    display: flex;
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
    position: absolute;
    right: ${Dimens.medium}px;
    margin-right: 0px;
  `};
`;

const ActionWrap = styled.div`
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

const trigger = imageUrl => (
  <div>
    <ActionCell>
      <AvatarIcon imageSrc={imageUrl} />
    </ActionCell>
    <ActionCell>
      <InlineText.Base bold>マイページ</InlineText.Base>
    </ActionCell>
  </div>
);

const menuCommon = () => (
  <OnlyPC>
    <TextWrapper>
      <TextLink to={Path.about()} color={Colors.black}>
        モノオクとは？
      </TextLink>
    </TextWrapper>
    <TextWrapper>
      <TextLink to={Path.howtouse()} color={Colors.black}>
        利用の流れ
      </TextLink>
    </TextWrapper>
    <TextWrapper>
      <TextLink
        href="https://help.monooq.com"
        color={Colors.black}
        target="_blank"
        rel="noopener noreferrer"
      >
        よくある質問
      </TextLink>
    </TextWrapper>
  </OnlyPC>
);

const linkColor = (top, isOverTopView, isHoverColor) => {
  let resultVal = Colors.brandPrimary;

  if (top) {
    if (isOverTopView) {
      if (isHoverColor) {
        resultVal = Colors.brandTerciary;
      }
    } else {
      resultVal = Colors.white;
    }
  } else if (isHoverColor) {
    resultVal = Colors.brandTerciary;
  }

  return resultVal;
};

export default ({
  isTop,
  isLinkRed,
  isOverTopView,
  noHeaderButton,
  noLinkLogo,
  user,
  onClickSignup,
  addSpace,
  isSchedule,
  logoutEvent,
  stories,
}) => {
  return (
    <Wrap stories={stories}>
      <Nav top={isTop} isOverTopView={isOverTopView} isLinkRed={isLinkRed} id="nav">
        <Logo noLink={noLinkLogo} />
        {!noHeaderButton && (
          <ActionWrapper>
            <ActionWrap>
              {menuCommon()}
              {user.id ? (
                <Fragment>
                  <SearchFiledCell>
                    <MessagesIcon />
                  </SearchFiledCell>
                  <OnlyPhone>
                    <ActionCell noCursol>
                      <ServiceMenu />
                    </ActionCell>
                  </OnlyPhone>
                  <OnlyPC>
                    <PopupMenu
                      trigger={trigger(user.imageUrl)}
                      position="bottom right"
                      closeOnDocumentClick
                    >
                      <Fragment>
                        <InfoUser
                          isHost={user.isHost || false}
                          id={user.id}
                          imageUrl={user.imageUrl}
                          name={user.name}
                        />
                        {user.isHost && (
                          <Fragment>
                            <TitleMenu>スペース運営</TitleMenu>
                            <MenuItem title="スペースの新規登録" {...addSpace} />
                            <MenuItem title="スペースの管理" to={Path.spaces()} />
                            {isSchedule && <MenuItem title="利用状況" to={Path.schedule()} />}
                            <MenuItem title="売上・振込申請" to={Path.sales()} />
                          </Fragment>
                        )}
                        {user && <MenuItem title="ログアウト" {...logoutEvent} blank logout />}
                      </Fragment>
                    </PopupMenu>
                  </OnlyPC>
                </Fragment>
              ) : (
                <Fragment>
                  <AnonymouseWrapper>
                    <OnlyPhone>
                      <ActionCell noCursol>
                        <ServiceMenu />
                      </ActionCell>
                    </OnlyPhone>
                    <OnlyPC>
                      <TextWrapper>
                        <TextLink
                          to={Path.login()}
                          color={linkColor(isTop, isOverTopView, false)}
                          colorhover={linkColor(isTop, isOverTopView, true)}
                          bold="true"
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
                          color={linkColor(isTop, isOverTopView, false)}
                        >
                          新規登録
                        </Button>
                      </TextWrapper>
                    </OnlyPC>
                  </AnonymouseWrapper>
                </Fragment>
              )}
            </ActionWrap>
          </ActionWrapper>
        )}
      </Nav>
    </Wrap>
  );
};
