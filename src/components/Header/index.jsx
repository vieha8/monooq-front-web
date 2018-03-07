import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui-icons/Search';
import MessageIcon from 'material-ui-icons/Message';
import Hidden from 'material-ui/Hidden';
import { media } from 'helpers/style/media-query';
import logo from 'images/monooq_logo.svg';
import { authActions } from 'redux/modules/auth';

import styled from 'styled-components';
import HeaderMenu from './HeaderMenu';

const Root = styled.div`
  width: 100%;
  padding-bottom: 100px;
  ${media.phone`
    padding-bottom: 56px;
  `};
`;

const StyledAppBar = styled(AppBar)`
  && {
    box-shadow: none;
  }
`;

const StyledTypography = styled(Typography)`
  flex: 1;
`;

const StyledIconButton = styled(IconButton)`
  margin-left: -12px;
  margin-right: 20px;
`;

class Header extends React.Component {
  logout = async () => {
    this.props.dispatch(authActions.logout());
    this.props.history.push('/login');
  };

  renderLoginComponent = () => {
    if (this.props.isLogin) {
      return (
        <Fragment>
          <StyledIconButton
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
          <Button onClick={() => this.props.history.push('/login')}>ログイン</Button>
          <Button onClick={() => this.props.history.push('/signup')}>登録</Button>
        </Hidden>
      </Fragment>
    );
  };

  render() {
    return (
      <Root>
        <StyledAppBar position="fixed" color="default">
          <Toolbar>
            <StyledTypography type="title">
              <Link to="/">
                <img src={logo} alt="logo" width="150" />
              </Link>
            </StyledTypography>
            <StyledIconButton
              aria-label="Search"
              onClick={() => this.props.history.push('/search/東京都')}
            >
              <SearchIcon />
            </StyledIconButton>
            {this.renderLoginComponent()}
            <HeaderMenu {...this.props} logout={this.logout} />
          </Toolbar>
        </StyledAppBar>
      </Root>
    );
  }
}

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
  isChecking: state.auth.isChecking,
  ui: state.ui,
});

// TODO composeでまとめる
export default connect(mapStateToProps)(withRouter(Header));
