// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import { H3 } from 'components/atomic/LV1/Headline';
import InlineText from 'components/atomic/LV1/InlineText';
import Loading from 'components/atomic/LV1/Loading';
import { PictureIcon } from 'components/atomic/LV1/ActionIcon';
import loadImage from 'blueimp-load-image';
import ImagePreview from './ImagePreview';

const DragText = styled.div`
  display: block;
  font-weight: bold;
  margin-top: ${Dimens.medium1}px;
  ${media.phone`
    margin: ${Dimens.medium_20}px auto;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${media.phone`
    height: auto;
  `};
`;

const DndContentEmpty = styled(DndContent)`
  height: 144px;
  ${media.phone`
    height: 77px;
  `};
`;

const IconWrapper = styled.div`
  text-align: center;
  ${media.phone`
    margin-top: ${Dimens.medium1}px;
  `};
`;

const DropZoneWrap = styled.div`
  width: 100%;
  margin-top: ${Dimens.small2}px;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

const ImagePreviewContainer = styled.ul`
  width: 100%;
  display: flex;
  margin-top: ${Dimens.medium1}px;
  ${media.tablet`
    margin-top: ${Dimens.small2}px;
  `};
`;

const ImagePreviewWrapper = styled.li`
  width: calc(25% + ${Dimens.xsmall}px);
  padding: 0 ${Dimens.small2}px;
  ${media.tablet`
    width: calc(25% + ${Dimens.xxsmall}px);
    padding: 0 ${Dimens.xsmall}px;
  `};
  &:first-child {
    width: calc(25% - ${Dimens.xsmall}px);
    padding: 0 ${Dimens.small2}px 0 0;
    ${media.tablet`
      width: calc(25% - ${Dimens.xxsmall}px);
      padding: 0 ${Dimens.xsmall}px 0 0;
    `};
  }
  &:last-child {
    width: calc(25% - ${Dimens.xsmall}px);
    padding: 0 0 0 ${Dimens.small2}px;
    ${media.tablet`
      width: calc(25% - ${Dimens.xxsmall}px);
      padding: 0 0 0 ${Dimens.xsmall}px;
    `};
  }
`;

const HintBottomWrap = styled.div`
  margin-top: ${Dimens.medium}px;
  ${media.tablet`
    margin-top: ${Dimens.xsmall}px;
  `};
`;

const OnlyPC = styled.span`
  display: block;
  ${media.tablet`
    display: none;
  `};
`;

const OnlyPhone = styled.span`
  display: none;
  ${media.tablet`
    display: block;
  `};
`;

const MAX_PREVIEW_COUNT = 4;

type PropTypes = {
  images: Array<{
    url: string,
  }>,
  onChangeImage: Function,
  onClickDeleteImage: Function,
  isImageUploading: boolean,
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

// TODO: 最適化したい。
function getEmptyCount(length) {
  const emptyList = [];
  for (let i = 0; i < MAX_PREVIEW_COUNT - length; i += 1) {
    emptyList.push(i);
  }
  return emptyList;
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
        {getEmptyCount(images.length).map((v, i) => {
          return (
            <ImagePreviewWrapper key={`image_preivew_${i}`.toString()}>
              <DndContentEmpty />
            </ImagePreviewWrapper>
          );
        })}
      </ImagePreviewContainer>
    );
  }

  return null;
}

export default (props: PropTypes) => {
  const { images, isImageUploading } = props;
  return (
    <Fragment>
      <div>
        <H3 bold>スペースの様子がわかる写真</H3>
      </div>
      {isImageUploading && (
        <DropZoneWrap>
          <DndContent>
            <Loading size="medium" />
          </DndContent>
        </DropZoneWrap>
      )}
      {!isImageUploading && (images || []).length < MAX_PREVIEW_COUNT && (
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
                  <OnlyPC>
                    <InlineText.Base>クリックして画像をアップロード</InlineText.Base>
                  </OnlyPC>
                  <OnlyPhone>
                    <InlineText.Base>タップして画像をアップロード</InlineText.Base>
                  </OnlyPhone>
                </DragText>
                <input {...getInputProps()} />
              </DndContent>
            )}
          </Dropzone>
        </DropZoneWrap>
      )}
      {(images || []).length > 0 && showImagePreview(props)}
      <HintBottomWrap>
        <InlineText.Tiny>最大4枚まで登録が可能です。</InlineText.Tiny>
      </HintBottomWrap>
    </Fragment>
  );
};
