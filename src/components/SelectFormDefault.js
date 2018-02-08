import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

const styles = theme => ({
  container: {
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 170,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SelectFormDefault extends React.Component {
  state = {
    age: '',
    name: 'hai',
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">お住いの地域</InputLabel>
          <Select
            value={this.state.age}
            onChange={this.handleChange}
            inputProps={{
              name: 'area',
              id: 'area',
            }}
          >
            <MenuItem value="">
              <em>-</em>
            </MenuItem>
            <MenuItem value="tokyo">東京</MenuItem>
            <MenuItem value="osaka">大阪</MenuItem>
            <MenuItem value="fukuoka">福岡</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

SelectFormDefault.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectFormDefault);
