import React from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { Button } from 'semantic-ui-react';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import Title from '../shared/Title';

const Container = styled.div`
`;

const DragText = styled.span`
  display: block;
  color: ${Colors.darkGray1};
  font-size: ${FontSizes.small}px;
  margin-top: ${Dimens.medium}px;
  ${media.phone`
    display: none;
  `}
`;

const DndContent = styled.div`
  text-align: center;
  padding: ${Dimens.medium}px;
  width: 100%;
  height: 240px;
  border: 1px solid ${Colors.borderGray};
  border-radius: 6px;
  ${media.phone`
    height: 100px;
    border: none;
  `}
`;

const ButtonWrapper = styled.div`
  margin-top: ${Dimens.large}px;
  ${media.phone`
    margin-top: ${Dimens.medium}px;
  `}
`;

const styles = {
  button: {
    color: Colors.brandPrimary,
    border: `1px solid ${Colors.brandPrimary}`,
    background: 'white',
    fontWeight: 'normal',
  },
  dnd: {
    width: '100%',
    marginTop: `${Dimens.medium}px`,
  },
  mobile: {
    cardStyle: {
      border: 'none',
    },
  },
};

const showImagePreview = (props) => {
  //TODO 表示は仮なのでデザイン反映する
  if(props.ui.space.images){
    return (
      <ul>
        {props.ui.space.images.map((v, i) => (
          <li key={i}>
            {v.name}<br/>
            <img alt="preview" src={v.preview} width="100" />
          </li>
        ))}
      </ul>
    );
  }
};

export default (props) => (
  <Container>
    <Title
      title="スペースの様子を写真で登録しよう"
      subTitle="最大4枚まで登録可能です。"
    />
    <Dropzone
      style={styles.dnd}
      accept="image/jpeg, image/png"
      onDrop={props.handleChangeImage}
    >
      <DndContent>
        <ButtonWrapper>
          <Button style={styles.button}>写真をアップロードする</Button>
        </ButtonWrapper>
        <DragText>または画像をドラッグする</DragText>
      </DndContent>
    </Dropzone>
    {showImagePreview(props)}
  </Container>
);
