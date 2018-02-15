import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';

import { searchActions } from '../../modules/search';

import Header from '../../components/Header/';
import SpaceList from './SpaceList';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: this.props.match.params.location,
    };
    this.props.dispatch(searchActions.fetchStartSearch());
  }

  showSpaceList = () => {
    if (!this.props.isLoading) {
      return <SpaceList />;
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
      <Fragment>
        <Header />
        <div className={classes.wrapper}>
          <Paper elevation={0} className={classes.contents}>
            <Typography type="title" component="h2">
              {this.state.location}の検索結果
            </Typography>
          </Paper>
          <Paper elevation={0} style={{ padding: 20 }}>
            {this.showSpaceList()}
          </Paper>
        </div>
      </Fragment>
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
});

const mapStateToProps = state => {
  return {
    isLoading: state.search.isLoading,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Search));
