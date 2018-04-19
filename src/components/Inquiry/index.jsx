import React from 'react';
import styled from 'styled-components';
// import { Form, TextArea, Select } from 'semantic-ui-react';
// import Button from 'components/Shared/Button';
import Intercom from 'components/Shared/Intercom';
import { ContentContainer } from 'components/Page';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import Path from 'config/path';
import { Link } from 'react-router-dom';

// const INQUIRY_TITLES = [
//   { key: 0, value: 0, text: 'サービスの使い方' },
//   { key: 1, value: 1, text: '登録・ログインについて' },
//   { key: 2, value: 2, text: '取り引きについて' },
//   { key: 3, value: 3, text: 'お支払いについて' },
//   { key: 4, value: 4, text: '売上申請について' },
//   { key: 5, value: 5, text: '退会したい' },
//   { key: 6, value: 6, text: '不具合の報告' },
//   { key: 7, value: 7, text: 'その他のご質問' },
// ];

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

// const LabelText = styled.div`
//   color: ${Colors.black};
//   font-size: ${FontSizes.medium}px;
// `;
//
// const InputContainer = styled.div`
//   margin-top: ${Dimens.large}px;
// `;
//
// const InputWrapper = styled.div`
//   margin-top: ${Dimens.medium2}px;
// `;
//
// const ButtonWrapper = styled.div`
//   margin-top: ${Dimens.medium2}px;
// `;

const SupportContainer = styled.div`
  margin-top: ${Dimens.medium3}px;
`;

const UnsubscribeText = styled.div`
  font-size: 12px;
`;

export default props => (
  <ContentContainer>
    <Content>
      <Header margin>お問い合わせ</Header>
      <SupportContainer>
        <ContentText>画面右下の赤いボタンからご相談ください。</ContentText>
        <ContentText>お問い合わせ内容を送信後、メールアドレスを入力いただくと翌営業日を目安にご連絡致します。</ContentText>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <UnsubscribeText>
          <Link to={Path.unsubscribe()}>退会はこちら</Link>
        </UnsubscribeText>
      </SupportContainer>
    </Content>
    <Intercom />
  </ContentContainer>
);
