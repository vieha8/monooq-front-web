import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Path from 'config/path';
import { FontSizes, Colors, Dimens, ZIndexes } from 'variables';
import { media } from 'helpers/style/media-query';
import TextLink from 'components/LV1/Texts/TextLink';
import MenuSP from 'components/LV3/Header/MenuSP';
import MenuPC from 'components/LV3/Header/MenuPC';
import Logo from 'components/LV3/Header/Logo';
import MessagesIcon from 'components/LV3/Header/MessagesIcon';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import SpaceRows from 'components/LV3/SpaceRows';
import MenuPCVisitor from './MenuPCVisitor';

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
  height: ${Dimens.headerHeight}px;
  transition: 0.3s;
  background: ${Colors.white};
  border-bottom: 1px solid ${Colors.borderGray};
  ${media.tablet`
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
  ${media.desktop`
    margin-right: ${Dimens.medium}px;
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
  margin: ${Dimens.xxsmall_5}px ${Dimens.medium1_26}px 0 ${Dimens.xsmall}px;
  ${media.desktop`
    margin: ${Dimens.xxsmall_5}px ${Dimens.medium_20}px 0 0;
  `};
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

const OnlyPhoneTablet = styled.span`
  display: none;
  ${media.tablet`
    display: inline-block;
    vertical-align: middle;
  `};
`;

const TextWrapper = styled.span`
  width: 106px;
  ${media.tablet1`
    width: 95px;
  `};
  ${media.tablet`
    width: 106px;
    min-width: 106px;
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

const HistoryHover = styled(TextWrapper)`
  position: relative;
  & + div {
    display: none;
  }

  :hover {
    height: 150px;
  }

  :hover + div {
    display: block;
  }
`;

const Triangle = styled.div`
  position: absolute;
  top: -12px;
  right: 25px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 10px 16px 10px;
  border-color: transparent transparent ${Colors.white} transparent;
`;

const HoverContainer = styled.div`
  :hover {
    display: block !important;
  }
  border-radius: ${Dimens.xsmall}px;
  width: 320px;
  background: white;
  position: absolute;
  z-index: ${ZIndexes.headerHover};
  top: 75px;
  right: 245px;
  box-shadow: 0px 0px ${Dimens.xsmall}px rgba(0, 0, 0, 0.1);
  ${media.desktop`
    right: 209px;
  `};
`;

const HoverHistoryTitle = styled.div`
  margin: ${Dimens.medium1_28}px 0;
  font-size: ${FontSizes.medium_18}px;
  font-weight: bold;
  color: ${Colors.darkGray1};
  text-align: center;
`;

const HoverHistoryRows = styled.div`
  padding: 0 ${Dimens.medium}px;
`;

const HoverHistoryAllLink = styled(Link)`
  display: block;
  font-weight: 500;
  font-size: ${FontSizes.small}px;
  color: ${Colors.lightGray3};
  text-align: center;
  margin: ${Dimens.small}px 0;
  padding: ${Dimens.medium}px 0 ${Dimens.small2}px;
  &:link {
    color: ${Colors.lightGray3};
  }
  &:visited {
    color: ${Colors.lightGray3};
  }
  &:active {
    color: ${Colors.lightGray3};
  }
`;

const HoverHistoryNoData = styled.div`
  font-size: ${FontSizes.small}px;
  color: ${Colors.lightGray3};
  text-align: center;
  margin: ${Dimens.medium1}px 0;
`;

const HeaderView = ({ isOverTablet, noHeaderButton, stories, accessLogSpaces }) => {
  const router = useRouter();
  const isLogin = useSelector(state => state.auth.isLogin);

  if (noHeaderButton) {
    return (
      <Wrap stories={stories}>
        <Nav id="nav">
          <Logo noLink />
        </Nav>
      </Wrap>
    );
  }

  const onClickSpace = spaceId => {
    router.push(Path.space(spaceId));
  };

  return (
    <Wrap stories={stories}>
      <Nav id="nav">
        <Logo noLink={noHeaderButton} />
        {!noHeaderButton && (
          <ActionWrapper>
            <ActionWrap>
              {isOverTablet && (
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
                  <Fragment>
                    <HistoryHover>
                      <TextLink to={Path.historyViewSpace()} color={Colors.black}>
                        閲覧履歴
                      </TextLink>
                    </HistoryHover>
                    <HoverContainer>
                      <Triangle />
                      <HoverHistoryTitle>閲覧履歴</HoverHistoryTitle>
                      <HoverHistoryRows>
                        <SpaceRows spaces={accessLogSpaces} onClick={onClickSpace} />
                      </HoverHistoryRows>
                      {accessLogSpaces && accessLogSpaces.length > 0 ? (
                        <Link href={Path.historyViewSpace()} passHref>
                          <HoverHistoryAllLink as="a">もっと見る</HoverHistoryAllLink>
                        </Link>
                      ) : (
                        <HoverHistoryNoData>閲覧履歴がありません</HoverHistoryNoData>
                      )}
                    </HoverContainer>
                  </Fragment>
                </OnlyPC>
              )}
              {isLogin ? (
                <Fragment>
                  <SearchFiledCell>
                    <MessagesIcon />
                  </SearchFiledCell>
                  {isOverTablet ? (
                    <OnlyPC>
                      <MenuPC />
                    </OnlyPC>
                  ) : (
                    <OnlyPhoneTablet>
                      <ActionCell noCursol>
                        <MenuSP />
                      </ActionCell>
                    </OnlyPhoneTablet>
                  )}
                </Fragment>
              ) : (
                <Fragment>
                  <AnonymouseWrapper>
                    {isOverTablet ? (
                      <OnlyPC>
                        <MenuPCVisitor />
                      </OnlyPC>
                    ) : (
                      <OnlyPhoneTablet>
                        <ActionCell noCursol>
                          <MenuSP />
                        </ActionCell>
                      </OnlyPhoneTablet>
                    )}
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

export default HeaderView;
