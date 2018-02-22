import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import { Title } from './index';
import { Colors, FontSizes, Dimens } from '../../variables';

const Container = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const styles = {
  input: {
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
      title="エリアや特徴がわかるタイトルをつけましょう"
      subTitle="全角40文字まで。"
    />
    <Input
      style={styles.input}
      size={40}
      placeholder="例）六本木駅チカで便利です。港区のど真ん中！長期預かりもOKです！"
    />
  </Container>
);
