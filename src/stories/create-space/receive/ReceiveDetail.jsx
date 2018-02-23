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
    maxWidth: '600px',
    marginTop: `${Dimens.medium}px`,
    color: Colors.black,
    fontSize: FontSizes.medium,
  },
};

export default () => (
  <Container>
    <Title
      title="対応できる曜日や時間帯はいつですか？"
      subTitle="ユーザーが予定を立てる目安となります"
    />
    <Form>
      <TextArea
        style={styles.textarea}
        placeholder="例）普段は会社勤めですので、基本的には平日の夜の対応となります。土日でも対応できる時がありますので、事前にチャットでおしらせください！"
        rows={5}
      />
    </Form>
  </Container>
);
