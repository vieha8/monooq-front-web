// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import BurgerMenu from 'react-burger-menu';
import TextLink from 'components/atomic/LV1/TextLink';
import Button from 'components/atomic/LV1/Button';
import AvatarIcon from 'components/atomic/LV2/HeaderAction/AvatarIcon';
import { OtherIcon } from 'components/atomic/LV1/ActionIcon';
import { Dimens, Colors } from 'variables';

import MenuWrap from './menuwrap';

const AvaterName = styled.span`
  display: inline-block !important;
  font-weight: bold;
  vertical-align: middle;
  max-width: 140px;
  margin-left: ${Dimens.medium}px;
`;

const OtherIconWrap = styled.span`
  display: inline-block !important;
  vertical-align: middle;
  float: right;
`;

const LinkWrap = styled.span`
  padding: 20px 0;
  ${props =>
    props.Separate &&
    `
    border-top: 1px solid ${Colors.borderGray};
  `};
`;

class SlideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMenu: 'slide',
      side: 'right',
    };
  }

  getItems = () => {
    const items = [
      <LinkWrap key="0">
        <AvatarIcon imageSrc={this.props.user.image} size={40} to={this.props.editProfileUri} />
        <TextLink href={this.props.editProfileUri}>
          <AvaterName>{this.props.user.name}</AvaterName>
        </TextLink>
        <OtherIconWrap>
          <TextLink href={this.props.editProfileUri}>
            <OtherIcon />
          </TextLink>
        </OtherIconWrap>
      </LinkWrap>,
      <LinkWrap key="1" Separate>
        <TextLink to={this.props.homeUri}>ホーム</TextLink>
      </LinkWrap>,
      <LinkWrap key="2">
        <TextLink to={this.props.messageUri}>メッセージ</TextLink>
      </LinkWrap>,
      <LinkWrap key="3">
        <TextLink to={this.props.scheduleUri}>利用状況</TextLink>
      </LinkWrap>,
      <LinkWrap key="4" Separate>
        <TextLink to={this.props.createSpaceInfoUri}>スペースの登録</TextLink>
      </LinkWrap>,
      <LinkWrap key="5">
        <TextLink to={this.props.spacesUri}>スペースの管理</TextLink>
      </LinkWrap>,
      <LinkWrap key="6">
        <TextLink to={this.props.salesUri}>売り上げ・振込申請</TextLink>
      </LinkWrap>,
      <LinkWrap key="7" Separate>
        <TextLink href={this.props.helpUri} target="_blank">
          ヘルプ
        </TextLink>
      </LinkWrap>,
      <LinkWrap key="8">
        <TextLink to={this.props.inquiryUri}>お問い合わせ</TextLink>
      </LinkWrap>,
      <LinkWrap key="9">
        <TextLink to={this.props.howToUseUri}>モノオクの使い方</TextLink>
      </LinkWrap>,
      <LinkWrap key="10">
        <TextLink to={this.props.otherUri}>その他</TextLink>
      </LinkWrap>,
    ];
    return items;
  };

  getMenu = () => {
    const Menu = BurgerMenu[this.state.currentMenu];
    const items = this.getItems();
    const jsx = (
      <MenuWrap wait={20} side={this.state.side}>
        <Menu id={this.state.currentMenu} right>
          {items}
        </Menu>
      </MenuWrap>
    );
    return jsx;
  };

  render() {
    return <div>{this.getMenu()}</div>;
  }
}

export default SlideMenu;
