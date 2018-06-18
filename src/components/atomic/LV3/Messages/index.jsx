// @flow

import React from 'react';
import styled from 'styled-components';
import Path from 'config/path';
import moment from 'moment';
import AdminMessage from 'components/atomic/LV2/Message/Admin';
import SelfMessage from 'components/atomic/LV2/Message/MySelf';
import OtherMessage from 'components/atomic/LV2/Message/Other';
import EstimateMessage from 'components/atomic/LV2/Message/Estimate';
import PhotoMessage from 'components/atomic/LV2/Message/Photo';
import MessageInput from 'components/atomic/LV2/Message/Input';
import Button from 'components/atomic/LV1/Button';
import InlineText from 'components/atomic/LV1/InlineText';
import TextLink from 'components/atomic/LV1/TextLink';
import { Dimens, Colors } from 'variables';

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

const ButtonWrapper = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const CautionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${Dimens.medium1}px ${Dimens.small}px;
`;

const CautionText = InlineText.Tiny.extend`
  margin-bottom: ${Dimens.xsmall}px;
`;

const SeparatedCautionWrapper = CautionWrapper.extend`
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
  // 自分がユーザーの場合は、初期メッセージを追加する
  const messageList = []
    .concat(
      hostUser
        ? []
        : [
            {
              admin: {
                message:
                  'まずは「荷物の内容」「期間」「必要なおおよその広さ」をホストへ伝えましょう！メッセージでは写真も送れます。',
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
          const isRead = lastReadDt.getTime() > message.self.sentAt.getTime();

          // 自分が送信
          if (message.self.image) {
            if (message.self.message) {
              return (
                <Row key={key} self>
                  <Row key={key} self>
                    <SelfMessage
                      message={message.self.message}
                      sentAt={moment(message.self.sentAt).format(dateFormat)}
                      isRead={isRead}
                    />
                  </Row>
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
                <Row key={key}>
                  <OtherMessage
                    id={message.other.id}
                    image={message.other.userImage}
                    message={message.other.message}
                    receivedAt={moment(message.other.receivedAt).format(dateFormat)}
                  />
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
                receivedAt={
                  message.admin.receivedAt && moment(message.admin.receivedAt).format(dateFormat)
                }
              />
            </Row>
          );
        } else if (message.estimate) {
          // 見積もりメッセージ
          return (
            <Row key={key} admin>
              <EstimateMessage
                host={hostUser}
                name={message.estimate.name}
                beginAt={moment(message.estimate.beginAt).toDate()}
                endAt={moment(message.estimate.endAt).toDate()}
                price={message.estimate.price}
                receivedAt={moment(message.estimate.receivedAt).format(dateFormat)}
                paymentLink={message.estimate.link}
              />
            </Row>
          );
        }

        return null;
      })}
      <MessageInput
        onChange={props.onChangeText}
        value={props.text}
        onPickImage={props.onPickImage}
        preview={props.pickedImage}
      />
      <ButtonWrapper>
        <Button
          primary
          fill={1}
          disabled={props.buttonDisabled}
          onClick={props.buttonDisabled ? null : props.onClickSend}
        >
          送信
        </Button>
      </ButtonWrapper>
      {props.hostUser && (
        <ButtonWrapper>
          <Button secondary fill={1} onClick={props.onClickEstimate}>
            見積もりを送る
          </Button>
        </ButtonWrapper>
      )}

      <CautionWrapper>
        <CautionText>モノオクではサービス外のお支払いや現金取引は禁止です。</CautionText>
        <TextLink to={Path.rule()} fontSize={11} target="_blank">
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
