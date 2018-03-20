import React from 'react';
import styled from 'styled-components';
import { Form, TextArea, Select } from 'semantic-ui-react';
import Button from 'components/Shared/Button';
import Intercom from 'components/Shared/Intercom';
import { ContentContainer } from 'components/Page';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const INQUIRY_TITLES = [
  { key: 0, value: 0, text: 'サービスの使い方' },
  { key: 1, value: 1, text: '登録・ログインについて' },
  { key: 2, value: 2, text: '取り引きについて' },
  { key: 3, value: 3, text: 'お支払いについて' },
  { key: 4, value: 4, text: '売上申請について' },
  { key: 5, value: 5, text: '退会したい' },
  { key: 6, value: 6, text: '不具合の報告' },
  { key: 7, value: 7, text: 'その他のご質問' },
];

const Content = styled.div`
  ${media.phone`
    padding: 0 ${Dimens.medium}px;
  `}
`;

const Header = styled.div`
  font-size: ${FontSizes.large}px;
  line-height: 51px;
  letter-spacing: -0.5px;
  color: ${Colors.black};
  ${props => props.margin && `
    margin-top: ${Dimens.large}px;
  `}
`;

const ContentText = styled.div`
  color: ${Colors.black};
  font-size: ${FontSizes.medium}px;
  margin-top: ${Dimens.medium}px;
`;

const LabelText = styled.div`
  color: ${Colors.black};
  font-size: ${FontSizes.medium}px;
`;

const InputContainer = styled.div`
  margin-top: ${Dimens.large}px;
`;

const InputWrapper = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const ButtonWrapper = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const SupportContainer = styled.div`
  margin-top: ${Dimens.medium3}px;
`;

export default props => (
  <ContentContainer>
    <Content>
      <Header>モノオクにメッセージ</Header>
      <ContentText>通常24時間以内の返信に努めております。</ContentText>
      <InputContainer>
        <LabelText>お問い合わせ内容を選ぶ</LabelText>
        <InputWrapper>
          <Select placeholder="サービスの使い方" style={{ width: '70%' }} options={INQUIRY_TITLES} />
        </InputWrapper>
      </InputContainer>
      <InputContainer>
        <LabelText>お問い合わせ内容</LabelText>
        <InputWrapper>
          <Form>
            <TextArea style={{ width: '100%' }} />
          </Form>
        </InputWrapper>
      </InputContainer>
      <ButtonWrapper>
        <Button fluid onClick={props.onClickSend}>送信する</Button>
      </ButtonWrapper>
      <Header margin>チャットで相談する</Header>
      <SupportContainer>
        <ContentText>右下のチャットボタンからも相談することができます。</ContentText>
        <ContentText>対応時間：平日10:00〜17:00（祝日を除く）</ContentText>
      </SupportContainer>
      <SupportContainer>
        <ContentText>業務時間外の対応について</ContentText>
        <ContentText>お問い合わせ内容を送信後、メールアドレスの入力をすると翌営業日を目安に回答が届きます。</ContentText>
      </SupportContainer>
    </Content>
    <Intercom />
  </ContentContainer>
);
