import React from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { defaultPageFactory } from '../components/PageLayouts';

class Messages extends React.Component {

  constructor(props) {
    super(props);
    this.pageTitle = 'メッセージ';
    this.contents = this.contents.bind(this);
  }

  contents() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List component="nav">
          <ListItem button divider>
            <Avatar>
              MK
            </Avatar>
            <ListItemText primary="Masaya Kudo" secondary="こんにちは。来月から荷物を預かっていただきたいのですがお願い..." />
          </ListItem>
          <ListItem button divider>
            <Avatar>
              MK
            </Avatar>
            <ListItemText primary="Masaya Kudo" secondary="こんにちは。来月から荷物を預かっていただきたいのですがお願い..." />
          </ListItem>
          <ListItem button divider>
            <Avatar>
              MK
            </Avatar>
            <ListItemText primary="Masaya Kudo" secondary="こんにちは。来月から荷物を預かっていただきたいのですがお願い..." />
          </ListItem>
          <ListItem button divider>
            <Avatar>
              MK
            </Avatar>
            <ListItemText primary="Masaya Kudo" secondary="こんにちは。来月から荷物を預かっていただきたいのですがお願い..." />
          </ListItem>
          <ListItem button divider>
            <Avatar>
              MK
            </Avatar>
            <ListItemText primary="Masaya Kudo" secondary="こんにちは。来月から荷物を預かっていただきたいのですがお願い..." />
          </ListItem>
          <ListItem button divider>
            <Avatar>
              MK
            </Avatar>
            <ListItemText primary="Masaya Kudo" secondary="こんにちは。来月から荷物を預かっていただきたいのですがお願い..." />
          </ListItem>
          <ListItem button divider>
            <Avatar>
              MK
            </Avatar>
            <ListItemText primary="Masaya Kudo" secondary="こんにちは。来月から荷物を預かっていただきたいのですがお願い..." />
          </ListItem>
          <ListItem button divider>
            <Avatar>
              MK
            </Avatar>
            <ListItemText primary="Masaya Kudo" secondary="こんにちは。来月から荷物を預かっていただきたいのですがお願い..." />
          </ListItem>
          <ListItem button divider>
            <Avatar>
              MK
            </Avatar>
            <ListItemText primary="Masaya Kudo" secondary="こんにちは。来月から荷物を預かっていただきたいのですがお願い..." />
          </ListItem>
          <ListItem button>
            <Avatar>
              MK
            </Avatar>
            <ListItemText primary="Masaya Kudo" secondary="こんにちは。来月から荷物を預かっていただきたいのですがお願い..." />
          </ListItem>
        </List>
      </div>
    );
  }

  render() {
    const Page = defaultPageFactory(this.pageTitle, this.contents);
    return <Page />;
  }

}

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 720,
    backgroundColor: theme.palette.background.paper,
  },
});

export default withStyles(styles)(Messages);