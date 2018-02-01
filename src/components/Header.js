import React from 'react';
import {Link} from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui-icons/Search';
import Hidden from 'material-ui/Hidden';

import logo from '../images/monooq_logo.svg';
import HeaderMenu from './HeaderMenu';

const Header = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography type="title" className={classes.flex}>
            <Link to="/" style={{textDecoration: 'none'}}><img src={logo} alt="logo" width="150" /></Link>
          </Typography>
          <IconButton className={classes.searchButton} aria-label="Search">
            <SearchIcon />
          </IconButton>
          <Hidden xsDown>
            <Button>ログイン</Button>
            <Button>登録</Button>
          </Hidden>
          <HeaderMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
};

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  searchButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

export default withStyles(styles)(Header);