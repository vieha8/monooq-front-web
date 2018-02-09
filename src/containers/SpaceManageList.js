import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/';

import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';

const generate = (element) => {
  return [0, 1, 2, 3].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const SpaceManageList = () => {
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
      <Grid style={{maxWidth: "100%"}} item xs={12} md={6}>

        <div>
          <List>
            {generate(
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Icon>place</Icon>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="TOKYO DESIGN OFFICE ~ MONOOQ ~"
                />
                <ListItemSecondaryAction>
                  <IconButton aria-label="settings" component={Link} to={"/edit/space/1"}>
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

export default SpaceManageList;
