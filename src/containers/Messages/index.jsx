import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import authRequired from 'components/Auth';
import { createRoom, messagesActions } from 'redux/modules/messages';
import { Footer } from 'components/Shared';
import UserMenu from 'components/Menu/UserMenu';
import Button from 'material-ui/Button';

import styled from 'styled-components';
import { media } from 'helpers/style/media-query';

const MessagesPage = styled.div``;

const MessagesContainer = styled.div`
  max-width: 1048px;
  margin: 0 auto 100px;
  ${media.phone`
    width: 100%;
  `};
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const PageTitle = styled.div`
  font-size: 34px;
  line-height: 51px;
  letter-spacing: -0.5px;
  margin-bottom: 52px;
  ${media.phone`
    font-size: 22px;
    line-height: inherit;
    padding: 0 20px;
    margin-bottom: 20px;
  `};
`;

const MessagesListContainer = styled.div`
  width: 688px;
  border: 1px solid #dbdbdb;
`;

const MessageListItem = styled.li``;
const MessagesItem = props => (
  <MessageListItem
    onClick={() => {
      props.onClickdMessagesItem();
    }}
    className={props.className}
  >
    {props.children}
  </MessageListItem>
);

const StyledMessagesItem = styled(MessagesItem) `
  height: 104px;
  border-bottom: 1px solid #dbdbdb;
  padding: 20px;
  display: flex;
  :hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.1);
  }
`;

const PrimaryText = styled.div`
  font-size: 14px;
  line-height: 28px;
  ${media.phone`
    font-size: 11px;
    line-height: 18px;
  `};
`;

const SecondaryText = styled.div`
  font-size: 12px;
  line-height: 14px;
  font-weight: 100;
  color: #b4b4b4;
`;

const MessageTextBox = styled.div`
`;

const MessagesItemText = props => (
  <MessageTextBox className={props.className} onClick={props.onClick}>
    <PrimaryText>{props.primary}</PrimaryText>
    <SecondaryText>
      <i className="far fa-clock" /> {props.secondary}
    </SecondaryText>
  </MessageTextBox>
);

const StyledMessagesItemText = styled(MessagesItemText) `
  padding-left: 20px;
`;

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
    const { history } = this.props;
    return (
      <MessagesPage>
        <MessagesContainer>
          <PageTitle>{this.pageTitle}一覧</PageTitle>
          <FlexWrapper>
            <UserMenu messageCount={99} scheduleCount={9} />
            <MessagesListContainer>
              {this.props.rooms.map((v, i) => (
                <StyledMessagesItem
                  key={i}
                  button
                  divider
                  onClickdMessagesItem={() => {
                    history.push(`/messages/${v.id}`);
                  }}
                >
                  <Avatar src={v.guestUserImgUrl} />
                  <StyledMessagesItemText primary={v.guestUserName} secondary={v.lastMessage} />
                </StyledMessagesItem>
              ))}
            </MessagesListContainer>
          </FlexWrapper>
          {this.props.rooms.length === 0 &&
            <Button onClick={this.createSampleRoom}>サンプルルーム作成</Button>
          }
        </MessagesContainer>
        <Footer />
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

const mapStateToProps = state => ({
  rooms: state.messages.rooms,
  isLoading: state.messages.isLoading,
  userId: state.auth.user.id,
});

export default compose(withStyles(styles), authRequired, connect(mapStateToProps))(Messages);
