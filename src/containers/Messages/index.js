import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { defaultPageFactory } from '../../components/PageLayouts';
import authRequired from '../../components/Auth';
import { messagesActions } from '../../modules/messages';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.pageTitle = 'メッセージ';
    const userId = '1'; //TODO authのReducerから取る
    this.props.dispatch(messagesActions.fetchRoomsStart(userId));
  }

  contents = () => {
    const { classes, history } = this.props;
    return (
      <div className={classes.root}>
        <List component="nav">
          {this.props.rooms.map((v, i) => {
            return (
              <ListItem
                key={i}
                button
                divider
                onClick={() => {
                  history.push('/messages/' + v.id);
                }}
              >
                <Avatar src={v.guestUserImgUrl} />
                <ListItemText primary={v.guestUserName} secondary={v.lastMessage} />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  };

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

const mapStateToProps = state => {
  return {
    rooms: state.messages.rooms,
    isLoading: state.messages.isLoading,
  };
};

export default compose(withStyles(styles), authRequired, connect(mapStateToProps))(Messages);
