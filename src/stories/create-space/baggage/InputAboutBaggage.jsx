import React from 'react';
import styled from 'styled-components';
import { Form, TextArea } from 'semantic-ui-react';
import Title from '../shared/Title';
import { Colors, FontSizes, Dimens } from '../../../variables';

const Container = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const styles = {
  textarea: {
    width: '100%',
    marginTop: `${Dimens.medium}px`,
    color: Colors.black,
    fontSize: FontSizes.medium,
  },
};

export default () => (
  <Container>
    <Title
      title="預かることができる荷物について"
      subTitle="あなたのスペースで預かることができそうな荷物について説明しましょう"
    />
    <Form>
      <TextArea
        style={styles.textarea}
        placeholder="例）ダンボールなどのサイズが決まったものや、大きな荷物でも対応可能です！一人暮らしの荷物一式程度ならお受けすることができます！まずはご相談ください！"
        rows={5}
      />
    </Form>
  </Container>
);
