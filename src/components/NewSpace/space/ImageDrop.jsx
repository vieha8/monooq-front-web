import React from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import Icon from 'components/Shared/Icon';
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
  line-height: 2;
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

const IconWrapper = styled.div`
  margin-top: ${Dimens.large}px;
  text-align: center;
  ${media.phone`
    margin-top: ${Dimens.medium}px;
  `}
`;

const StyledDropZone = styled(Dropzone)`
  width: 100%;
  margin-top: ${Dimens.medium}px;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

const showImagePreview = (props) => {
  //TODO 表示は仮なのでデザイン反映する
  if (props.ui.space.images) {
    return (
      <ul>
        {props.ui.space.images.map((v, i) => (
          <li key={i}>
            {v.name}<br />
            <img alt="preview" src={v.preview} width="100" />
          </li>
        ))}
      </ul>
    );
  }
};

export default props => (
  <Container>
    <Title
      title="スペースの様子を写真で登録しよう"
      subTitle="最大4枚まで登録可能です。"
    />
    <StyledDropZone
      accept="image/jpeg, image/png"
      onDrop={props.handleChangeImage}
    >
      <DndContent>
        <IconWrapper>
          <Icon name="fal fa-images" color={Colors.darkGray1} fontSize={FontSizes.large} inlineBlock />
        </IconWrapper>
        <DragText>クリックして写真を追加<br />またはドラッグする</DragText>
      </DndContent>
    </StyledDropZone>
    {showImagePreview(props)}
  </Container>
);
