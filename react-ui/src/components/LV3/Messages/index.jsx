// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import Path from 'config/path';
import moment from 'moment';
import AdminMessage from 'components/LV2/Message/Admin';
import SelfMessage from 'components/LV2/Message/MySelf';
import OtherMessage from 'components/LV2/Message/Other';
import EstimateMessage from 'components/LV2/Message/Estimate';
import PhotoMessage from 'components/LV2/Message/Photo';
import MessageInput from 'components/LV2/Message/Input';
import Button from 'components/LV1/Button';
import InlineText from 'components/LV1/InlineText';
import TextLink from 'components/LV1/TextLink';
import { Dimens, Colors } from 'variables';

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

const MessageInputWrap = styled.div`
  margin-top: ${Dimens.medium3_40}px;
`;

const ButtonWrapper = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const CautionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${Dimens.medium1}px ${Dimens.small}px;
`;

const CautionText = styled(InlineText.Tiny)`
  margin-bottom: ${Dimens.xsmall}px;
`;

const SeparatedCautionWrapper = styled(CautionWrapper)`
  border-top: 1px solid ${Colors.borderGray};
  text-align: center;
  padding-bottom: 0;
`;

type PropTypes = {
  hostUser: boolean,
  onClickEstimate: Function,
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
      link?: {
        text: string,
        url: string,
      },
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
  onChangeText: Function,
  text: string,
  onClickSend: Function,
  buttonDisabled: boolean,
  onPickImage: Function,
  pickedImage: string,
  lastReadDt: string,
};

const dateFormat = 'YYYY/MM/DD kk:mm:ss';

export default (props: PropTypes) => {
  const { messages, hostUser, lastReadDt } = props;
  const messageList = messages;

  if (messageList.length >= 1) {
    // ルームの初回メッセージをトリガーとして、ユーザー・ホストの「双方」に表示 ※永続表示
    messageList.splice(1, 0, {
      admin: {
        message:
          '【リクエストが送信されました】\n保管条件を調整した後、ホストからの見積もりに決済しましょう。\n\n※モノオク上での決済は保険適用のため必須となり、決済完了後に保管先住所をお知らせします。\n※「見積もりを送る」ボタンはホストのメッセージ送信ボタン下部にあります。',
      },
    });
  }

  if (hostUser && messageList.length >= 0) {
    // 自分がホストの場合かつ未送信の場合は、初期メッセージを追加する ※永続表示
    messageList.unshift({
      admin: {
        message: 'あなたのスペースが興味をもたれています。ユーザーに希望条件を聞いてみましょう！',
      },
    });
  } else if (!hostUser && messageList.length >= 0) {
    // 自分がユーザーの場合かつ未送信の場合は、初期メッセージを追加する ※永続表示
    messageList.unshift({
      admin: {
        message:
          'まずは「荷物の内容」「期間」「必要なおおよその広さ」をホストへ伝えましょう！メッセージでは写真も送ることができます。',
      },
    });
  }

  return (
    <div>
      {messageList.map((message, i) => {
        const key = `message_item_${i}`;

        if (message.self) {
          const isRead = lastReadDt.getTime() > message.self.sentAt.getTime();

          // 自分が送信
          if (message.self.image) {
            if (message.self.message) {
              return (
                <Fragment key={key}>
                  <Row self>
                    <SelfMessage
                      message={message.self.message}
                      sentAt={moment(message.self.sentAt).format(dateFormat)}
                      isRead={isRead}
                    />
                  </Row>
                  <Row self>
                    <PhotoMessage
                      align="right"
                      src={message.self.image}
                      receivedAt={moment(message.self.sentAt).format(dateFormat)}
                      isRead={isRead}
                    />
                  </Row>
                </Fragment>
              );
            }
            return (
              <Row key={key} self>
                <PhotoMessage
                  align="right"
                  src={message.self.image}
                  receivedAt={moment(message.self.sentAt).format(dateFormat)}
                  isRead={isRead}
                />
              </Row>
            );
          }
          return (
            <Row key={key} self>
              <SelfMessage
                message={message.self.message}
                sentAt={moment(message.self.sentAt).format(dateFormat)}
                isRead={isRead}
              />
            </Row>
          );
        } else if (message.other) {
          // 相手が送信
          if (message.other.image) {
            if (message.other.message) {
              return (
                <Fragment key={key}>
                  <Row>
                    <OtherMessage
                      id={message.other.id}
                      image={message.other.userImage}
                      message={message.other.message}
                      receivedAt={moment(message.other.receivedAt).format(dateFormat)}
                    />
                  </Row>
                  <Row>
                    <OtherMessage
                      id={message.other.id}
                      image={message.other.userImage}
                      receivedAt={moment(message.other.receivedAt).format(dateFormat)}
                      extension={
                        <PhotoMessage
                          id={message.other.id}
                          src={message.other.image}
                          receivedAt={moment(message.other.receivedAt).format(dateFormat)}
                        />
                      }
                    />
                  </Row>
                </Fragment>
              );
            }
            return (
              <Row key={key}>
                <OtherMessage
                  id={message.other.id}
                  image={message.other.userImage}
                  receivedAt={moment(message.other.receivedAt).format(dateFormat)}
                  extension={
                    <PhotoMessage
                      id={message.other.id}
                      src={message.other.image}
                      receivedAt={moment(message.other.receivedAt).format(dateFormat)}
                    />
                  }
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
                receivedAt={
                  message.admin.receivedAt && moment(message.admin.receivedAt).format(dateFormat)
                }
                link={message.admin.link || {}}
              />
            </Row>
          );
        } else if (message.estimate) {
          // 見積もりメッセージ
          return (
            <Row key={key} admin>
              <EstimateMessage
                id={message.estimate.id}
                host={hostUser}
                name={message.estimate.name}
                beginAt={moment(message.estimate.beginAt).toDate()}
                endAt={moment(message.estimate.endAt).toDate()}
                price={message.estimate.price}
                receivedAt={moment(message.estimate.receivedAt).format(dateFormat)}
                paymentLink={message.estimate.link}
                status={message.estimate.status}
              />
            </Row>
          );
        }

        return null;
      })}
      <MessageInputWrap>
        <MessageInput
          onChange={props.onChangeText}
          value={props.text}
          onPickImage={props.onPickImage}
          preview={props.pickedImage}
        />
      </MessageInputWrap>
      <ButtonWrapper>
        <Button
          primary
          fill={1}
          fontbold
          disabled={props.buttonDisabled}
          onClick={props.buttonDisabled ? null : props.onClickSend}
        >
          送信
        </Button>
      </ButtonWrapper>
      {props.hostUser && (
        <ButtonWrapper>
          <Button secondary fill={1} fontbold onClick={props.onClickEstimate}>
            見積もりを送る
          </Button>
        </ButtonWrapper>
      )}

      <CautionWrapper>
        <CautionText>モノオクではサービス外のお支払いや現金取引は禁止です。</CautionText>
        <TextLink to={Path.rule()} fontSize={11} target="_blank" rel="noopener noreferrer">
          ルールとマナーを読む
        </TextLink>
      </CautionWrapper>
      <SeparatedCautionWrapper>
        <CautionText>
          経年劣化によるショート・不具合の可能性がある製品に関して。自然発生的な故障のケースは一切の保証ができません。電化製品・家電などでスペース利用を検討している場合は予めご了承ください。
        </CautionText>
      </SeparatedCautionWrapper>
    </div>
  );
};
