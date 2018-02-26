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
import logo from '../../images/monooq_logo.svg';
import HeaderMenu from './HeaderMenu';
import { authActions } from '../../redux/modules/auth';

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
          <IconButton
            className={classes.searchButton}
            aria-label="Message"
            onClick={() => this.props.history.push('/messages')}
          >
            <MessageIcon />
          </IconButton>
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
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="default">
          <Toolbar>
            <Typography type="title" className={classes.flex}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <img src={logo} alt="logo" width="150" />
              </Link>
            </Typography>
            <IconButton
              className={classes.searchButton}
              aria-label="Search"
              onClick={() => this.props.history.push('/search/東京都')}
            >
              <SearchIcon />
            </IconButton>
            {this.renderLoginComponent()}
            <HeaderMenu
              {...this.props}
              logout={this.logout}
            />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const styles = {
  root: {
    width: '100%',
    marginBottom: 80,
  },
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
  isChecking:
  state.auth.isChecking,
  ui: state.ui,
});

// TODO composeでまとめる
export default connect(mapStateToProps)(withRouter(withStyles(styles)(Header)));
