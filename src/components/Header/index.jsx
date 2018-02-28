import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from 'material-ui/styles';
import firebase from 'firebase';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui-icons/Search';
import MessageIcon from 'material-ui-icons/Message';
import Hidden from 'material-ui/Hidden';

import styled from 'styled-components';
import { Colors } from '../../variables';
import logo from '../../images/monooq_logo.svg';
import HeaderMenu from './HeaderMenu';
import { authActions } from '../../redux/modules/auth';

const StyledAppBar = styled(AppBar)`
  && {
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: none;
    height: 80px;
  }
`;

const StyledToolbar = styled(Toolbar)`
  && {
    height: 100%;
  }
`;

const StyledIconButton = styled(IconButton)`
  && {
    color: ${Colors.white};
  }
`;

const StyledButton = styled(Button)`
  && {
    color: ${Colors.white};
  }
`;

const Logo = styled.img`
  border-radius: 4px;
  // FIXME: 背景色の調整
  background-color: rgba(255, 255, 255, 0.9);
`;

class Header extends React.Component {
  logout = async () => {
    await firebase.auth().signOut();
    this.props.dispatch(authActions.logout());
    this.props.history.push('/login');
  };

  renderLoginComponent = () => {
    const { classes } = this.props;
    if (this.props.isLogin) {
      return (
        <Fragment>
          <StyledIconButton
            className={classes.searchButton}
            aria-label="Message"
            onClick={() => this.props.history.push('/messages')}
          >
            <MessageIcon />
          </StyledIconButton>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <Hidden xsDown>
          <StyledButton onClick={() => this.props.history.push('/login')}>ログイン</StyledButton>
          <StyledButton onClick={() => this.props.history.push('/signup')}>登録</StyledButton>
        </Hidden>
      </Fragment>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <StyledAppBar position="fixed" color="default">
          <StyledToolbar>
            <Typography type="title" className={classes.flex}>
              <Link to="/">
                <Logo src={logo} alt="logo" width="150" />
              </Link>
            </Typography>
            <StyledIconButton
              className={classes.searchButton}
              aria-label="Search"
              onClick={() => this.props.history.push('/search/東京都')}
            >
              <SearchIcon />
            </StyledIconButton>
            {this.renderLoginComponent()}
            <HeaderMenu {...this.props} logout={this.logout} />
          </StyledToolbar>
        </StyledAppBar>
      </div>
    );
  }
}

const styles = {
  flex: {
    flex: 1,
  },
  searchButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
  isChecking: state.auth.isChecking,
  ui: state.ui,
});

// TODO composeでまとめる
export default connect(mapStateToProps)(withRouter(withStyles(styles)(Header)));
