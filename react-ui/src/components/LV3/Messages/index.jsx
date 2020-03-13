import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import { formatDate, formatStringSlash, formatStringSlashTime } from 'helpers/date';
import AdminMessage from 'components/LV2/Message/Admin';
import SelfMessage from 'components/LV2/Message/MySelf';
import OtherMessage from 'components/LV2/Message/Other';
import EstimateMessage from 'components/LV2/Message/Estimate';
import PhotoMessage from 'components/LV2/Message/Photo';
import NoneData from 'components/LV2/NoneData';
import Caution from 'components/LV2/Message/Caution';
import Requested from 'components/LV2/Message/Requested';
import MessegeSendForm from './SendForm';

const Row = styled.div`
  width: 66%;
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
  ${media.phone`
    width: 100%;
    ${props =>
      props.self &&
      `
      width: calc(100% - 47px);
    `};
  `};
  &:not(:first-child) {
    margin-top: ${Dimens.medium1}px;
  }
`;

const extensionPhotoMessage = message => {
  return (
    <PhotoMessage
      id={message.other.id}
      src={message.other.image}
      receivedAt={formatDate(new Date(message.other.receivedAt), formatStringSlashTime)}
    />
  );
};

export default ({ messages, lastReadDt, userIdFrom, userIdTo, hostUser, isOpenModalError }) => {
  const history = useHistory();
  const messageList = messages;

  if (!messageList) {
    return (
      <NoneData
        captionHead="メッセージの取得に失敗しました。"
        caption="画面を再読み込みするか、時間をおいてから再度アクセスをお願いいたします。"
        buttonText="画面を再読み込みする"
        onClick={() => window.location.reload()}
      />
    );
  }

  if (messageList.length >= 1 && !messageList[0].admin) {
    // ルームの初回メッセージをトリガーとして、ユーザー・ホストの「双方」に表示 ※永続表示
    if (hostUser) {
      messageList.splice(1, 0, {
        admin: {
          message:
            'リクエストを確認し、条件を調整しましょう。\nスペースを貸し出せる場合は、見積もりを発行してください。\n見積もりへの支払いが完了すると取引が成立し、スペース住所の詳細がゲストに伝わります。\n※「見積もりを送る」ボタンはメッセージ送信ボタン下部にあります。',
        },
      });
    } else {
      messageList.splice(1, 0, {
        admin: {
          message: <Requested />,
        },
      });
    }
  }

  return (
    <div>
      {messageList.map((message, i) => {
        const key = `message_item_${i}`;
        const id = `message_item_${i}`;

        if (message.self) {
          const isRead = lastReadDt.getTime() > message.self.sentAt.getTime();
          return (
            <div key={key} id={id}>
              {message.self.message && (
                <Row self>
                  <SelfMessage
                    message={message.self.message}
                    sentAt={formatDate(new Date(message.self.sentAt), formatStringSlashTime)}
                    isRead={isRead}
                  />
                </Row>
              )}
              {message.self.image && (
                <Row self>
                  <PhotoMessage
                    align="right"
                    src={message.self.image}
                    receivedAt={formatDate(new Date(message.self.sentAt), formatStringSlashTime)}
                    isRead={isRead}
                    self
                  />
                </Row>
              )}
            </div>
          );
        }

        if (message.other) {
          // 相手が送信
          return (
            <div key={key} id={id}>
              {message.other.message && (
                <Row>
                  <OtherMessage
                    id={message.other.id}
                    image={message.other.userImage}
                    message={message.other.message}
                    receivedAt={formatDate(
                      new Date(message.other.receivedAt),
                      formatStringSlashTime,
                    )}
                  />
                </Row>
              )}
              {message.other.image && (
                <Row>
                  <OtherMessage
                    id={message.other.id}
                    image={message.other.userImage}
                    receivedAt={formatDate(
                      new Date(message.other.receivedAt),
                      formatStringSlashTime,
                    )}
                    extension={extensionPhotoMessage(message)}
                  />
                </Row>
              )}
            </div>
          );
        }

        if (message.admin) {
          // システムメッセージ
          return (
            <Row key={key} admin id={id}>
              <AdminMessage
                message={message.admin.message || ''}
                receivedAt={
                  message.admin.receivedAt &&
                  formatDate(new Date(message.admin.receivedAt), formatStringSlashTime)
                }
                link={message.admin.link || {}}
              />
            </Row>
          );
        }

        if (message.estimate) {
          // 見積もりメッセージ
          return (
            <Row key={key} admin id={id}>
              <EstimateMessage
                id={message.estimate.id}
                host={hostUser}
                name={message.estimate.name}
                beginAt={formatDate(new Date(message.estimate.beginAt), formatStringSlash)}
                endAt={formatDate(new Date(message.estimate.endAt), formatStringSlash)}
                price={message.estimate.price}
                receivedAt={formatDate(
                  new Date(message.estimate.receivedAt),
                  formatStringSlashTime,
                )}
                status={message.estimate.status}
                payType={message.estimate.payType}
                econtextUrl={message.estimate.econtextUrl}
                isOpenModalError={isOpenModalError}
                onClickPayment={() => history.push(message.estimate.link)}
              />
            </Row>
          );
        }

        return null;
      })}
      <MessegeSendForm
        hostUser={hostUser}
        userIdFrom={userIdFrom}
        userIdTo={userIdTo}
        isOpenModalError={isOpenModalError}
      />
      <Caution />
    </div>
  );
};
