import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import red from 'material-ui/colors/red';
import grey from 'material-ui/colors/grey';
import green from 'material-ui/colors/green';
import { defaultPageFactory } from '../../components/PageLayouts';
import authRequired from '../../components/Auth';
import { messagesActions } from '../../redux/modules/messages';

import styled from 'styled-components';
import { isMobileWindow, media } from '../../helpers/style/media-query';
import { Colors, Dimens } from '../../variables';

const MessagePage = styled.div`
  background: #fff;
  font-family: sans-serif;
`;

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

// {todo}
const MobileInformation = styled.div`
  display: none;
  ${media.phone`
    display: block;
    width: 100%;
    height: 50px;
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
    :hover {
      cursor: pointer;
    }
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
  &:hover {
    cursor: pointer;
  }
  ${media.phone`
    font-size: 12px;
  `};
`;

const AddFileTextarea = styled.textarea`
  width: 100%;
  height: 160px;
  font-size: 14px;
  color: #bcbcbc;
  padding: 15px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 1px solid #bcbcbc;
  border-radius: 2px;
  background-color: #fafafa;
  resize: none;
  &::-webkit-input-placeholder {
    color: #bcbcbc;
  }
`;

const AddFileButton = styled.div`
  text-align: center;
  font-size: 16px;
  line-height: 16px;
  padding: 18px 0;
  margin-bottom: 20px;
  border-radius: 5px;
  box-sizing: border-box;
  ${props =>
    props.submit
      ? `
      color: #fff;
      background: #e85258;
      :hover {
        cursor: pointer;
        background: rgba(232, 82, 88, .5);
      }
    `
      : ''};
  ${props =>
    props.estimate
      ? `
      color: #e85258;
      background: #fff;
      border: 1px solid;
      :hover {
        cursor: pointer;
        background: rgba(232, 82, 88, .5);
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

    this.state = {
      message: '',
      isSend: false,
      isSending: false,
    };

    this.pageTitle = 'Masaya Kudoさんとのメッセージ'; // TODO ルーム情報を取得する
    this.roomId = props.match.params.room_id; // TODO roomId書き換えで関係ないルームのデータを取得できないようにする
    this.props.dispatch(messagesActions.fetchMessagesStart(this.roomId));
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  sendTextMessage = () => {
    if (this.state.message === '') {
      return;
    }
    this.props.dispatch(
      messagesActions.sendMessage({
        roomId: this.roomId,
        userId: this.props.userId,
        text: this.state.message,
      }),
    );
    this.setState({ message: '' });
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

          let className = classes.myMessage;
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
    const { classes } = this.props;
    //TODO contents内にTextFieldいれるとonChangeの挙動がおかしくなるので仮でこの形に
    return (
      <MessagePage>
        <MessageContainer>
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
                <AddFileTextarea
                  placeholder="メッセージを入力する…"
                  value={this.state.message}
                  onChange={this.handleChange('message')}
                  disabled={this.state.isSending}
                />
                <AddFileButton submit onClick={this.sendTextMessage}>
                  送信
                </AddFileButton>
                <AddFileButton estimate onClick={() => this.props.history.push('/estimate/1')}>
                  見積もりを送る
                </AddFileButton>
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

const mapStateToProps = state => {
  return {
    messages: state.messages.messages,
    isLoading: state.messages.isLoading,
    userId: state.auth.user.id,
  };
};

export default compose(withRouter, withStyles(styles), authRequired, connect(mapStateToProps))(
  Message,
);
