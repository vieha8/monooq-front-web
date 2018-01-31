import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

const Footer = (props) => {
  const { classes } = props;
  return (
    <div className={props.root} style={{flex:1, textAlign: 'center'}}>
      <Divider />
      <Typography type="caption" className={classes.caption}>
        (c)モノオク 2018
      </Typography>
    </div>
  );
};

const styles = {
  root: {
    flexGrow: 1,
  },
  caption: {
    padding: 8
  }
};

export default withStyles(styles)(Footer);