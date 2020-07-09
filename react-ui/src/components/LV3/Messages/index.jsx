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
import { getUsages } from 'helpers/usages';
import { getBreadths } from 'helpers/breadths';
import MessageSendForm from './SendForm';

const STATUS_PAY_ESTIMATE = 'estimate';
const STATUS_PAY_WAITING = 'waiting';
const STATUS_PAY_WAITING_EXPIRRED = 'waitingExpired';

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

const checkStatusEstimate = (templateList, statusEstimate, hostUser) => {
  switch (statusEstimate) {
    case '':
      // 見積もり発行前
      if (hostUser) {
        templateList.push({
          title: '保管可能の返信',
          text:
            'リクエストありがとうございます！当スペースでお荷物保管できます！見積もりを発行するのでご確認ください。',
        });
        templateList.push({
          title: '荷物の量・サイズを確認する',
          text: 'リクエストありがとうございます！お荷物のサイズを教えていただけますか？',
        });
        templateList.push({
          title: '搬入出手段を確認する',
          text: 'リクエストありがとうございます！お荷物はどのように配送される予定でしょうか？',
        });
        templateList.push({
          title: '保管不可の返信',
          text: 'リクエストありがとうございます！すみません。荷物のお預かりが難しいです。',
        });
      } else {
        templateList.push({
          title: '見積もり発行を依頼する',
          text:
            'はじめまして！ぜひ使わせいただきたいと思っています。お見積もりの発行をよろしくお願いします！',
        });
        templateList.push({
          title: 'ホストに質問する',
          text:
            'はじめまして！ぜひ使わせていただきたいのですが、いくつかご質問してもよろしいでしょうか？',
        });
      }
      break;
    case STATUS_PAY_ESTIMATE:
    case STATUS_PAY_WAITING:
    case STATUS_PAY_WAITING_EXPIRRED:
      if (hostUser) {
        templateList.push({
          title: 'お見積もりを発行しました',
          text: 'お見積もりを発行しました！内容をご確認の上、決済をお願いします。',
        });
      }
      break;
    default:
      break;
  }
  return templateList;
};

export default ({
  messages,
  lastReadDt,
  userIdFrom,
  userIdTo,
  hostUser,
  guest,
  host,
  space,
  isOpenModalError,
}) => {
  const history = useHistory();
  const messageList = messages;
  const templateList = [];
  let statusEstimate = '';

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

  if (messageList.length === 0 || (messageList.length >= 1 && messageList[0].self)) {
    if (hostUser) {
      messageList.splice(0, 0, {
        admin: {
          message:
            `ゲストの${guest.name}さんが次の内容でスペースを探しています。\n` +
            '預かれる場合はぜひメッセージを送ってみましょう！\n\n' +
            'ーーーーーーーーーーーーーーーーー\n' +
            `用途:${getUsages(guest.wish.Usages)}\n` +
            `希望開始日:${formatDate(new Date(guest.wish.StartDate), formatStringSlash)}\n` +
            `${guest.wish.IsLong ? '半年以上の利用希望\n' : ''}` +
            `希望の広さ:${getBreadths(guest.wish.Breadth)}\n` +
            'ーーーーーーーーーーーーーーーーー\n\n' +
            '荷物の内容や利用希望の畳数をゲストに確認すると、見積もりを提出する際の参考になります。\n',
        },
      });
    }
  }

  if (messageList.length >= 1 && !messageList[0].admin) {
    // ルームの初回メッセージをトリガーとして、ユーザー・ホストの「双方」に表示 ※永続表示
    if (hostUser) {
      if (!messageList[0].self) {
        messageList.splice(1, 0, {
          admin: {
            message:
              'リクエストを確認し、条件を調整しましょう。\nスペースを貸し出せる場合は、見積もりを発行してください。\n見積もりへの支払いが完了すると取引が成立し、スペース住所の詳細がゲストに伝わります。\n※「見積もりを送る」ボタンはメッセージ送信ボタン下部にあります。',
          },
        });
      }
    } else {
      if (messageList[0].self) {
        messageList.splice(1, 0, {
          admin: {
            message: <Requested />,
          },
        });
      } else {
        messageList.splice(1, 0, {
          admin: {
            message:
              `ホストの${host.name}さんが${guest.name}さんの荷物を預かることができます。\n` +
              '荷物の内容や利用希望の畳数を伝え、気軽に相談してみましょう。\n\n' +
              `${host.name}さんのスペース詳細:https://monooq.com/space/${space.id}\n\n` +
              'ーーーーーーーーーーーーーーーーー\n' +
              `${guest.name}さんの希望条件\n` +
              `用途:${getUsages(guest.wish.Usages)}\n` +
              `希望開始日:${formatDate(new Date(guest.wish.StartDate), formatStringSlash)}\n` +
              `${guest.wish.IsLong ? '半年以上の利用希望\n' : ''}` +
              `希望の広さ:${getBreadths(guest.wish.Breadth)}\n` +
              'ーーーーーーーーーーーーーーーーー\n\n',
          },
        });
      }
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
          statusEstimate = message.estimate.status;
          return (
            <Row key={key} admin id={id}>
              <EstimateMessage
                id={message.estimate.id}
                host={hostUser}
                name={message.estimate.name}
                beginAt={formatDate(new Date(message.estimate.beginAt), formatStringSlash)}
                endAt={formatDate(new Date(message.estimate.endAt), formatStringSlash)}
                isUndecided={message.estimate.isUndecided}
                usagePeriod={message.estimate.usagePeriod}
                price={message.estimate.price}
                fee={message.estimate.fee}
                receivedAt={formatDate(
                  new Date(message.estimate.receivedAt),
                  formatStringSlashTime,
                )}
                status={message.estimate.status}
                payType={message.estimate.payType}
                isMonthly={message.estimate.isMonthly}
                econtextUrl={message.estimate.econtextUrl}
                isOpenModalError={isOpenModalError}
                onClickPayment={() => history.push(message.estimate.link)}
              />
            </Row>
          );
        }

        return null;
      })}
      <MessageSendForm
        space={space}
        hostUser={hostUser}
        userIdFrom={userIdFrom}
        userIdTo={userIdTo}
        isOpenModalError={isOpenModalError}
        templateList={checkStatusEstimate(templateList, statusEstimate, hostUser)}
      />
      <Caution hostUser={hostUser} />
    </div>
  );
};
