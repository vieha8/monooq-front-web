import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { withStyles } from 'material-ui/styles';
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
import { checkLogin } from '../../libs/auth';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }

  componentWillMount = async () => {
    const isLogin = await checkLogin();
    this.setState({ isLogin: isLogin });
  };

  renderLoginComponent = () => {
    const { classes } = this.props;
    if (this.state.isLogin) {
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
    } else {
      return (
        <Fragment>
          <Hidden xsDown>
            <Button onClick={() => this.props.history.push('/login')}>ログイン</Button>
            <Button onClick={() => this.props.history.push('/signup')}>登録</Button>
          </Hidden>
        </Fragment>
      );
    }
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
            <HeaderMenu isLogin={this.state.isLogin} history={this.props.history} />
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

export default withRouter(withStyles(styles)(Header));
