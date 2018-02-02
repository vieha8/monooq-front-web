import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';

import Header from '../components/Header';
import SpaceList from '../components/SpaceList';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: this.props.match.params.location,
      isLoad: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.showSpaceList = this.showSpaceList.bind(this);
    setTimeout(() => {
      this.setState({isLoad: true});
    }, 1500);
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  showSpaceList() {
    if(this.state.isLoad) {
      return <SpaceList />;
    } else {
      return (
        <div style={{textAlign: 'center'}}>
          <CircularProgress className={this.props.classes.progress} size={50} />
        </div>
      );
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header />
        <Paper elevation={0} className={classes.contents}>
          <Typography type="title" component="h2">
            {this.state.location}の検索結果
          </Typography>
        </Paper>
        <Paper elevation={0} style={{padding: 20}}>
          {this.showSpaceList()}
        </Paper>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
  },
  contents: {
    padding: 20,
    textAlign: 'center'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  search: {
    marginTop: 20
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
});

export default withStyles(styles)(Search);