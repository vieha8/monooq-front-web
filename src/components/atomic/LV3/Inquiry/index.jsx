// @flow

import React from 'react';
import styled from 'styled-components';
import { H2 } from 'components/atomic/LV1/Headline';
import InlineText from 'components/atomic/LV1/InlineText';
import Intercom from 'components/Shared/Intercom';
import { Dimens } from 'variables';

const Row = styled.div`
  margin-top: ${Dimens.medium3}px;
`;

const Text = styled.div`
  margin-top: ${Dimens.medium}px;
`;

export default () => (
  <div>
    <H2>お問い合わせ</H2>
    <Row>
      <Text>
        <InlineText.Base>画面右下の赤いボタンからご相談ください。</InlineText.Base>
      </Text>
      <Text>
        <InlineText.Base>
          お問い合わせ内容を送信後、メールアドレスを入力いただくと翌営業日を目安にご連絡致します。
        </InlineText.Base>
      </Text>
    </Row>
    <Intercom />
  </div>
);
