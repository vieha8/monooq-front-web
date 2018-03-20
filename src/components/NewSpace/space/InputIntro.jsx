import React from 'react';
import styled from 'styled-components';
import { Form } from 'semantic-ui-react';
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
      subTitle="荷物を預けても安心できるように、スペースやあなたが出来ることをアピールしましょう！"
    />
    <Form>
      <TextArea
        name="introduction"
        value={props.ui.space.introduction || ''}
        onChange={e => props.handleChangeIntroduction(e.target.value)}
        hasError={Array.isArray(props.error.errors.introduction) && props.error.errors.introduction.length > 0}
        placeholder="例）広めの1ルームで預かります。短期でも長期でも可能です。普段は主婦をしているので、夕方までなら物の物の出し入れにも対応できると思います。"
        rows={5}
      />
    </Form>
    {props.error.errors.introduction && <ErrorText errors={props.error.errors.introduction} />}
  </Container>
);
