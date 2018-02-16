import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';

import List, {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';

const generate = element => {
  return [...Array(4)].map((v, i) =>
    React.cloneElement(element, {
      key: i,
    }),
  );
};

class SpaceManageList extends React.Component {
  render() {
    return (
      <div
        style={{
          width: '50vw',
          margin: '20px auto',
        }}
      >
        <Typography type="title" component="h1">
          場所の管理をする
        </Typography>
        <hr color="#eee" />
        <Grid style={{ maxWidth: '100%' }} item xs={12} md={6}>
          <div>
            <List>
              {generate(
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Icon>place</Icon>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="TOKYO DESIGN OFFICE ~ MONOOQ ~" />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="settings" component={Link} to={'/edit/space/1'}>
                      <Icon>settings</Icon>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>,
              )}
            </List>
          </div>
        </Grid>
      </div>
    );
  }
}

const styles = () => ({
  root: {
    width: '50vw',
    margin: '0 auto',
  },
  profileForm: {
    textAlign: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    margin: 'auto',
  },
  form: {
    width: '300px',
    margin: '0 auto',
  },
});

export default withStyles(styles)(SpaceManageList);
