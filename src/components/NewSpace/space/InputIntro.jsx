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
      title="スペースの紹介文"
      subTitle="スペース情報やあなたができることをアピールしましょう！"
    />
    <TextArea
      name="introduction"
      value={props.ui.space.introduction || ''}
      onChange={e => props.handleChangeText(e.target.value)}
      invalid={(props.error.errors.introduction || []).length}
      placeholder="例）家具も入れられるワンルームが余っています。数ヶ月の長期間でも可能です！朝〜夕方までなら荷物の出し入れにも対応できる日もあると思います。"
      rows={5}
    />
    {props.error.errors.introduction && <ErrorText errors={props.error.errors.introduction} />}
  </Container>
);
