import React, { Fragment } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { Colors, Dimens } from 'variables';
import { media, mediaMin } from 'helpers/style/media-query';
import { isImageDefault } from 'helpers/images';
import Loading from 'components/LV1/Loading';
import { PictureIcon } from 'components/LV1/Images/ActionIcon';
import { H3 } from 'components/LV1/Texts/Headline';
import InlineText from 'components/LV1/Texts/InlineText';
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
  border-radius: 4px;
  background: ${Colors.lightGray1Bg};
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${media.phone`
    height: auto;
  `};
`;

const DndContentEmpty = styled(DndContent)`
  height: 117px;
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
  &:active {
    opacity: 0.6;
  }

  ${mediaMin.tablet`
    &:hover {
      opacity: 0.6;
    }
  `};
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

const handleChangeImageWithOrientationFix = (data, imagesTmp, onChangeImage) => {
  const images = [];
  const currentCount =
    imagesTmp && imagesTmp.length > 0 && isImageDefault(imagesTmp[0].url)
      ? imagesTmp.length - 1
      : imagesTmp.length;

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
    onChangeImage(images);
  }, 80);
};

// TODO: 最適化したい。
const getEmptyCount = length => {
  const emptyList = [];
  for (let i = 0; i < MAX_PREVIEW_COUNT - length; i += 1) {
    emptyList.push(i);
  }
  return emptyList;
};

const showImagePreview = (images, onClickDeleteImage) => {
  if (images) {
    return (
      <ImagePreviewContainer>
        {images.map((image, i) => {
          if (image.url) {
            const imageUrl = image.url;

            if (isImageDefault(imageUrl)) {
              // デフォルト画像は表示しない
              return null;
            }

            return (
              <ImagePreviewWrapper key={`image_preivew_${i}`.toString()} widthRate={25}>
                <ImagePreview imageUrl={imageUrl} onClickDelete={() => onClickDeleteImage(i)} />
              </ImagePreviewWrapper>
            );
          }

          return null;
        })}
        {getEmptyCount(isImageDefault(images[0].url) ? images.length - 1 : images.length).map(
          (v, i) => {
            return (
              <ImagePreviewWrapper key={`image_preivew_${i}`.toString()}>
                <DndContentEmpty />
              </ImagePreviewWrapper>
            );
          },
        )}
      </ImagePreviewContainer>
    );
  }

  return null;
};

export default ({ images, isImageUploading, onClickDeleteImage, onChangeImage }) => {
  return (
    <Fragment>
      <div>
        <H3 bold>スペースの写真</H3>
      </div>
      {isImageUploading && (
        <DropZoneWrap>
          <DndContent>
            <Loading size="medium" />
          </DndContent>
        </DropZoneWrap>
      )}
      {!isImageUploading &&
        (images && images.length > 0 && isImageDefault(images[0].url)
          ? (images || []).length - 1 < MAX_PREVIEW_COUNT
          : (images || []).length) < MAX_PREVIEW_COUNT && (
          <DropZoneWrap>
            <Dropzone
              accept="image/jpeg, image/png"
              onDrop={data => handleChangeImageWithOrientationFix(data, images, onChangeImage)}
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
      {(images || []).length > 0 && showImagePreview(images, onClickDeleteImage)}
      <HintBottomWrap>
        <InlineText.Tiny>
          最大4枚まで登録が可能です。
          <br />
          横向きの撮影がおすすめです。
        </InlineText.Tiny>
      </HintBottomWrap>
    </Fragment>
  );
};
