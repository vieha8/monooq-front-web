// @flow

import React from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { PictureIcon } from 'components/atomic/LV1/ActionIcon';
import InlineText from 'components/atomic/LV1/InlineText';
import TextArea from 'components/atomic/LV1/TextArea';
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
  value: string,
  onChange: Function,
  preview: File,
};

export default (props: PropTypes) => (
  <PickImageWrap>
    <Dropzone accept="image/jpeg, image/png" onDrop={data => props.onPickImage(data[0])}>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          <PictureIcon verticalMiddle fontSize={24} />
          <LabelWrapper>
            <InlineText.Small>写真を送信する</InlineText.Small>
          </LabelWrapper>
          <input {...getInputProps()} />
          {props.preview && <Thumbnail src={props.preview} />}
        </div>
      )}
    </Dropzone>
    <TextArea
      rows={5}
      placeholder="メッセージを入力する…"
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
    />
  </PickImageWrap>
);
