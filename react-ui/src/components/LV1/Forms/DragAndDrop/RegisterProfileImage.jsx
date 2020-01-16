import React from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { Colors, FontSizes } from 'variables';
import IconProfileDefault from 'images/icon-profile-default.svg';

const DropzoneWrap = styled.div`
  display: table;
  cursor: pointer;
  margin: auto;
`;

const Container = styled.div`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
`;

const Image = styled.img`
  display: block;
  margin: 0 auto;
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

export default ({ onDrop, image, imagePreview }) => (
  <DropzoneWrap>
    <Dropzone accept="image/jpeg, image/png" onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <Container {...getRootProps()}>
          {image ? (
            <Preview src={imagePreview || image} />
          ) : (
            <div>
              <Image src={IconProfileDefault} alt="profile" />
              <Text>写真を選択</Text>
            </div>
          )}
          <input {...getInputProps()} />
        </Container>
      )}
    </Dropzone>
  </DropzoneWrap>
);
