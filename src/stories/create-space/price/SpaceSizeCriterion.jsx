import React from 'react';
import styled from 'styled-components';
import { Card } from 'semantic-ui-react';
import { Colors, FontSizes, Dimens } from '../../../variables';

const Container = styled.div`
  margin-top: ${Dimens.medium3}px;
  ${props => (props.position === 'left' && `
    float: left;
  `)}
  ${props => (props.position === 'right' && `
    float: right;
  `)}
  cursor: pointer;
`;

const Text = styled.div`
  color: ${Colors.black};
  font-size: ${FontSizes.medium}px;
  line-height: 1.6;
`;

const Image = styled.img`
  display: block;
  margin-top: ${Dimens.medium}px;
`;

const styles = {
  card: {
    padding: Dimens.medium,
  },
  selected: {
    background: `${Colors.lightPink}`,
  },
};

export default props => (
  <Container position={props.position} selected={props.selected}>
    <Card style={{ ...styles.card, ...(props.selected ? styles.selected : {}) }} >
      <Card.Content>
        <Text>{props.text}</Text>
        <Image src="http://placehold.jp/230x130.png" alt={props.text} />
      </Card.Content>
    </Card>
  </Container>
);
