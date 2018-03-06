import React from 'react';
import styled from 'styled-components';
import { Form, TextArea, Select } from 'semantic-ui-react';
import Button from 'components/Shared/Button';
import { ContentContainer } from 'components/Page';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const INQUIRY_TITLES = [
  { key: 0, value: 0, text: '登録・ログインについて' },
  { key: 1, value: 1, text: 'スペースの引き取りについて' },
  { key: 2, value: 2, text: 'お支払いについて' },
  { key: 3, value: 3, text: '売上申請について' },
  { key: 4, value: 4, text: '退会したい' },
  { key: 5, value: 5, text: '不具合の報告' },
  { key: 6, value: 6, text: 'その他のご質問' },
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
  margin-top: ${Dimens.medium2}px;
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
  margin-top: ${Dimens.medium}px;
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
      <Header margin>モノオクに電話する</Header>
      <SupportContainer>
        <ContentText>モノオクカスタマーサポートに電話</ContentText>
        <ContentText>03-1234-5678</ContentText>
      </SupportContainer>
      <SupportContainer>
        <ContentText>営業時間：平日営業日10:00〜17:00</ContentText>
        <ContentText>※土日・祝日は休み</ContentText>
      </SupportContainer>
    </Content>
  </ContentContainer>
);
