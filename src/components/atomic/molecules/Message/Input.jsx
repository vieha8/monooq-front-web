// @flow

import React from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { PictureIcon } from 'components/atomic/atoms/ActionIcon';
import InlineText from 'components/atomic/atoms/InlineText';
import TextArea from 'components/atomic/atoms/TextArea';
import { Dimens } from 'variables';

const PickImage = styled(Dropzone)`
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
  <div>
    <PickImage accept="image/jpeg, image/png" onDrop={data => props.onPickImage(data[0])}>
      <PictureIcon verticalMiddle fontSize={24} />
      <LabelWrapper>
        <InlineText.Small>写真を送信する</InlineText.Small>
      </LabelWrapper>
      {props.preview && <Thumbnail src={props.preview} />}
    </PickImage>
    <TextArea
      rows={5}
      placeholder="メッセージを入力する…"
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
    />
  </div>
);
