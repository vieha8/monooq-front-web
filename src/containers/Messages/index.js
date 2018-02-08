import React from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { defaultPageFactory } from '../../components/PageLayouts';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.pageTitle = 'メッセージ';
    this.contents = this.contents.bind(this);
  }

  contents() {
    const { classes, history } = this.props;
    return (
      <div className={classes.root}>
        <List component="nav">
          {[...Array(10)].map(() => (
            <ListItem
              button
              divider
              onClick={() => {
                history.push('/message/1');
              }}
            >
              <Avatar>MK</Avatar>
              <ListItemText
                primary="Masaya Kudo"
                secondary="田中さん初めまして！メッセージありがとうございます。ぜひお預かりさ..."
              />
            </ListItem>
          ))}
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
    maxWidth: 720,
    backgroundColor: theme.palette.background.paper,
    margin: 'auto',
  },
});

export default withStyles(styles)(Messages);
