import React from 'react';
import { withStyles } from 'material-ui/styles';

import Place from './Place';

class PlaceList extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Place />
        <Place />
        <Place />
        <Place />
        <Place />
        <Place />
        <Place />
        <Place />
        <Place />
        <Place />
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