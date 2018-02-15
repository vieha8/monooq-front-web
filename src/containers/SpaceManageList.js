import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/';

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
        <Header />
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

export default SpaceManageList;
