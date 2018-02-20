import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Hidden from 'material-ui/Hidden';
import SearchIcon from 'material-ui-icons/Search';

import styled from 'styled-components';
import { Colors, Dimens } from '../variables';

const IMAGE_URL = 'https://picsum.photos/1280/800?image=20';

const TopPage = styled.div`
  margin-top: -20px;
  background: ${Colors.lightGray};
`;

const TopView = styled.div`
  height: 800px;
  background-image: url(${IMAGE_URL});
  background-size: cover;
`;

const CatchPhrase = styled.div`
  font-size: 34px;
  font-family: sans-serif;
  text-align: left;
  width: 556px;
  height: 114px;
`;

class Top extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      isDisableSearchButton: true,
    };
  }

  handleChange = event => {
    if (event.target.value === '') {
      this.setState({ isDisableSearchButton: true });
    } else {
      this.setState({ isDisableSearchButton: false });
    }
    this.setState({ [event.target.id]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <TopPage>
        <TopView>
          <div className={classes.contents}>
            <Hidden xsDown>
              <CatchPhrase>
                個人間だからできる、<br />荷物を預けるための新しい方法。
              </CatchPhrase>
            </Hidden>
            <Hidden smUp>
              <Typography type="title" component="h1" style={{ fontWeight: 'bold' }}>
                モノがあふれていませんか?
              </Typography>
            </Hidden>
            <Typography component="p">ご近所に安くモノを預けよう!</Typography>
            <div className={classes.search}>
              <TextField
                id="location"
                placeholder="どこで預ける?"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                margin="normal"
              />
              <Button
                fab
                color="primary"
                mini
                component={Link}
                to={'/search/' + this.state.location}
                disabled={this.state.isDisableSearchButton}
              >
                <SearchIcon />
              </Button>
            </div>
          </div>
        </TopView>
      </TopPage>
    );
  }
}

const styles = theme => ({
  contents: {
    paddingTop: 80,
    textAlign: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  search: {
    marginTop: 20,
  },
});

export default withStyles(styles)(Top);
