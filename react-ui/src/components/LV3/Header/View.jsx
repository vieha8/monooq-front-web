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
import getAvailabilityComponent from 'components/LV1/Texts/Availability';

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

const HistoryHover = styled(TextWrapper)`
  position: relative;
  //& + div {
  //  display: none;
  //}

  :hover + div {
    display: block;
  }
`;

const Hoge = styled.div`
  width: 320px;
  background: white;
  position: absolute;
  z-index: ${ZIndexes.headerHover};
  top: 91px; // 85 + 6
  right: 204px; // 191 + alpha
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
`;

const Foo = styled.div`
  margin: 28px 0;
  font-size: 18px;
  color: #333333;
  text-align: center;
`;

const Rows = styled.div`
  padding: 0 16px;
`;
const Row = styled.div`
  display: flex;
  height: 48px;
  font-size: 12px;
  line-height: 17px;
  color: #000000;
  position: relative;
  box-sizing: content-box;

  :not(:first-child) {
    margin-top: 8px;
  }
  :not(:last-child) {
    padding-bottom: 8px;
    border-bottom: solid 1px #f7f7f7;
  }
`;
const RowImg = styled.img`
  height: 48px;
  width: 64px;
  margin-right: 12px;
  object-fit: cover;
`;
const RowBody = styled.div`
  height: 34px;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  width: 212px;
  padding: 6px 0 0;
  display: -webkit-box;
`;

const RowLabel = styled.div`
  position: absolute;
  font-size: 12px;
  padding: 1.5px 6px;
  color: ${Colors.white};
  background-color: ${props => (props.bgColor ? props.bgColor : Colors.green)};
  border-radius: 2px;
`;
const All = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #999999;
  text-align: center;
  margin: 8px 0;
  padding: 16px 0 12px;
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
                  <>
                    <HistoryHover>
                      <TextLink to={Path.historyViewSpace()} color={Colors.black}>
                        閲覧履歴
                      </TextLink>
                    </HistoryHover>
                    <Hoge>
                      <Foo>閲覧履歴</Foo>
                      <Rows>
                        <Row>
                          <RowImg src="https://via.placeholder.com/400x50/0000FF" />
                          <RowLabel>空室</RowLabel>
                          <RowBody>
                            ウォークインクローゼットで大きめの荷物も
                            ウォークインクローゼットで大きめの荷物も
                            ウォークインクローゼットで大きめの荷物も
                            ウォークインクローゼットで大きめの荷物も
                            ウォークインクローゼットで大きめの荷物も
                            ウォークインクローゼットで大きめの荷物も
                          </RowBody>
                        </Row>
                        <Row>
                          <RowImg src="https://via.placeholder.com/400x50/0000FF" />
                          <RowLabel>空室</RowLabel>
                          <RowBody>
                            ウォークインクローゼットで大きめの荷物も
                            ウォークインクローゼットで大きめの荷物も
                            ウォークインクローゼットで大きめの荷物も
                            ウォークインクローゼットで大きめの荷物も
                            ウォークインクローゼットで大きめの荷物も
                            ウォークインクローゼットで大きめの荷物も
                          </RowBody>
                        </Row>
                      </Rows>
                      <All>もっと見る</All>
                    </Hoge>
                  </>
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
