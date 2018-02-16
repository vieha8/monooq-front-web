import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import SpaceList from './Search/SpaceList';

const user = {
  name: 'sample host user',
  area: '東京',
  description:
    'サンプルの文章です。サンプルの文章のために書かれました。サンプルの文章です。サンプルの文章です。サンプルの文章のために書かれました。サンプルの文章です。',
};

class Profile extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.profile}>
          <Avatar className={classes.avatar} src="https://picsum.photos/300?image=65" />
          <br />
          <Typography type="title" gutterBottom>
            {user.name}
          </Typography>
          <Typography type="subheading" gutterBottom>
            {user.area}
          </Typography>
          <Typography gutterBottom>{user.description}</Typography>
        </div>

        <div>
          <hr color="#eee" />
          <Typography type="headline" gutterBottom>
            {user.name}さんの場所
          </Typography>
          <SpaceList />
        </div>
      </div>
    );
  }
}

const styles = () => ({
  root: {
    width: '50vw',
    margin: '0 auto',
  },
  profile: {
    textAlign: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    margin: 'auto',
  },
});

export default withStyles(styles)(Profile);
