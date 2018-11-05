// @flow

import React from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import { H3 } from 'components/atomic/LV1/Headline';
import InlineText from 'components/atomic/LV1/InlineText';
import ImagePreview from './ImagePreview';

import loadImage from 'blueimp-load-image';

const DragText = styled.div`
  display: block;
  ${media.phone`
    display: none;
  `};
`;

const Icon = styled.i`
  display: inline-block;
  font-size: ${FontSizes.large}px;
  color: ${Colors.lightGray1};
`;

const DndContent = styled.div`
  text-align: center;
  padding: ${Dimens.medium}px;
  width: 100%;
  height: 200px;
  border: 1px solid ${Colors.borderGray};
  border-radius: 6px;
  background: ${Colors.lightGray1Bg};
  ${media.phone`
    height: 100px;
  `};
`;

const IconWrapper = styled.div`
  margin-top: ${Dimens.large}px;
  text-align: center;
  ${media.phone`
    margin-top: ${Dimens.medium}px;
  `};
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

type PropTypes = {
  images: Array<{
    url: string,
  }>,
  onChangeImage: Function,
  onClickDeleteImage: Function,
};

function handleChangeImageWithOrientationFix(data, props: PropTypes) {
  const images = [];
  const currentCount = props.images.length;

  for (let i = 0; i < MAX_PREVIEW_COUNT - currentCount && i < data.length; i += 1) {
    const file = data[i];

    loadImage.parseMetaData(
      data[i],
      data => {
        const options = {
          canvas: true,
        };
        if (data.exif) {
          options.orientation = data.exif.get('Orientation');
        }

        loadImage(
          file,
          canvas => {
            const dataUrl = canvas.toDataURL('image/jpeg');

            file.preview = dataUrl;
          },
          options,
        );
      },
      {},
    );
    images.push(data[i]);
  }

  setTimeout(() => {
    props.onChangeImage(images);
  }, 80);
}

function showImagePreview(props: PropTypes) {
  const { images } = props;
  if (images) {
    return (
      <ImagePreviewContainer>
        {images.map((image, i) => {
          if (image.url) {
            const imageUrl = image.url;

            if (imageUrl.includes('data:image/png;base64,')) {
              // デフォルト画像は表示しない
              return null;
            }

            return (
              <ImagePreviewWrapper key={`image_preivew_${i}`} widthRate={25}>
                <ImagePreview
                  imageUri={imageUrl}
                  onClickDelete={() => props.onClickDeleteImage(i)}
                />
              </ImagePreviewWrapper>
            );
          } else {
            return null;
          }
        })}
        {images.length > 0 &&
          images.length < MAX_PREVIEW_COUNT && (
            <StyledAddImageDropZone
              accept="image/jpeg, image/png"
              onDrop={data => handleChangeImageWithOrientationFix(data, props)}
              remain={MAX_PREVIEW_COUNT - images.length}
            >
              <DndContent>
                <IconWrapper>
                  <Icon className="far fa-plus" />
                </IconWrapper>
                <DragText>
                  <InlineText.Base color={Colors.lightGray1}>写真を追加する</InlineText.Base>
                </DragText>
              </DndContent>
            </StyledAddImageDropZone>
          )}
      </ImagePreviewContainer>
    );
  }

  return null;
}

export default (props: PropTypes) => {
  const { images } = props;
  return (
    <div>
      <div>
        <H3>スペースの様子を写真で登録しよう</H3>
      </div>
      <div>
        <InlineText.EmphasisSmall>最大4枚まで登録可能です。</InlineText.EmphasisSmall>
      </div>
      {(images || []).length === 0 ? (
        <StyledDropZone
          accept="image/jpeg, image/png"
          onDrop={data => handleChangeImageWithOrientationFix(data, props)}
        >
          <DndContent>
            <IconWrapper>
              <Icon className="fal fa-images" />
            </IconWrapper>
            <DragText>
              <div>
                <InlineText.Base color={Colors.lightGray1}>クリックして写真を追加</InlineText.Base>
              </div>
              <div>
                <InlineText.Base color={Colors.lightGray1}>またはドラッグする</InlineText.Base>
              </div>
            </DragText>
          </DndContent>
        </StyledDropZone>
      ) : (
        showImagePreview(props)
      )}
    </div>
  );
};
