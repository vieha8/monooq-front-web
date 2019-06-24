// @flow

import React from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { PictureIcon } from 'components/LV1/ActionIcon';
import InlineText from 'components/LV1/InlineText';
import TextArea from 'components/LV1/TextArea';
import { Dimens } from 'variables';

const PickImageWrap = styled.div`
  cursor: pointer;
  margin-bottom: 8px;
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

type PropTypes = {
  onPickImage: Function,
  preview: File,
  value: string,
  onChange: Function,
};

export default ({ onPickImage, preview, value, onChange }: PropTypes) => (
  <PickImageWrap>
    <Dropzone accept="image/jpeg, image/png" onDrop={data => onPickImage(data[0])}>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          <PictureIcon verticalMiddle fontSize={24} />
          <LabelWrapper>
            <InlineText.Small>写真を送信する</InlineText.Small>
          </LabelWrapper>
          <input {...getInputProps()} />
          {preview && <Thumbnail src={preview} />}
        </div>
      )}
    </Dropzone>
    <TextArea
      rows={5}
      placeholder="メッセージを入力する…"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </PickImageWrap>
);
