import React from 'react';
import styled from 'styled-components';
import { Form, TextArea } from 'semantic-ui-react';
import { Colors, FontSizes, Dimens } from 'variables';
import Title from '../shared/Title';

const Container = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const styles = {
  textarea: {
    width: '100%',
    marginTop: `${Dimens.medium}px`,
    color: Colors.darkGray1,
    fontSize: FontSizes.medium,
  },
};

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
        style={styles.textarea}
        placeholder="例）広めの1ルームで預かります。短期でも長期でも可能です。普段は主婦をしているので、夕方までなら物の物の出し入れにも対応できると思います。"
        rows={5}
      />
    </Form>
  </Container>
);
