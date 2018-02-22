import React from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { Button, Card } from 'semantic-ui-react';
import { Colors, FontSizes, Dimens } from '../../variables';

const Container = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const DragText = styled.span`
  display: block;
  color: ${Colors.black};
  font-size: ${FontSizes.small}px;
  margin-top: ${Dimens.medium}px;
`;

const styles = {
  button: {
    marginTop: `${Dimens.medium3}px`,
    color: Colors.pink,
    border: `1px solid ${Colors.pink}`,
    background: 'white',
    fontWeight: 'normal',
  },
  cardStyle: {
    textAlign: 'center',
    padding: `${Dimens.medium}px`,
    width: '100%',
    height: '240px',
  },
  dnd: {
    width: '100%',
    maxWidth: '600px',
  },
};

export default () => (
  <Container>
    <Dropzone
      style={styles.dnd}
      accept="image/jpeg, image/png"
      onDrop={(accepted, rejected) => { console.log({ accepted, rejected }); }}
    >
      <Card style={styles.cardStyle}>
        <Card.Content>
          <Button style={styles.button}>写真をアップロードする</Button>
          <DragText>または画像をドラッグする</DragText>
        </Card.Content>
      </Card>
    </Dropzone>
  </Container>
);
