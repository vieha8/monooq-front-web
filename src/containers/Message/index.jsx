import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from 'material-ui/styles';
import authRequired from 'components/Auth';
import { messagesActions } from 'redux/modules/messages';
import { uiActions } from 'redux/modules/ui';

import styled from 'styled-components';
import { Colors } from 'variables';
import { media } from '../../helpers/style/media-query';

const MessagePage = styled.div``;

const MessageContainer = styled.div`
  max-width: 1048px;
  margin: 0 auto;
`;

const PageTitle = styled.div`
  font-size: 34px;
  line-height: 51px;
  letter-spacing: -0.5px;
  margin-bottom: 52px;
  ${media.phone`
    padding: 0 20px;
    font-size: 12px;
    line-height: 18px;
    margin-bottom: 20px;
  `};
`;

const Information = props => {
  const Title = styled.div`
    font-size: 18px;
    line-height: 32px;
    margin-bottom: 15px;
  `;
  const Wrapper = styled.div`
    display: flex;
  `;
  const Image = styled.img`
    width: 104px;
    height: 79px;
    object-fit: cover;
    margin-right: 20px;
  `;

  const Area = styled.div`
    font-size: 12px;
    line-height: 18px;
    margin-bottom: 5px;
    color: #e85258;
  `;

  const Description = styled.div`
    font-size: 12px;
    line-height: 18px;
  `;

  return (
    <div className={props.className}>
      <Title>ホストは YUKI HASHIDA さん</Title>
      <Wrapper>
        <Image src="https://picsum.photos/150?image=42" />
        <div>
          <Area>東京都 港区 六本木</Area>
          <Description>
            東京タワーに近くて便利！大きい荷物も何人分でもOK何人分で荷物も何人分でもOK何人分で…
          </Description>
        </div>
      </Wrapper>
    </div>
  );
};

const MobileInformation = props => {
  const NoticeIcon = styled.div`
    font-size: 20px;
    margin-right: 10px;
  `;
  const NoticeContainer = styled.div`
    font-size: 11px;
    display: flex;
  `;
  const MobileInformationButtonContainer = styled.div`
    font-size: 11px;
    display: flex;
  `;
  const ButtonIcon = styled.div`
    font-size: 20px;
    margin-left: 10px;
    cursor: pointer;
  `;
  return (
    <div className={props.className}>
      <NoticeContainer>
        <NoticeIcon>
          <i className="far fa-bell" />
        </NoticeIcon>
        <div>ホストの承認を待っています</div>
      </NoticeContainer>
      <MobileInformationButtonContainer>
        <div>リクエスト詳細</div>
        <ButtonIcon>
          <i className="fas fa-angle-down" />
        </ButtonIcon>
      </MobileInformationButtonContainer>
    </div>
  );
};

const StyledMobileInformation = styled(MobileInformation)`
  display: none;
  ${media.phone`
    color: #888787;
    margin-top: -20px;
    margin-bottom: 20px;
    padding: 0 14px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #f7f7f7;
  `};
`;

const InformationContainer = styled.div`
  width: 328px;
  font-weiht: 100;
  ${media.phone`
    display: none;
  `};
`;

const RecordsContainer = styled.div`
  width: 688px;
`;

const ContentsWrapper = styled.div`
  ${media.phone`
    padding: 0 20px;
  `};
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Record = props => {
  const RecordLink = styled.div`
    color: #006494;
    float: right;
    margin-top: 30px;
    cursor: pointer;
  `;
  let RecordLinkComponent = '';
  if (props.hasLink) {
    RecordLinkComponent = <RecordLink>この見積もりでお支払いに進む</RecordLink>;
  }
  return (
    <div className={props.className}>
      {props.text}
      {RecordLinkComponent}
    </div>
  );
};

const StyledRecord = styled(Record)`
  float: left;
  max-width: 584px;
  border-radius: 5px;
  background-color: #fff;
  border: 1px solid #d6d6d6;
  padding: 20px;
  margin-right: auto;
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 28px;
  font-weight: 100;
  word-wrap: break-word;
  ${media.phone`
    max-width: 260px;
    font-size: 11px;
    line-height: 18px;
  `};
  ${props =>
    props.myMessage
      ? `
        float: right;
        background-color: #feebeb;
        margin-left: auto;
        border: 0;
    `
      : ''};
  ${props =>
    props.specialMessage
      ? `
        width: 100%;
        background-color: #d9ffe5;
        border: 0;
        max-width: 100%;
    `
      : ''};
`;

const AddFile = styled.div`
  display: flex;
`;

const AddFileIcon = styled.div`
  color: #bcbcbc;
  font-size: 30px;
`;

const AddFileText = styled.div`
  color: #bcbcbc;
  font-size: 12px;
  line-height: 30px;
  padding-left: 9px;
  cursor: pointer;
  ${media.phone`
    font-size: 12px;
  `};
`;

const AddMessageTextarea = styled.textarea`
  width: 100%;
  height: 160px;
  font-size: 14px;
  color: ${Colors.darkGray1};
  padding: 15px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 1px solid #bcbcbc;
  border-radius: 2px;
  background-color: #fafafa;
  resize: none;
  &:placeholder-shown,
  &::-webkit-input-placeholder,
  &::-moz-placeholder,
  &:-ms-input-placeholder {
    color: ${Colors.lightGray1};
  }
