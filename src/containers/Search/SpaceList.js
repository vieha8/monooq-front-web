import React from 'react';
import { withStyles } from 'material-ui/styles';

import SpaceCard from './SpaceCard';

class SpaceList extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpaceCard />
        <SpaceCard />
        <SpaceCard />
        <SpaceCard />
        <SpaceCard />
        <SpaceCard />
        <SpaceCard />
        <SpaceCard />
        <SpaceCard />
        <SpaceCard />
        <SpaceCard />
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
});

export default withStyles(styles)(SpaceList);
