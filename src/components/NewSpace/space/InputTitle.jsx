import React from 'react';
import styled from 'styled-components';
import Input from 'components/Shared/Input';
import { Dimens } from 'variables';
import ErrorText from 'components/Shared/ErrorText';
import Title from '../shared/Title';

const Container = styled.div`
  margin-top: ${Dimens.medium}px;
`;

export default props => (
  <Container>
    <Title
      title="エリアや特徴がわかるタイトルをつけましょう"
      subTitle="全角40文字まで。"
    />
    <Input
      name="title"
      value={props.ui.space.title || ''}
      onChange={e => props.handleChangeTitle(e.target.value)}
      hasError={Array.isArray(props.error.errors.title) && props.error.errors.title.length > 0}
      placeholder="例）六本木駅チカで便利です。港区のど真ん中！長期預かりもOKです！"
    />
    {props.error.errors.title && <ErrorText errors={props.error.errors.title} />}
  </Container>
);
