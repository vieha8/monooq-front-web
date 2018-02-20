import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Hidden from 'material-ui/Hidden';
import SearchIcon from 'material-ui-icons/Search';

import styled from 'styled-components';
import { Colors, Dimens, FontSizes } from '../variables';

const IMAGE_URL = 'https://picsum.photos/1280/800?image=1012';

const TopPage = styled.div`
  margin-top: -20px;
  background: ${Colors.lightGray};
`;

const TopView = styled.div`
  padding: 196px 116px 0 116px;
  height: 800px;
  margin-top: -64px;
  background-image: url(${IMAGE_URL});
  background-size: cover;
  color: rgb(255, 255, 255);
  box-sizing: border-box;
`;

const Monooq = styled.span`
  display: inline-block;
  font-family: sans-serif;
  font-size: 20px;
  width: 561px;
  font-weight: 100;
`;

const CatchPhrase = styled.div`
  font-size: 34px;
  font-family: sans-serif;
  line-height: 57px;
  text-align: left;
  width: 556px;
  height: 114px;
`;

const SubCatchPhrase = styled.span`
  display: inline-block;
  font-family: sans-serif;
  font-size: 26px;
  width: 561px;
  font-weight: 100;
  line-height: 42px;
  margin-top: 9px;
`;

const SearchInput = styled.input`
  margin: 0;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 20px;
  display: inline-block;
  vertical-align: middle;
  background: #fff;
  height: 60px;
  width: 507px;
  line-height: 20px;
  box-sizing: border-box;
  font-size: 14px;
  font-family: sans-serif;
`;

const ToHostRegist = styled.a`
  font-family: sans-serif;
  font-size: 18px;
  color: rgb(255, 255, 255);
  line-height: 42px;
  margin-left: 175px;
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
              <Monooq>monooQ</Monooq>
              <CatchPhrase>
                個人間だからできる、<br />荷物を預けるための新しい方法。
              </CatchPhrase>
              <SubCatchPhrase>
                モノオクは余った個人のスペースを活用して、荷物を預けることができるサービスです。
              </SubCatchPhrase>
            </Hidden>
            <Hidden smUp>
              <Typography type="title" component="h1" style={{ fontWeight: 'bold' }}>
                モノがあふれていませんか?
              </Typography>
            </Hidden>
            <div className={classes.search}>
              <SearchInput
                id="location"
                placeholder="近くの場所を検索してみよう！　例）東京都港区?"
                value={this.state.location}
                onChange={this.handleChange}
                margin="normal"
              />
              <Button
                className={classes.button}
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
            <ToHostRegist component={Link} href={'/edit/profile/1'}>
              ホスト登録はこちら
            </ToHostRegist>
          </div>
        </TopView>
      </TopPage>
    );
  }
}

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  search: {
    marginTop: 20,
    marginBottom: '40px',
  },
  button: {
    left: '-50px',
  },
});

export default withStyles(styles)(Top);
