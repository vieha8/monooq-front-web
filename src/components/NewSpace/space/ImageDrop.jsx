import React from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import Icon from 'components/Shared/Icon';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import Title from '../shared/Title';
import ImagePreview from './ImagePreview';

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
  height: 200px;
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

const StyledAddImageDropZone = styled(Dropzone)`
  display: table-cell;
  vertical-align: top;
  width: ${props => props.remain * 25}%;
  margin-top: ${Dimens.medium}px;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

const ImagePreviewContainer = styled.ul`
  display: table;
  width: 100%;
  margin-top: ${Dimens.medium}px;
`;

const ImagePreviewWrapper = styled.li`
  display: table-cell;
  width: ${props => props.widthRate}%;
  padding: 0 8px;
`;

const MAX_PREVIEW_COUNT = 4;
const showImagePreview = (props) => {
  const images = props.ui.space.images;
  if (images) {
    return (
      <ImagePreviewContainer>
        {images.map((image, i) => (
          <ImagePreviewWrapper key={`image_preivew_${i}`} widthRate={25}>
            <ImagePreview
              name={image.name}
              imageUri={image.preview}
              onClickDelete={() => props.onClickImageDelete(i)}
            />
          </ImagePreviewWrapper>
        ))}
        {images.length > 0 && images.length < MAX_PREVIEW_COUNT && (
          <StyledAddImageDropZone
            accept="image/jpeg, image/png"
            onDrop={props.handleChangeImage}
            remain={MAX_PREVIEW_COUNT - images.length}
          >
            <DndContent>
              <IconWrapper>
                <Icon name="far fa-plus" color={Colors.darkGray1} fontSize={FontSizes.large} inlineBlock />
              </IconWrapper>
              <DragText>写真を追加する</DragText>
            </DndContent>
          </StyledAddImageDropZone>
        )}
      </ImagePreviewContainer>
    );
  }

  return null;
};

export default (props) => {
  const images = props.ui.space.images;
  return (
    <Container>
      <Title
        title="スペースの様子を写真で登録しよう"
        subTitle="最大4枚まで登録可能です。"
      />
      {images.length === 0 ? (
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
      ) : showImagePreview(props)}
    </Container>
  );
}
