// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { formatDate, formatStringSlash, formatStringSlashTime } from 'helpers/date';
import Path from 'config/path';
import Button from 'components/LV1/Forms/Button';
import InlineText from 'components/LV1/Texts/InlineText';
import TextLink from 'components/LV1/Texts/TextLink';
import AdminMessage from 'components/LV2/Message/Admin';
import SelfMessage from 'components/LV2/Message/MySelf';
import OtherMessage from 'components/LV2/Message/Other';
import EstimateMessage from 'components/LV2/Message/Estimate';
import PhotoMessage from 'components/LV2/Message/Photo';
import MessageInput from 'components/LV2/Message/Input';
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
  padding: ${Dimens.medium1}px ${Dimens.small}px;
`;

const CautionWrapperItem = styled.div`
  &:not(:last-child) {
    margin-bottom: ${Dimens.small}px;
  }
`;

const CautionText = styled(InlineText.Small)`
  margin-bottom: ${Dimens.small2}px;
`;

const SeparatedCautionWrapper = styled(CautionWrapper)`
  border-top: 1px solid ${Colors.borderGray};
  padding-bottom: 0;
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

type PropTypes = {
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
  hostUser: boolean,
  lastReadDt: string,
  onChangeText: Function,
  text: string,
  onPickImage: Function,
  pickedImage: string,
  buttonDisabled: boolean,
  onClickSend: Function,
  onClickEstimate: Function,
};

export default ({
  messages,
  hostUser,
  lastReadDt,
  onChangeText,
  text,
  onPickImage,
  pickedImage,
  buttonDisabled,
  onClickSend,
  onClickEstimate,
}: PropTypes) => {
  const messageList = messages;

  if (messageList.length >= 1) {
    // ルームの初回メッセージをトリガーとして、ユーザー・ホストの「双方」に表示 ※永続表示
    messageList.splice(1, 0, {
      admin: {
        message:
          '【リクエストが送信されました】\n取引を開始しましょう！\n＜ホストの方＞\nリクエスト内容を確認し、荷物を保管できるか確認しましょう。\n保管できる場合は、金額を提案し、見積もりを発行してください。\n※「見積もりを送る」ボタンはホストのメッセージ送信ボタン下部にございます。\n\n＜ユーザーの方＞\n利用期間や金額等、保管条件をホストと相談しましょう。\nホストから見積もりが届いたら決済を行ってください。\n※モノオク上での決済は保険適用のため必須となります。決済完了後、ホストスペースの住所をお知らせします。',
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

          if (message.self.image) {
            // 自分が送信
            if (message.self.message) {
              return (
                <Fragment key={key}>
                  <Row self>
                    <SelfMessage
                      message={message.self.message}
                      sentAt={formatDate(new Date(message.self.sentAt), formatStringSlashTime)}
                      isRead={isRead}
                    />
                  </Row>
                  <Row self>
                    <PhotoMessage
                      align="right"
                      src={message.self.image}
                      receivedAt={formatDate(new Date(message.self.sentAt), formatStringSlashTime)}
                      isRead={isRead}
                      self
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
                  receivedAt={formatDate(new Date(message.self.sentAt), formatStringSlashTime)}
                  isRead={isRead}
                  self
                />
              </Row>
            );
          }
          return (
            <Row key={key} self>
              <SelfMessage
                message={message.self.message}
                sentAt={formatDate(new Date(message.self.sentAt), formatStringSlashTime)}
                isRead={isRead}
              />
            </Row>
          );
        }

        if (message.other) {
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
                      receivedAt={formatDate(
                        new Date(message.other.receivedAt),
                        formatStringSlashTime,
                      )}
                    />
                  </Row>
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
                </Fragment>
              );
            }
            return (
              <Row key={key}>
                <OtherMessage
                  id={message.other.id}
                  image={message.other.userImage}
                  receivedAt={formatDate(new Date(message.other.receivedAt), formatStringSlashTime)}
                  extension={extensionPhotoMessage(message)}
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
                receivedAt={formatDate(new Date(message.other.receivedAt), formatStringSlashTime)}
              />
            </Row>
          );
        }

        if (message.admin) {
          // システムメッセージ
          return (
            <Row key={key} admin>
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
            <Row key={key} admin>
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
                paymentLink={message.estimate.link}
                status={message.estimate.status}
                payType={message.estimate.payType}
                econtextUrl={message.estimate.econtextUrl}
              />
            </Row>
          );
        }

        return null;
      })}
      <MessageInputWrap>
        <MessageInput
          onChange={onChangeText}
          value={text}
          onPickImage={onPickImage}
          preview={pickedImage}
        />
      </MessageInputWrap>
      <ButtonWrapper>
        <Button
          primary
          fill={1}
          fontbold
          disabled={buttonDisabled}
          onClick={buttonDisabled ? null : onClickSend}
        >
          送信
        </Button>
      </ButtonWrapper>
      {hostUser && (
        <ButtonWrapper>
          <Button secondary fill={1} fontbold onClick={onClickEstimate}>
            見積もりを送る
          </Button>
        </ButtonWrapper>
      )}
      <CautionWrapper>
        <CautionText>モノオクではサービス外のお支払いや現金取引は禁止です。</CautionText>
        <CautionWrapperItem>
          <TextLink
            href="https://help.monooq.com/ja/articles/2948108-%E3%83%9B%E3%82%B9%E3%83%88%E3%81%A8%E3%81%AE%E3%82%84%E3%82%8A%E5%8F%96%E3%82%8A%E3%81%AF%E3%81%A9%E3%81%86%E3%82%84%E3%81%A3%E3%81%A6%E9%80%B2%E3%82%81%E3%82%8B%E3%81%AE"
            fontSize={14}
            fontsizesp={14}
            target="_blank"
            rel="noopener noreferrer"
            className="gaMessageBottomFlowLink"
          >
            取引完了までの流れ
          </TextLink>
        </CautionWrapperItem>
        <CautionWrapperItem>
          <TextLink
            href="https://help.monooq.com/ja/articles/3368023-%E5%BF%85%E8%A6%81%E3%81%AA%E7%95%B3%E6%95%B0%E3%81%AE%E7%9B%AE%E5%AE%89%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6"
            fontSize={14}
            fontsizesp={14}
            target="_blank"
            rel="noopener noreferrer"
            className="gaMessageBottomBreadthLink"
          >
            必要な広さの目安
          </TextLink>
        </CautionWrapperItem>
        <CautionWrapperItem>
          <TextLink
            href="https://help.monooq.com/ja/"
            fontSize={14}
            fontsizesp={14}
            target="_blank"
            rel="noopener noreferrer"
            className="gaMessageBottomQuestionLink"
          >
            よくある質問
          </TextLink>
        </CautionWrapperItem>
        <CautionWrapperItem>
          <TextLink
            to={Path.rule()}
            fontSize={14}
            fontsizesp={14}
            target="_blank"
            rel="noopener noreferrer"
            className="gaMessageBottomRuleLink"
          >
            ルールとマナー
          </TextLink>
        </CautionWrapperItem>
      </CautionWrapper>
      <SeparatedCautionWrapper>
        <CautionText>
          経年劣化によるショート・不具合の可能性がある製品に関して。自然発生的な故障のケースは一切の保証ができません。電化製品・家電などでスペース利用を検討している場合は予めご了承ください。
        </CautionText>
      </SeparatedCautionWrapper>
    </div>
  );
};
