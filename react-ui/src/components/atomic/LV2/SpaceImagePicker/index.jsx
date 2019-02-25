// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import { H3 } from 'components/atomic/LV1/Headline';
import InlineText from 'components/atomic/LV1/InlineText';
import { PictureIcon } from 'components/atomic/LV1/ActionIcon';
import loadImage from 'blueimp-load-image';
import ImagePreview from './ImagePreview';

const DragText = styled.div`
  display: block;
  font-weight: bold;
  margin-top: ${Dimens.medium1}px;
  ${media.phone`
    display: none;
  `};
`;

const DndContent = styled.div`
  text-align: center;
  padding: ${Dimens.medium}px;
  width: 100%;
  height: 164px;
  border: 1px solid ${Colors.borderGray};
  border-radius: 6px;
  background: ${Colors.lightGray1Bg};
  ${media.phone`
    height: 100px;
  `};
`;

const IconWrapper = styled.div`
  margin-top: ${Dimens.medium2}px;
  text-align: center;
  ${media.phone`
    margin-top: ${Dimens.medium}px;
  `};
`;

const DropZoneWrap = styled.div`
  width: 100%;
  margin-top: ${Dimens.xsmall}px;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

const AddImageDropZoneWrap = styled.div`
  display: block;
  vertical-align: top;
  width: ${props => props.remain * 25}%;
  margin-top: 4px;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

const ImagePreviewContainer = styled.ul`
  width: 100%;
  margin-top: ${Dimens.xsmall}px;
`;

const ImagePreviewWrapper = styled.li`
  width: 100%;
  margin-bottom: ${Dimens.medium_15}px;
  &:last-child {
    margin-bottom: 0px;
  }
`;

const HintBottomWrap = styled.div`
  margin-top: 6px;
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
              <ImagePreviewWrapper key={`image_preivew_${i}`.toString()} widthRate={25}>
                <ImagePreview
                  imageUri={imageUrl}
                  onClickDelete={() => props.onClickDeleteImage(i)}
                />
              </ImagePreviewWrapper>
            );
          }

          return null;
        })}
        {images.length > 0 && images.length < MAX_PREVIEW_COUNT && (
          <AddImageDropZoneWrap>
            <Dropzone
              accept="image/jpeg, image/png"
              onDrop={data => handleChangeImageWithOrientationFix(data, props)}
            >
              {({ getRootProps, getInputProps }) => (
                <DndContent {...getRootProps()}>
                  <IconWrapper>
                    <PictureIcon />
                  </IconWrapper>
                  <DragText>
                    <InlineText.Base>写真を追加する</InlineText.Base>
                  </DragText>
                  <input {...getInputProps()} />
                </DndContent>
              )}
            </Dropzone>
          </AddImageDropZoneWrap>
        )}
      </ImagePreviewContainer>
    );
  }

  return null;
}

export default (props: PropTypes) => {
  const { images } = props;
  return (
    <Fragment>
      <div>
        <H3 bold>スペースの様子がわかる写真</H3>
      </div>
      {(images || []).length === 0 ? (
        <DropZoneWrap>
          <Dropzone
            accept="image/jpeg, image/png"
            onDrop={data => handleChangeImageWithOrientationFix(data, props)}
          >
            {({ getRootProps, getInputProps }) => (
              <DndContent {...getRootProps()}>
                <IconWrapper>
                  <PictureIcon />
                </IconWrapper>
                <DragText>
                  <div>
                    <InlineText.Base>タップして画像をアップロード</InlineText.Base>
                  </div>
                </DragText>
                <input {...getInputProps()} />
              </DndContent>
            )}
          </Dropzone>
        </DropZoneWrap>
      ) : (
        showImagePreview(props)
      )}
      <HintBottomWrap>
        <InlineText.Tiny>最大4枚まで登録可能です。</InlineText.Tiny>
      </HintBottomWrap>
    </Fragment>
  );
};
