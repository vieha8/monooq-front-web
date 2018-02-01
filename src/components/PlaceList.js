import React from 'react';
import { withStyles } from 'material-ui/styles';

import PlaceCard from './PlaceCard';

class PlaceList extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <PlaceCard />
        <PlaceCard />
        <PlaceCard />
        <PlaceCard />
        <PlaceCard />
        <PlaceCard />
        <PlaceCard />
        <PlaceCard />
        <PlaceCard />
        <PlaceCard />
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

export default withStyles(styles)(PlaceList);