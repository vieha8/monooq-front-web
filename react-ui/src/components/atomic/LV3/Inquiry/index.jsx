// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
import TextLink from 'components/atomic/LV1/TextLink';
import { Dimens } from 'variables';
import Path from 'config/path';

const Row = styled.div``;

const Text = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const UnsubscribeText = styled.div`
  margin-top: ${Dimens.large}px;
`;

export default () => (
  <div>
    <Row>
      <Text>
        <InlineText.Base>
          サービスの不明点・お困りのことがあれば、モノオクカスタマーサポートまでお寄せください。
          <br />
          現在、お問い合わせは右下の赤いアイコンから承っております。こちらよりご連絡ください。
        </InlineText.Base>
        <InlineText.Base margin="6px auto auto">
          お問い合わせ内容を送信後、メールアドレスを入力いただくと翌営業日を目安にご連絡致します。
        </InlineText.Base>
      </Text>
    </Row>
    <UnsubscribeText>
      <TextLink to={Path.unsubscribe()}>退会はこちら</TextLink>
    </UnsubscribeText>
  </div>
);
