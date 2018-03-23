import React from 'react';
import styled from 'styled-components';
import { Card } from 'semantic-ui-react';
import { Colors, FontSizes, Dimens } from 'variables';

const Container = styled.div`
`;

const Title = styled.span`
  display: block;
  color: ${Colors.darkGray1};
  font-size: ${FontSizes.medium1}px;
  margin: ${Dimens.medium2}px 0 ${Dimens.small}px ${Dimens.medium2}px;
`;

const Text = styled.span`
  display: block;
  color: ${props => (props.active ? Colors.darkGray1 : Colors.disabled)};
  font-size: ${FontSizes.small}px;
  margin: ${Dimens.medium}px 0 0 ${Dimens.medium2}px;
  &:last-child {
    margin-bottom: ${Dimens.medium2}px;
  }
`;

const styles = {
  card: {
    width: '100%',
  },
  button: {
    backgroundColor: Colors.white,
    border: `1px solid ${Colors.brandPrimary}`,
    color: Colors.brandPrimary,
    width: '100%',
    height: '50px',
    fontSize: FontSizes.medium,
  },
};

export default props => (
  <Container>
    <Card style={styles.card}>
      <Title>登録の流れ</Title>
      <Text active={props.step >= 1}>1.スペースを登録する</Text>
      <Text active={props.step >= 2}>2.荷物について</Text>
      <Text active={props.step >= 3}>3.受け取りについて</Text>
      <Text active={props.step >= 4}>4.料金目安を設定する</Text>
    </Card>
  </Container>
);
