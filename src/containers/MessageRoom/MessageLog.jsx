import React from 'react';
import { Link } from "react-router-dom";
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

const Record = props => {
  const RecordLink = styled.div`
    color: #006494;
    float: right;
    margin-top: 30px;
    cursor: pointer;
  `;
  let RecordLinkComponent = '';
  if (props.hasLink) {
    RecordLinkComponent = <RecordLink><Link to={props.linkUrl}>この見積もりでお支払いに進む</Link></RecordLink>;
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

const dateFormat = (date) => {
  return date.toLocaleDateString('ja-JP', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default props => {

  const { messages, userId } = props;

  return (
    <Container>
      {messages.map(message => {
        const date = dateFormat(message.createDt);

        const isSelf = message.userId !== userId;
        const isSpecial = message.messageType !== 1;

        const params = {
          date,
          isSelf,
          isSpecial
        };

        switch (message.messageType) {
          case 1:
            params.text = message.text;
            break;
          case 2:
            //見積りメッセージ
            const {startDate, endDate, price, requestId} = message;
            params.text = `お見積り 利用開始日:${startDate} 利用終了日:${endDate} 料金:${price}円`;
            params.hasLink = true;
            params.linkUrl = path.payment(props.ui.roomId, requestId);
            break;
          case 3:
            params.text = `取引成立です！あなたのお支払いが完了しました。届ける準備を始めましょう！`;
            break;
          default:
            break;
        }

        const RecordComponent = () => <StyledRecord {...params} text={message.text} />;

        return (
          <div key={message.id}>
            <RecordComponent />
            <ClearBoth />
            <StyledDate>{date}</StyledDate>
            <ClearBoth />
          </div>
        );
      })}
    </Container>
  );
};