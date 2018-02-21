import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { defaultPageFactory } from '../../components/PageLayouts';
import authRequired from '../../components/Auth';
import { messagesActions } from '../../redux/modules/messages';

import Button from 'material-ui/Button';
import { createRoom } from '../../redux/modules/messages';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.pageTitle = 'メッセージ';
    const userId = this.props.userId;
    this.props.dispatch(messagesActions.fetchRoomsStart(userId));
  }

  createSampleRoom = () => {
    createRoom(this.props.userId);
    createRoom(this.props.userId);
    createRoom(this.props.userId);
    createRoom(this.props.userId);
    createRoom(this.props.userId);
    this.props.dispatch(messagesActions.fetchRoomsStart(this.props.userId));
  };

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
        {(() => {
          if (this.props.rooms.length === 0) {
            return <Button onClick={this.createSampleRoom}>サンプルルーム作成</Button>;
          }
        })()}
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
    userId: state.auth.user.id,
  };
};

export default compose(withStyles(styles), authRequired, connect(mapStateToProps))(Messages);
