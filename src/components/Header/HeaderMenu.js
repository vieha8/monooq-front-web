import React, { Fragment } from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import firebase from 'firebase';

class HeaderMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  logout = async () => {
    await firebase.auth().signOut();
    this.props.history.push('/login');
  };

  renderLoginComponent = () => {
    if (!this.props.isLogin) {
      return (
        <Fragment>
          <MenuItem onClick={this.handleClose}>ログイン</MenuItem>
          <MenuItem onClick={this.handleClose}>会員登録</MenuItem>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <MenuItem onClick={this.logout}>ログアウト</MenuItem>
        </Fragment>
      );
    }
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
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
