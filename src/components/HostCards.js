import React from 'react';
import { withStyles } from 'material-ui/styles';

import HostCard from './HostCard';

class HostCards extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <HostCard />
        <HostCard />
        <HostCard />
        <HostCard />
        <HostCard />
        <HostCard />
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  }
});

export default withStyles(styles)(HostCards);