// @flow

import React from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { Colors, FontSizes } from 'variables';

const DropzoneWrap = styled.div`
  display: table;
  cursor: pointer;
`;

const Container = styled.div`
  display: table-cell;
  vertical-align: middle;
  text-align: left;
`;

const Image = styled.i`
  display: block;
  font-size: 70px;
  margin: 0 auto;
  color: ${Colors.lightGray1};
`;

const Text = styled.div`
  display: block;
  font-size: ${FontSizes.xsmall}px;
  color: ${Colors.lightGray1};
  line-height: 2;
`;

const Preview = styled.img`
  display: block;
  width: 96px;
  height: 96px;
  border-radius: 70px;
  margin: 0 auto;
  object-fit: cover;
  float: left;
`;

type PropTypes = {
  onDrop: Function,
  image: File | string,
  imagePreview: File | string,
};

export default ({ onDrop, image, imagePreview }: PropTypes) => (
  <DropzoneWrap>
    <Dropzone accept="image/jpeg, image/png" onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <Container {...getRootProps()}>
          {image ? (
            <Preview src={imagePreview || image} />
          ) : (
            <div>
              <Image className="fal fa-image" />
              <Text>写真を登録する</Text>
            </div>
          )}
          <input {...getInputProps()} />
        </Container>
      )}
    </Dropzone>
  </DropzoneWrap>
);
