import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';

import { searchActions } from '../../redux/modules/search';

import SpaceCard from './SpaceCard';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: this.props.match.params.location,
    };
    this.props.dispatch(searchActions.fetchStartSearch(this.state.location));
  }

  showSpaceList = () => {
    if (!this.props.isLoading) {
      return (
        <div className={this.props.classes.list}>
          {this.props.spaces.map((v, i) => {
            return <SpaceCard key={i} />;
          })}
        </div>
      );
    } else {
      return (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress className={this.props.classes.progress} size={50} />
        </div>
      );
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <Paper elevation={0} className={classes.contents}>
          <Typography type="title" component="h2">
            {this.props.location}の検索結果
          </Typography>
        </Paper>
        <Paper elevation={0} style={{ padding: 20 }}>
          {this.showSpaceList()}
        </Paper>
      </div>
    );
  }
}

const styles = theme => ({
  contents: {
    padding: 20,
    textAlign: 'center',
  },
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
  wrapper: {
    maxWidth: 720,
    margin: 'auto',
  },
  list: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
});

const mapStateToProps = state => {
  return {
    isLoading: state.search.isLoading,
    location: state.search.location,
    spaces: state.search.spaces,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Search));