`;

const AddMessageButton = styled.div`
  text-align: center;
  font-size: 16px;
  line-height: 16px;
  padding: 18px 0;
  margin-bottom: 20px;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  ${props =>
    props.submit
      ? `
      color: ${Colors.white};
      background: ${Colors.brandPrimary};
      :hover {
        background: ${Colors.brandTerciary};
      }
      :active {
        background: ${Colors.brandSecondary};
      }
    `
      : ''};
  ${props =>
    props.estimate
      ? `
      color: ${Colors.brandPrimary};
      background: ${Colors.white};
      border: 1px solid;
      :hover {
        color: ${Colors.brandTerciary};
      }
      :active {
        color: ${Colors.brandSecondary};
      }
    `
      : ''};
`;

const SubmitMessageForm = styled.div`
  margin-top: 110px;
  ${media.phone`
    margin-top: 24px;
    padding: 0 20px;
  `};
`;

const PastRecord = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: #006494;
  margin-bottom: 30px;
  :hover {
    cursor: pointer;
  }
  ${media.phone`
    font-size: 12px;
    line-height: 18px;
    border-top: 1px solid #dbdbdb;
    border-bottom: 1px solid #dbdbdb;
    width: 100%;
    padding: 13px 20px;
  `};
`;

const RequestStatus = styled.div`
  color: #888787;
  text-align: center;
  display: none;
  ${media.phone`
    display: inherit;
    font-size: 11px;
    line-height: 16.5px;
  `};
`;

class Message extends React.Component {
  constructor(props) {
    super(props);

    console.log(uiActions);

    this.pageTitle = 'Masaya Kudoさんとのメッセージ'; // TODO ルーム情報を取得する
    this.roomId = props.match.params.room_id; // TODO roomId書き換えで関係ないルームのデータを取得できないようにする
    this.props.dispatch(messagesActions.fetchMessagesStart(this.roomId));
    this.props.dispatch(
      uiActions.setUiState({
        message: '',
        isSend: false,
        isSending: false,
      }),
    );
  }

  handleChange = event => {
    this.props.dispatch(
      uiActions.setUiState({
        message: event.target.value,
      }),
    );
  };

  sendTextMessage = () => {
    const { ui } = this.props;
    if (ui.message === '') {
      return;
    }
    this.props.dispatch(
      messagesActions.sendMessage({
        roomId: this.roomId,
        userId: this.props.userId,
        text: ui.message,
      }),
    );
    this.props.dispatch(
      uiActions.setUiState({
        message: '',
      }),
    );
  };

  contents = () => {
    const { classes, messages, userId } = this.props;
    return (
      <div className={classes.root}>
        {messages.map(message => {
          const date = message.createDt.toLocaleDateString('ja-JP', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          });

          const StyledDate = styled.div`
            font-size: 12px;
            line-height: 14px;
            color: #b4b4b4;
            float: right;
            margin-bottom: 20px;
          `;

          let RecordComponent = () => <StyledRecord myMessage date={date} text={message.text} />;

          if (message.userId !== userId) {
            RecordComponent = () => <StyledRecord date={date} text={message.text} />;
          }

          // 見積もり発生時
          if (false) {
            RecordComponent = () => (
              <StyledRecord specialMessage hasLink={true} date={date} text={message.text} />
            );
          }

          return (
            <div key={message.id}>
              <RecordComponent />
              <div style={{ clear: 'both' }} />
              <StyledDate>{date}</StyledDate>
              <div style={{ clear: 'both' }} />
              <RequestStatus>ホストがリクエストの承認を行いました。</RequestStatus>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { ui } = this.props;
    //TODO contents内にTextFieldいれるとonChangeの挙動がおかしくなるので仮でこの形に
    return (
      <MessagePage>
        <MessageContainer>
          <StyledMobileInformation />
          <PageTitle>{this.pageTitle}</PageTitle>
          <FlexWrapper>
            <InformationContainer>
              <Information />
            </InformationContainer>

            <RecordsContainer>
              <PastRecord>過去のメッセージを見る</PastRecord>
              <ContentsWrapper>
                <this.contents />
              </ContentsWrapper>
              <SubmitMessageForm>
                <AddFile>
                  <AddFileIcon>
                    <i className="far fa-image" />
                  </AddFileIcon>
                  <AddFileText>写真を送信する</AddFileText>
                </AddFile>
                <AddMessageTextarea
                  placeholder="メッセージを入力する…"
                  value={ui.message}
                  onChange={this.handleChange}
                  disabled={ui.isSending}
                />
                <AddMessageButton submit onClick={this.sendTextMessage}>
                  送信
                </AddMessageButton>
                <AddMessageButton estimate onClick={() => this.props.history.push('/estimate/1')}>
                  見積もりを送る
                </AddMessageButton>
              </SubmitMessageForm>
            </RecordsContainer>
          </FlexWrapper>
        </MessageContainer>
      </MessagePage>
    );
  }
}

const styles = theme => ({
  textField: {
    width: '100%',
  },
});

const mapStateToProps = state => ({
  messages: state.messages.messages,
  isLoading: state.messages.isLoading,
  userId: state.auth.user.id,
  ui: state.ui,
});

export default compose(withRouter, withStyles(styles), authRequired, connect(mapStateToProps))(
  Message,
);
