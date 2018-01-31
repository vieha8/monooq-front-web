import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import SearchIcon from 'material-ui-icons/Search';
import { CircularProgress } from 'material-ui/Progress';

import Header from '../components/Header';
import HostCards from '../components/HostCards';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: this.props.match.params.location,
      isLoad: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.showHostCards = this.showHostCards.bind(this);
    setTimeout(() => {
      this.setState({isLoad: true});
    }, 1500);
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  showHostCards() {
    if(this.state.isLoad) {
      return <HostCards />;
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
          {this.showHostCards()}
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