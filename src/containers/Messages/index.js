import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import authRequired from 'components/Auth';
import { createRoom, messagesActions } from 'redux/modules/messages';
import { Footer } from 'components/Shared';

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

const MessagesMenuContainer = styled.div`
  width: 328px;
  ${media.phone`
    display: none;
  `};
`;

const MessagesListContainer = styled.div`
  width: 688px;
  border: 1px solid #dbdbdb;
`;

const MessagesMenu = () => {
  const Menu = styled.ul`
    width: 100%;
    ${media.phone`
    `};
  `;

  const MenuIcon = styled.span`
    font-size: 1.5rem;
    float: right;
  `;

  const MenuItem = props => {
    const StyledContainer = styled.li`
      width: 100%;
      height: 57px;
      line-height: 57px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5);
      padding: 0 18px;
      :hover {
        cursor: pointer;
        background: rgba(0, 0, 0, 0.1);
      }
      ${media.phone`
      `};
    `;
    return (
      <StyledContainer>
        {props.title}
        {props.notice ? (
          <MenuIcon>
            <span className="fa-layers fa-fw">
              <i className="fas fa-circle" style={{ color: '#e85258' }} />
              <span className="fa-layers-text fa-inverse" data-fa-transform="shrink-9">
                99
              </span>
            </span>
          </MenuIcon>
        ) : (
          ``
        )}
      </StyledContainer>
    );
  };

  return (
    <Menu>
      <MenuItem title="メッセージ" notice={true} />
      <MenuItem title="預かりスケジュール" />
      <MenuItem title="支払い履歴" notice={true} />
      <MenuItem title="ホストになる" />
      <MenuItem title="ホストモードに切り替える" />
      <MenuItem title="お問い合わせ" />
      <MenuItem title="ログアウト" />
    </Menu>
  );
};

const MessagesItem = props => {
  return (
    <li
      onClick={() => {
        props.onClickdMessagesItem();
      }}
      className={props.className}
    >
      {props.children}
    </li>
  );
};

const StyledMessagesItem = styled(MessagesItem)`
  height: 104px;
  border-bottom: 1px solid #dbdbdb;
  padding: 20px;
  display: flex;
  :hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.1);
  }
`;

const MessagesItemText = props => {
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
  return (
    <div className={props.className} onClick={() => props.onClick}>
      <PrimaryText>{props.primary}</PrimaryText>
      <SecondaryText>
        <i className="far fa-clock" /> {props.secondary}
      </SecondaryText>
    </div>
  );
};

const StyledMessagesItemText = styled(MessagesItemText)`
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
            <MessagesMenuContainer>
              <MessagesMenu />
            </MessagesMenuContainer>

            <MessagesListContainer>
              {this.props.rooms.map((v, i) => {
                return (
                  <StyledMessagesItem
                    key={i}
                    button
                    divider
                    onClickdMessagesItem={() => {
                      history.push('/messages/' + v.id);
                    }}
                  >
                    <Avatar src={v.guestUserImgUrl} />
                    <StyledMessagesItemText primary={v.guestUserName} secondary={v.lastMessage} />
                  </StyledMessagesItem>
                );
              })}
            </MessagesListContainer>
          </FlexWrapper>

          {(() => {
            if (this.props.rooms.length === 0) {
              return <Button onClick={this.createSampleRoom}>サンプルルーム作成</Button>;
            }
          })()}
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

const mapStateToProps = state => {
  return {
    rooms: state.messages.rooms,
    isLoading: state.messages.isLoading,
    userId: state.auth.user.id,
  };
};

export default compose(withStyles(styles), authRequired, connect(mapStateToProps))(Messages);
