import React, { Fragment } from 'react';
import Path from 'config/path';
import Avatar from 'material-ui/Avatar';
import { authConnect } from 'components/Auth';
import { messagesActions } from 'redux/modules/messages';
import Menu from 'containers/Menu';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import Page, { ContentContainer } from 'components/Page';
import { Dimens } from 'variables';

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
  border: 1px solid #dbdbdb;
  &:not(:first-child) {
    border-top: none;
  }
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

const Empty = styled.div`
  line-height: 1.5;
  ${media.phone`
    padding: 0 ${Dimens.medium}px;
  `}
`;

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(messagesActions.fetchRoomsStart());
  }

  render() {
    const { history, rooms } = this.props;
    return (
      <Page title="メッセージ一覧">
        <Fragment>
          <Menu />
          <ContentContainer>
            {(rooms.length === 0) ? <Empty>メッセージはまだありません。</Empty> : null}
            {rooms.map((v, i) => (
              <StyledMessagesItem
                key={i}
                button
                divider
                onClickdMessagesItem={() => {
                  history.push(Path.message(v.id));
                }}
              >
                <Avatar src={v.user.ImageUrl} />
                <StyledMessagesItemText
                  primary={v.user.Name}
                  secondary={`${v.lastMessageDt.toLocaleDateString()} ${v.lastMessageDt.toLocaleTimeString()}`}
                />
              </StyledMessagesItem>
            ))}
          </ContentContainer>
        </Fragment>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  rooms: state.messages.rooms,
  isLoading: state.messages.isLoading,
  user: state.auth.user,
});

export default authConnect(mapStateToProps)(Messages);
