// @flow

import React, { Component } from 'react';
import BurgerMenu from 'react-burger-menu';
import TextButton from 'components/atomic/LV1/TextButton';
import TextLink from 'components/atomic/LV1/TextLink';
import Button from 'components/atomic/LV1/Button';

import MenuWrap from './menuwrap';

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
      <TextLink href={this.props.homeUri}>
        <span>ホーム</span>
      </TextLink>,
      <TextLink href={this.props.messageUri}>
        <span>メッセージ</span>
      </TextLink>,
      <TextLink href={this.props.scheduleUri}>
        <span>利用状況</span>
      </TextLink>,
      <TextLink href={this.props.createSpaceInfoUri}>
        <span>スペースの登録</span>
      </TextLink>,
      <TextLink href={this.props.spacesUri}>
        <span>スペースの管理</span>
      </TextLink>,
      <TextLink href={this.props.salesUri}>
        <span>売り上げ・振込申請</span>
      </TextLink>,
      <TextLink href={this.props.helpUri} target="_blank">
        <span>ヘルプ</span>
      </TextLink>,
      <TextLink href={this.props.inquiryUri}>
        <span>お問い合わせ</span>
      </TextLink>,
      <TextLink href={this.props.homeUri}>
        <span>モノオクの使い方</span>
      </TextLink>,
      <TextLink href={this.props.homeUri}>
        <span>その他</span>
      </TextLink>,
      <TextButton
        href="#"
        // TODO:ログアウト処理実装
        // onClick={this.props.logout.onClick}
      >
        <span>ログアウト(未実装)</span>
      </TextButton>,
      <Button primary link href={this.props.tidyUri} height={60}>
        Tidy
      </Button>,
    ];
    return items;
  };

  getMenu = () => {
    const Menu = BurgerMenu[this.state.currentMenu];
    const items = this.getItems();
    const jsx = (
      <MenuWrap wait={20} side={this.state.side}>
        <Menu
          id={this.state.currentMenu}
          pageWrapId="outer-container"
          outerContainerId="root"
          right
        >
          {items}
        </Menu>
      </MenuWrap>
    );
    return jsx;
  };

  render() {
    return <div id="outer-container">{this.getMenu()}</div>;
  }
}

export default SlideMenu;
