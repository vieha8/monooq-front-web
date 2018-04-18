// @flow

import React from 'react';
import styled from 'styled-components';
import { PictureIcon } from 'components/atomic/atoms/ActionIcon';
import InlineText from 'components/atomic/atoms/InlineText';
import TextArea from 'components/atomic/atoms/TextArea';

const PickImage = styled.div`
  cursor: pointer;
  margin-bottom: 8px;
`;

const LabelWrapper = styled.span`
  display: inline-block;
  margin-left: 8px;
  vertical-align: middle;
`;

type PropTypes = {
  onClickPickImage: Function,
  value: string,
  onChange: Function,
};

export default (props: PropTypes) => (
  <div>
    <PickImage onClick={props.onClickPickImage}>
      <PictureIcon verticalMiddle fontSize={24} />
      <LabelWrapper>
        <InlineText.Small>写真を送信する</InlineText.Small>
      </LabelWrapper>
    </PickImage>
    <TextArea
      rows={5}
      placeholder="メッセージを入力する…"
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
    />
  </div>
);
