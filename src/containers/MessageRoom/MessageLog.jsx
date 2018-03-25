import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import Path from 'config/path';
import { Image } from 'semantic-ui-react';

const Container = styled.div`
  ${media.phone`
    padding: 0 ${Dimens.medium}px;
  `}
`;

const MessageContainer = styled.div`
  &:not(:first-child) {
    margin-top: 20px;
  }
`;

const Message = styled.div`
  display: table;
  margin-left: 0;
  ${props => props.isSelf && `
    margin-left: auto;
  `}
  ${props => props.isSpecial && `
    display: block;
  `}
`;

const StyledRecord = styled.div`
  float: left;
  max-width: 584px;
  border-radius: 5px;
  background-color: #fff;
  border: 1px solid #d6d6d6;
  padding: 20px;
  margin-right: auto;
  font-size: 14px;
  line-height: 2;
  word-wrap: break-word;
  white-space: pre-wrap;
  ${props => props.isSelf && `
    float: right;
    background-color: #feebeb;
    margin-left: auto;
    border: 0;
  `}
  ${props => props.isSpecial && `
    width: 100%;
    background-color: #d9ffe5;
    border: 0;
    max-width: 100%;
  `}

  ${media.phone`
    max-width: 260px;
    ${props => props.isSpecial && `
      width: 100%;
      max-width: 100%;
    `}
  `}
`;

const RecordLink = styled(Link) `
  color: #006494;
  float: right;
  margin-top: 30px;
  cursor: pointer;
`;

const StyledDate = styled.div`
  font-size: 12px;
  line-height: 14px;
  color: #b4b4b4;
  text-align: right;
  margin-top: 5px;
`;

const ClearBoth = styled.div`
  clear: both;
`;

const OtherPerson = styled.img`
  display: block;
  float: left;
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-right: ${Dimens.medium}px;
  object-fit: cover;
  vertical-align: middle;
  &:after {
    clear: both;
    content: "";
    display: block;
  }
`;

function messageDateFormat(date) {
  return (
    date.toLocaleDateString('ja-JP', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  );
}

function estimateDateFormat(date) {
  return date.toLocaleDateString('ja-JP-u-ca-japanese', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function getUserImageUrl(props) {
  const { room } = props;
  return (room.user || {}).ImageUrl;
}

function getHostImageUrl(props) {
  const { room } = props;
  return ((room.space || {}).Host || {}).ImageUrl;
}

export default (props) => {
  const { messages, userId, room, ui } = props;

  const data = messages.map((message) => {
    const params = {
      text: '',
      date: messageDateFormat(message.createDt),
      isSelf: message.userId === userId,
      isSpecial: message.messageType !== 1,
      imageUrl: message.image,
      linkUrl: '',
      estimate: {},
      space: {},
    };

    switch (message.messageType) {
      case 1:
        params.text = message.text;
        break;
      case 2: {
        // 見積りメッセージ
        const { startDate, endDate, price, requestId } = message;
        params.text = 'お見積り\n';
        params.text += `利用開始日:${estimateDateFormat(startDate)}\n`;
        params.text += `利用終了日:${estimateDateFormat(endDate)}\n`;
        params.text += `料金:${price}円`;

        if (room.space.UserID !== userId) {
          params.linkUrl = Path.payment(ui.roomId, requestId);
          params.estimate = message;
          params.space = room.space;
        }

        break;
      }
      case 3:
        params.text = '決済が完了しました。スペース取引成立です！';
        break;
      default:
        break;
    }

    return params;
  });

  // 自分がユーザーの場合は、初期メッセージを追加する
  let messageData = [].concat(data);
  if (room.space.UserID !== userId) {
    messageData = []
      .concat([
        {
          text: 'あなたの具体的な荷物の内容と予定日時をホストへ伝えましょう！量や大きさに適したお見積もりがホストから送られてきます。メッセージでは写真も送れます。詳細な住所はお支払い完了後にお知らせします。',
          isSpecial: true,
        },
        {
          text: '経年劣化によるショート・不具合の可能性がある製品に関して。自然発生的な故障のケースは一切の保証ができません。電化製品・家電などでスペース利用を検討している場合は予めご了承ください。',
          isSpecial: true,
        },
      ])
      .concat(data);
  }

  return (
    <Container>
      {messageData.map((v, i) => (
        <MessageContainer key={`message_log_${i}`}>
          {!v.isSelf && !v.isSpecial && (
            <OtherPerson
              src={(
                room.space.UserID === userId
                  // 自分がホストの相手メッセージはユーザーの画像
                  ? getUserImageUrl(props)
                  // 自分がユーザーの相手メッセージはホストの画像
                  : getHostImageUrl(props)
              )}
            />
          )}
          <Message isSelf={v.isSelf} isSpecial={v.isSpecial}>
            <StyledRecord isSelf={v.isSelf} isSpecial={v.isSpecial}>
              {v.text}
              {v.linkUrl && (
                <RecordLink
                  to=""
                  onClick={(e) => {
                    e.preventDefault();
                    props.onClickEstimate(v);
                  }}
                >
                  この見積もりでお支払いに進む
                </RecordLink>
              )}
              {v.imageUrl && <Image src={v.imageUrl} rounded size="large" />}
            </StyledRecord>
            <ClearBoth />
            <StyledDate>{v.date}</StyledDate>
          </Message>
        </MessageContainer>
      ))}
    </Container>
  );
};
