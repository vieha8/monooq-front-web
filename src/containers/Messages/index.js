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

import styled from 'styled-components';
import { isMobileWindow, media } from '../../helpers/style/media-query';
import { Colors, Dimens } from '../../variables';

const MessagesPage = styled.div`
  background: #fff;
  font-family: sans-serif;
`;

const MessagesContainer = styled.div`
  width: 1048px;
  margin: 0 auto;
`;

const PageTitle = styled.div`
  font-size: 34px;
  line-height: 51px;
  letter-spacing: -0.5px;
  margin-bottom: 52px;
`;

const MessagesMenuContainer = styled.div`
  float: left;
  width: 328px;
`;

const MessagesListContainer = styled.div`
  float: right;
  width: 688px;
`;

const MessagesMenu = () => {
  const Menu = styled.ul`
    width: 100%;
    ${media.phone`
    `};
  `;

  const Item = props => {
    const StyledContainer = styled.li`
      width: 100%;
      height: 57px;
      line-height: 57px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5);
      padding-left: 18px;
      :hover {
        cursor: pointer;
        background: rgba(0, 0, 0, 0.1);
      }
      ${media.phone`
      `};
    `;
    // {TODO}通知iconを追加
    return (
      <StyledContainer>
        <span>{props.title}</span>
      </StyledContainer>
    );
  };

  return (
    <Menu>
      <Item title="メッセージ" />
      <Item title="預かりスケジュール" />
      <Item title="支払い履歴" />
      <Item title="ホストになる" />
      <Item title="ホストモードに切り替える" />
      <Item title="お問い合わせ" />
      <Item title="ログアウト" />
    </Menu>
  );
};

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

  render() {
    const { classes, history } = this.props;
    return (
      <MessagesPage>
        <MessagesContainer>
          <PageTitle>{this.pageTitle}一覧</PageTitle>
          <MessagesMenuContainer>
            <MessagesMenu />
          </MessagesMenuContainer>

          <MessagesListContainer>
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
          </MessagesListContainer>

          {(() => {
            if (this.props.rooms.length === 0) {
              return <Button onClick={this.createSampleRoom}>サンプルルーム作成</Button>;
            }
          })()}
        </MessagesContainer>
      </MessagesPage>
    );
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
