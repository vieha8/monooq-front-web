import React from 'react';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Top = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Header />
      <Paper>
        <Typography type="headline" component="h3">
          Hello monooQ World.
        </Typography>
        <Typography component="p">
          Paper can be used to build surface or other elements for your application.
        </Typography>
      </Paper>
      <Footer />
    </div>
  );
};

const styles = {
  root: {
    width: '100%',
  },
};

export default withStyles(styles)(Top);