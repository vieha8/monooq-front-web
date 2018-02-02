import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Hidden from 'material-ui/Hidden';
import SearchIcon from 'material-ui-icons/Search';

import Header from '../components/Header';

class Top extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: '',
      isDisableSearchButton: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if(event.target.value === "") {
      this.setState({isDisableSearchButton: true});
    } else {
      this.setState({isDisableSearchButton: false});
    }
    this.setState({[event.target.id]: event.target.value});
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header />
        <Paper elevation={0} className={classes.contents}>
          <Hidden xsDown>
            <Typography type="display2" component="h1">
              モノがあふれていませんか?
            </Typography>
          </Hidden>
          <Hidden smUp>
            <Typography type="title" component="h1" style={{fontWeight: 'bold'}}>
              モノがあふれていませんか?
            </Typography>
          </Hidden>
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
            <Button fab color="primary" mini
              component={Link} to={"/search/" + this.state.location}
                    disabled={this.state.isDisableSearchButton}
            >
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
    padding: 40,
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