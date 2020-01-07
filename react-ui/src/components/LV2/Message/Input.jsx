import React from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { PictureIcon } from 'components/LV1/Images/ActionIcon';
import TextArea from 'components/LV1/Forms/TextArea';
import InlineText from 'components/LV1/Texts/InlineText';
import { Dimens, Colors, FontSizes, ErrorMessages } from 'variables';

const Wrap = styled.div`
  cursor: pointer;
  margin-bottom: 8px;
`;

const DropzoneWrap = styled.div`
  margin-bottom: ${Dimens.small}px;
`;

const LabelWrapper = styled.span`
  display: inline-block;
  margin-left: 8px;
  vertical-align: middle;
`;

const Thumbnail = styled.img`
  display: block;
  margin-top: ${Dimens.medium}px;
  height: 80px;
  object-fit: cover;
`;

const MessageErr = styled.div`
  white-space: pre-wrap;
  font-size: ${FontSizes.small}px;
  color: ${Colors.error};
`;

export default ({
  setStatucPickImage,
  onPickImage,
  isErrorPickImage,
  preview,
  value,
  onChange,
}) => (
  <Wrap>
    <DropzoneWrap>
      <Dropzone
        accept="image/jpeg, image/png"
        onDropAccepted={data => onPickImage(data[0])}
        onDropRejected={setStatucPickImage}
        maxSize={10485760} // 10MB
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <PictureIcon verticalMiddle fontSize={24} />
            <LabelWrapper>
              <InlineText.Small>写真を送信する</InlineText.Small>
            </LabelWrapper>
            {isErrorPickImage && (
              <MessageErr>{ErrorMessages.OverSizeSpaceImage('10MB')}</MessageErr>
            )}
            <input {...getInputProps()} />
            {preview && <Thumbnail src={preview} />}
          </div>
        )}
      </Dropzone>
    </DropzoneWrap>
    <TextArea
      rows={5}
      placeholder="メッセージを入力する…"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </Wrap>
);
