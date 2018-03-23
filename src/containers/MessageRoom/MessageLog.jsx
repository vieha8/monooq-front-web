import React from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';
import {Dimens} from "../../variables";
import {media} from "../../helpers/style/media-query";
import path from "../../config/path";

const Container = styled.div`
  &:not(:first-child) {
    margin-top: ${Dimens.large}px;
  }
  ${media.phone`
    padding: 0 ${Dimens.medium}px;
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
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 28px;
  font-weight: 100;
  word-wrap: break-word;
  white-space: pre-wrap;
  ${media.phone`
    max-width: 260px;
    font-size: 11px;
    line-height: 18px;
  `};
  ${props =>
  props.isSelf
    ? `
        float: right;
        background-color: #feebeb;
        margin-left: auto;
        border: 0;
    `
    : ''};
  ${props =>
  props.isSpecial
    ? `
        width: 100%;
        background-color: #d9ffe5;
        border: 0;
        max-width: 100%;
    `
    : ''};
`;

const RecordLink = styled(Link)`
  color: #006494;
  float: right;
  margin-top: 30px;
  cursor: pointer;
`;

const StyledDate = styled.div`
  font-size: 12px;
  line-height: 14px;
  color: #b4b4b4;
  float: right;
  margin-bottom: 20px;
`;

const ClearBoth = styled.div`
  clear: both;
`;

const messageDateFormat = (date) => {
  return date.toLocaleDateString('ja-JP', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const estimateDateFormat = (date) => {
  return date.toLocaleDateString('ja-JP-u-ca-japanese', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default props => {

  const {messages, userId} = props;

  const data = messages.map(message => {
    const params = {
      date: messageDateFormat(message.createDt),
      isSelf: message.userId === userId,
      isSpecial: message.messageType !== 1
    };

    switch (message.messageType) {
      case 1:
        params.text = message.text;
        break;
      case 2:
        //見積りメッセージ
        const {startDate, endDate, price, requestId} = message;
        params.text = `お見積り\n`;
        params.text += `利用開始日:${estimateDateFormat(startDate)}\n`;
        params.text += `利用終了日:${estimateDateFormat(endDate)}\n`;
        params.text += `料金:${price}円`;
        params.linkUrl = path.payment(props.ui.roomId, requestId);
        break;
      case 3:
        params.text = `取引成立です！あなたのお支払いが完了しました。届ける準備を始めましょう！`;
        break;
      default:
        break;
    }

    return params;
  });

  // TODO props.room.user.ImageUrlに相手のアイコン画像が入ってるからメッセージ横に表示したい

  return (
    <Container>
      {data.map((v, i) => (
        <div key={i}>
          <StyledRecord isSelf={v.isSelf} isSpecial={v.isSpecial}>
            {v.text}
            {v.linkUrl && <RecordLink to={v.linkUrl}>この見積もりでお支払いに進む</RecordLink>}
          </StyledRecord>
          <ClearBoth/>
          <StyledDate>{v.date}</StyledDate>
          <ClearBoth/>
        </div>
      ))}
    </Container>
  );
};