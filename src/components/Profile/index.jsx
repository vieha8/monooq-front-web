import React from 'react';
import styled from 'styled-components';
import { Input, Form, TextArea, Select } from 'semantic-ui-react';
import Button from 'components/Shared/Button';
import { ContentContainer } from 'components/Page';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Content = styled.div`
  ${media.phone`
    padding: 0 ${Dimens.medium}px;
  `}
`;

const HostContainer = styled.div`
`;

const InputContainer = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const InputWrapper = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  text-align: center;
`;
const IMAGE_SIZE = 100;
const Image = styled.img`
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
  border-radius: ${IMAGE_SIZE / 2}px;
`;

const Title = styled.div`
  color: ${Colors.black};
  font-size: ${FontSizes.medium2}px;
  text-align: left;
`;

const Caption = styled.div`
  margin-top: ${Dimens.small}px;
  color: ${Colors.lightGray1};
  font-size: ${FontSizes.xsmall}px;
  text-align: ${props => props.align};
`;

const ModProfileImageLink = styled.span`
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const UnsubscribeText = styled.a`
  display: block;
  font-size: ${FontSizes.xsmall}px;
  text-align: center;
  color: ${Colors.linkBlue};
  margin-top: ${Dimens.medium2}px;
  &:hover {
    color: ${Colors.linkBlue};
  }
`;

const PREFECTURES = [
  { key: 1, value: 1, text: '北海道' },
];

export default props => (
  <ContentContainer>
    <Content>
      <HostContainer>
        <Title>プロフィール写真</Title>
        <ImageWrapper>
          <Image src="http://placehold.jp/500x500.png" alt={props.hostName} />
        </ImageWrapper>
        <ModProfileImageLink>
          <Caption align="center">写真を変更する</Caption>
        </ModProfileImageLink>
      </HostContainer>
      <InputContainer>
        <Title>お名前</Title>
        <InputWrapper>
          <Input placeholder="ニックネーム" style={{ width: '70%' }} />
        </InputWrapper>
      </InputContainer>
      <InputContainer>
        <Title>メールアドレス</Title>
        <InputWrapper>
          <Input placeholder="info@monooq.com" style={{ width: '70%' }} />
        </InputWrapper>
      </InputContainer>
      <InputContainer>
        <Title>お住いの地域</Title>
        <InputWrapper>
          <Select placeholder="選択してください" style={{ width: '70%' }} options={PREFECTURES} />
        </InputWrapper>
      </InputContainer>
      <InputContainer>
        <Title>あなたの紹介文</Title>
        <Caption>ユーザー・ホストが安心するようにあなたの紹介文を掲載しましょう！</Caption>
        <InputWrapper>
          <Form>
            <TextArea
              placeholder="はじめまして！モノオクホストのYUKIです。大きめの荷物でも柔軟に対応しております、いつでもチャットでご連絡ください！"
              style={{ width: '100%' }}
              rows={5}
            />
          </Form>
        </InputWrapper>
      </InputContainer>
      <ButtonWrapper>
        <Button fluid>プロフィールを更新する</Button>
      </ButtonWrapper>
      <UnsubscribeText href="/">退会申請をする</UnsubscribeText>
    </Content>
  </ContentContainer>
);
