import React from 'react';
import styled from 'styled-components';
import { Card, Button } from 'semantic-ui-react';
import { Colors, FontSizes, Dimens } from '../../variables';

const Container = styled.div`
`;

const SaveArea = styled.div`
  border-bottom: 1px solid ${Colors.borderGray};
  padding: ${Dimens.medium2}px 0;
`;

const Title = styled.span`
  display: block;
  color: ${Colors.black};
  font-size: ${FontSizes.medium1}px;
  margin: ${Dimens.medium2}px 0 ${Dimens.small}px ${Dimens.medium2}px;
`;

const Text = styled.span`
  display: block;
  color: ${props => (props.active ? Colors.black : Colors.disabled)};
  font-size: ${FontSizes.small}px;
  margin: ${Dimens.medium}px 0 0 ${Dimens.medium2}px;
  &:last-child {
    margin-bottom: ${Dimens.medium2}px;
  }
`;

const ButtonWrapper = styled.div`
  padding: ${Dimens.medium}px ${Dimens.medium2}px;
  text-align: center;
`;

const styles = {
  card: {
    width: '100%',
  },
  button: {
    backgroundColor: Colors.white,
    border: `1px solid ${Colors.pink}`,
    color: Colors.pink,
    width: '100%',
    height: '50px',
    fontSize: FontSizes.medium,
  },
};

export default props => (
  <Container>
    <Card style={styles.card}>
      <SaveArea>
        <Text active>下書き保存が可能です</Text>
        <ButtonWrapper>
          <Button style={styles.button}>保存する</Button>
        </ButtonWrapper>
      </SaveArea>
      <Title>場所登録のステップ</Title>
      <Text active={props.step >= 1}>1.スペースを登録する</Text>
      <Text active={props.step >= 2}>2.預かる荷物について</Text>
      <Text active={props.step >= 3}>3.荷物の受け取りについて</Text>
      <Text active={props.step >= 4}>4.料金の目安を設定する</Text>
    </Card>
  </Container>
);
