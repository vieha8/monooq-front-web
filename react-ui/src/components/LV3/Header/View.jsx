import React, { Fragment } from 'react';
import styled from 'styled-components';
import Path from 'config/path';
import { Colors, Dimens, ZIndexes } from 'variables';
import { media } from 'helpers/style/media-query';
import TextLink from 'components/LV1/Texts/TextLink';
import MenuSP from 'components/LV3/Header/MenuSP';
import MenuPC from 'components/LV3/Header/MenuPC';
import Logo from 'components/LV3/Header/Logo';
import MessagesIcon from 'components/LV3/Header/MessagesIcon';
import { useSelector } from 'react-redux';
import MenuPCVisitor from './MenuPCVisitor';

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

const HeaderView = ({ isTop, isLinkRed, isOverTopView, noHeaderButton, noLinkLogo, stories }) => {
  const isLogin = useSelector(state => state.auth.isLogin);

  if (noHeaderButton) {
    return (
      <Wrap stories={stories}>
        <Nav top={isTop} isOverTopView={isOverTopView} isLinkRed={isLinkRed} id="nav">
          <Logo noLink={noLinkLogo} />
        </Nav>
      </Wrap>
    );
  }

  return (
    <Wrap stories={stories}>
      <Nav top={isTop} isOverTopView={isOverTopView} isLinkRed={isLinkRed} id="nav">
        <Logo noLink={noLinkLogo} />
        {!noHeaderButton && (
          <ActionWrapper>
            <ActionWrap>
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
                {isLogin && (
                  <TextWrapper>
                    <TextLink to={Path.historyViewSpace()} color={Colors.black}>
                      閲覧履歴
                    </TextLink>
                  </TextWrapper>
                )}
              </OnlyPC>
              {isLogin ? (
                <Fragment>
                  <SearchFiledCell>
                    <MessagesIcon />
                  </SearchFiledCell>
                  <OnlyPhone>
                    <ActionCell noCursol>
                      <MenuSP />
                    </ActionCell>
                  </OnlyPhone>
                  <OnlyPC>
                    <MenuPC />
                  </OnlyPC>
                </Fragment>
              ) : (
                <Fragment>
                  <AnonymouseWrapper>
                    <OnlyPhone>
                      <ActionCell noCursol>
                        <MenuSP />
                      </ActionCell>
                    </OnlyPhone>
                    <OnlyPC>
                      <MenuPCVisitor isTop={isTop} isOverTopView={isOverTopView} />
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

export default HeaderView;
