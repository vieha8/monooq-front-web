import React, { Fragment } from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import { uiActions } from 'redux/modules/ui';

class HeaderMenu extends React.Component {
  constructor(props) {
    super(props);

    this.props.dispatch(
      uiActions.setUiState({
        anchorHeaderMenuDom: null,
      }),
    );
  }

  handleClick = event => {
    this.props.dispatch(
      uiActions.setUiState({
        anchorHeaderMenuDom: event.currentTarget,
      }),
    );
  };

  handleClose = () => {
    this.props.dispatch(
      uiActions.setUiState({
        anchorHeaderMenuDom: null,
      }),
    );
  };

  logout = () => {
    this.handleClose();
    this.props.logout();
  };

  renderLoginComponent = () => {
    if (!this.props.isLogin) {
      return (
        <Fragment>
          <MenuItem onClick={this.handleClose}>ログイン</MenuItem>
          <MenuItem onClick={this.handleClose}>会員登録</MenuItem>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <MenuItem onClick={this.logout}>ログアウト</MenuItem>
      </Fragment>
    );
  };

  render() {
    const { ui } = this.props;

    return (
      <div>
        <IconButton
          aria-owns={ui.anchorHeaderMenuDom ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={ui.anchorHeaderMenuDom}
          open={Boolean(ui.anchorHeaderMenuDom)}
          onClose={this.handleClose}
        >
          {this.renderLoginComponent()}
          <MenuItem onClick={this.handleClose}>ホスト検索</MenuItem>
          <MenuItem onClick={this.handleClose}>はじめての方へ</MenuItem>
          <MenuItem onClick={this.handleClose}>運営会社</MenuItem>
          <MenuItem onClick={this.handleClose}>お問い合わせ</MenuItem>
          <MenuItem onClick={this.handleClose}>プライバシーポリシー</MenuItem>
          <MenuItem onClick={this.handleClose}>利用規約</MenuItem>
          <MenuItem onClick={this.handleClose}>特定商取引法に基づく表示</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default HeaderMenu;
