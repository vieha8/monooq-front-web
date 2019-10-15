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
import SearchConditionMoreSP from 'components/LV3/SearchConditionMoreSP';

import { media } from 'helpers/style/media-query';
import { Colors, Dimens, FontSizes, ZIndexes } from 'variables';

export const Height = 85;
export const HeightPhone = 54;

// TODO: 以下はサンプルデータなので、APIとのつなぎ込み時に削除しちゃってください。
const AreaAroundList = () => [
  {
    text: '武蔵村山市',
    link: '/musashimurayama',
  },
  {
    text: '渋谷区',
    link: '/shibuya',
  },
  {
    text: '北区',
    link: '/kita',
  },
  {
    text: '武蔵村山市',
    link: '/musashimurayama',
  },
  {
    text: '渋谷区',
    link: '/shibuya',
  },
  {
    text: '北区',
    link: '/kita',
  },
  {
    text: '武蔵村山市',
    link: '/musashimurayama',
  },
  {
    text: '渋谷区',
    link: '/shibuya',
  },
  {
    text: '北区',
    link: '/kita',
  },
  {
    text: '武蔵村山市',
    link: '/musashimurayama',
  },
  {
    text: '渋谷区',
    link: '/shibuya',
  },
  {
    text: '北区',
    link: '/kita',
  },
  {
    text: '武蔵村山市',
    link: '/musashimurayama',
  },
  {
    text: '渋谷区',
    link: '/shibuya',
  },
  {
    text: '北区',
    link: '/kita',
  },
];

const TownAreaList1 = () => [
  {
    text: '代々木神園町',
    link: '/1111',
  },
  {
    text: '宇田川町',
    link: '/2222',
  },
  {
    text: '上原',
    link: '/333',
  },
  {
    text: '東',
    link: '/333',
  },
  {
    text: '代々木神園町',
    link: '/1111',
  },
  {
    text: '宇田川町',
    link: '/2222',
  },
  {
    text: '上原',
    link: '/333',
  },
  {
    text: '東',
    link: '/333',
  },
  {
    text: '代々木神園町',
    link: '/1111',
  },
  {
    text: '宇田川町',
    link: '/2222',
  },
  {
    text: '上原',
    link: '/333',
  },
  {
    text: '東',
    link: '/333',
  },
  {
    text: '代々木神園町',
    link: '/1111',
  },
  {
    text: '宇田川町',
    link: '/2222',
  },
  {
    text: '上原',
    link: '/333',
  },
  {
    text: '東',
    link: '/333',
  },
];

const SearchConditionSPList = () => [
  {
    title: '東北・北海道',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
  {
    title: '北陸・甲信越',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
  {
    title: '関東',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
  {
    title: '東海',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
  {
    title: '関西',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
  {
    title: '四国',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
  {
    title: '九州・沖縄',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
];

const Container = styled.header`
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
    justify-content: center;
  `};
`;

const SearchIconWrapper = styled.div`
  display: none;
  ${media.tablet`
    display: block;
    position: absolute;
    left: ${Dimens.small_10}px;
  `};
`;

const LogoWrapper = styled.div``;

const LogoLink = styled(Link)`
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
    position: absolute;
    right: ${Dimens.medium}px;
    margin-right: 0px;
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

const linkColor = (top, isOverTopView, isHoverColor) => {
  // TODO: 最適化したい
  return top
    ? isOverTopView
      ? isHoverColor
        ? Colors.brandTerciary
        : Colors.brandPrimary
      : Colors.white
    : isHoverColor
    ? Colors.brandTerciary
    : Colors.brandPrimary;
};

type PropTypes = {
  top?: boolean,
  isLinkRed?: boolean,
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
  isLinkRed,
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
      <Nav top={top} isOverTopView={isOverTopView} isLinkRed={isLinkRed} id="nav">
        <SearchIconWrapper>
          <SearchConditionMoreSP
            searchIcon
            searchConditionCurrentList={[
              {
                title: '都道府県',
                value: '東京都',
              },
              {
                title: '市区町村',
                value: '渋谷区,新宿区,目黒区,千代田区,文京区,港区',
              },
              {
                title: '町域・エリア',
                value: '上原,恵比寿,神山町,笹塚,松濤,神宮前,神泉町,千駄ヶ谷',
              },
            ]}
            searchConditionSPList={SearchConditionSPList()}
            cityTownAreaList={[
              {
                cityName: '目黒区',
                areaAroundList: AreaAroundList(),
                townAreaList: TownAreaList1(),
              },
              {
                cityName: '港区',
                areaAroundList: AreaAroundList(),
                townAreaList: TownAreaList1(),
              },
            ]}
          />
        </SearchIconWrapper>
        <LogoWrapper>
          <LogoLink to={topUrl}>
            <ImageLogo.HeaderFill />
          </LogoLink>
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
                        color={linkColor(top, isOverTopView, false)}
                        colorHover={linkColor(top, isOverTopView, true)}
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
                        color={linkColor(top, isOverTopView, false)}
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
