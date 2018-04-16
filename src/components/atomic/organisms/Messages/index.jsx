// @flow

import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import AdminMessage from 'components/atomic/molecules/Message/Admin';
import SelfMessage from 'components/atomic/molecules/Message/MySelf';
import OtherMessage from 'components/atomic/molecules/Message/Other';
import EstimateMessage from 'components/atomic/molecules/Message/Estimate';
import PhotoMessage from 'components/atomic/molecules/Message/Photo';
import { Dimens } from 'variables';

const Row = styled.div`
  width: 80%;
  ${props =>
    props.self
      ? `
      margin-right: 0;
      margin-left: auto;
    `
      : `
      margin-right: auto;
      margin-left: 0;
    `};
  ${props =>
    props.admin &&
    `
    width: 100%;
  `};
  &:not(:first-child) {
    margin-top: ${Dimens.medium1}px;
  }
`;

type PropTypes = {
  userMySelf: boolean,
  messages: Array<{
    self?: {
      sentAt: string,
      message?: string,
      image?: string,
    },
    other?: {
      id: number,
      userImage: string,
      receivedAt: string,
      message?: string,
      image?: string,
    },
    admin?: {
      receivedAt?: string,
      message?: string,
    },
    estimate?: {
      name: string,
      beginAt: string,
      endAt: string,
      price: number,
      link: string,
      receivedAt: string,
    },
  }>,
};

const dateFormat = 'YYYY/MM/DD hh:mm:ss';

export default (props: PropTypes) => {
  const { messages, userMySelf } = props;

  // 自分がユーザーの場合は、初期メッセージを追加する
  const messageList = []
    .concat(
      userMySelf
        ? []
        : [
            {
              admin: {
                text:
                  'あなたの具体的な荷物の内容と予定日時をホストへ伝えましょう！量や大きさに適したお見積もりがホストから送られてきます。メッセージでは写真も送れます。詳細な住所はお支払い完了後にお知らせします。',
              },
            },
            {
              admin: {
                text:
                  '経年劣化によるショート・不具合の可能性がある製品に関して。自然発生的な故障のケースは一切の保証ができません。電化製品・家電などでスペース利用を検討している場合は予めご了承ください。',
              },
            },
          ],
    )
    .concat(messages);

  return (
    <div>
      {messageList.map((message, i) => {
        const key = `message_item_${i}`;

        if (message.self) {
          // 自分が送信
          if (message.self.image) {
            return (
              <Row key={key} self>
                <PhotoMessage
                  align="right"
                  src={message.self.image}
                  receivedAt={moment(message.self.sentAt).format(dateFormat)}
                />
              </Row>
            );
          }
          return (
            <Row key={key} self>
              <SelfMessage
                message={message.self.message}
                sentAt={moment(message.self.sentAt).format(dateFormat)}
              />
            </Row>
          );
        } else if (message.other) {
          // 相手が送信
          if (message.other.image) {
            return (
              <Row key={key}>
                <OtherMessage
                  id={message.other.id}
                  image={message.other.userImage}
                  receivedAt={moment(message.other.receivedAt).format(dateFormat)}
                  extension={<PhotoMessage id={message.other.id} src={message.other.image} />}
                />
              </Row>
            );
          }
          return (
            <Row key={key}>
              <OtherMessage
                id={message.other.id}
                image={message.other.userImage}
                message={message.other.message}
                receivedAt={moment(message.other.receivedAt).format(dateFormat)}
              />
            </Row>
          );
        } else if (message.admin) {
          // システムメッセージ
          return (
            <Row key={key} admin>
              <AdminMessage
                message={message.admin.message || ''}
                receivedAt={moment(message.admin.receivedAt || null).format(dateFormat)}
              />
            </Row>
          );
        } else if (message.estimate) {
          // 見積もりメッセージ
          return (
            <Row key={key} admin>
              <EstimateMessage
                name={message.estimate.name}
                beginAt={message.estimate.beginAt}
                endAt={message.estimate.endAt}
                price={message.estimate.price}
                receivedAt={moment(message.estimate.receivedAt).format(dateFormat)}
                paymentLink={message.estimate.link}
              />
            </Row>
          );
        }

        return null;
      })}
    </div>
  );
};
