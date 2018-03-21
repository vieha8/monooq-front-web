import React from 'react';
import styled from 'styled-components';
import TextArea from 'components/Shared/TextArea';
import Title from 'components/NewSpace/shared/Title';
import ErrorText from 'components/Shared/ErrorText';
import { Dimens } from 'variables';

const Container = styled.div`
  margin-top: ${Dimens.medium}px;
`;

export default props => (
  <Container>
    <Title
      title="このスペースに置ける荷物について"
      subTitle="あなたのスペースで預かることができそうな荷物について説明しましょう"
    />
    <TextArea
      value={props.ui.space.about}
      onChange={e => props.handleChangeAbout(e.target.value)}
      placeholder="例）ダンボールなどのサイズが決まったものや、大きな荷物でも対応可能です！一人暮らしの荷物一式程度ならお受けすることができます！まずはご相談ください！"
      rows={5}
      invalid={(props.error.errors.about || []).length}
    />
    {props.error.errors.about && <ErrorText errors={props.error.errors.about} />}
  </Container>
);
