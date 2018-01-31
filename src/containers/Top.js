import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import SearchIcon from 'material-ui-icons/Search';

import Header from '../components/Header';

class Top extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header />
        <Paper elevation={0} className={classes.contents}>
          <Typography type="headline" component="h3">
            家にモノがあふれていませんか?
          </Typography>
          <Typography component="p">
            ご近所に安くモノを預けよう!
          </Typography>
          <div className={classes.search}>
            <TextField
              id="location"
              placeholder="どこで預ける?"
              className={classes.textField}
              value={this.state.location}
              onChange={this.handleChange}
              margin="normal"
            />
            <Button fab color="primary" mini>
              <SearchIcon />
            </Button>
          </div>
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
  }
});

export default withStyles(styles)(Top);