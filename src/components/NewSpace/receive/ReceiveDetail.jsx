import React from 'react';
import styled from 'styled-components';
import TextArea from 'components/Shared/TextArea';
import { Dimens } from 'variables';
import ErrorText from 'components/Shared/ErrorText';
import Title from '../shared/Title';

const Container = styled.div`
  margin-top: ${Dimens.medium}px;
`;

export default props => (
  <Container>
    <Title
      title="対応できる曜日や時間帯はいつですか？"
      subTitle="ユーザーが予定を立てる目安となります"
    />
    <TextArea
      value={props.ui.space.receiptAbout}
      onChange={e => props.handleChangeText(e.target.value)}
      placeholder="例）普段は会社勤めですので、基本的には平日の夜の対応となります。土日でも対応できる時がありますので、事前にチャットでおしらせください！"
      rows={5}
      invalid={(props.error.errors.receiptAbout || []).length > 0}
    />
    {props.error.errors.receiptAbout && <ErrorText errors={props.error.errors.receiptAbout} />}
  </Container>
);
