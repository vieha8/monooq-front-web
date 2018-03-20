import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import {Dimens} from "../../variables";
import {media} from "../../helpers/style/media-query";

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


export default props => {

  const { messages, userId } = props;

  return (
    <Container>
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

        switch (message.messageType) {
          case 1:
            //通常のメッセージ
            if (message.userId !== userId) {
              RecordComponent = () => <StyledRecord date={date} text={message.text} />;
            }
            break;
          case 2:
            //見積りメッセージ
            const {startDate, endDate, price, requestId} = message;
            message.text = `お見積り 利用開始日:${startDate} 利用終了日:${endDate} 料金:${price}円`;
            //TODO 改行いれられるようにしたい
            RecordComponent = () => (
              <StyledRecord
                specialMessage
                hasLink={true}
                linkUrl={`/message/${this.roomId}/payment/${requestId}`}
                date={date}
                text={message.text}

              />
            );
            break;
          case 3:
            message.text = `取引成立です！あなたのお支払いが完了しました。届ける準備を始めましょう！`;
            RecordComponent = () => (
              <StyledRecord
                specialMessage
                hasLink={false}
                date={date}
                text={message.text}
              />
            );
            break;
          default:
            break;
        }

        return (
          <div key={message.id}>
            <RecordComponent />
            <div style={{ clear: 'both' }} />
            <StyledDate>{date}</StyledDate>
            <div style={{ clear: 'both' }} />
          </div>
        );
      })}
    </Container>
  );
};