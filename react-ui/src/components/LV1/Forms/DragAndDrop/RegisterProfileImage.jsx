import React from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { Colors, FontSizes } from 'variables';

const URL_IMAGE_PROFILE_DEFAULT =
  'https://monooq.imgix.net/img%2Fusers%2Fdefault%2Ficon-profile-default.svg?alt=media&auto=compress';

const DropzoneWrap = styled.div`
  display: table;
  cursor: pointer;
  margin: auto;
  ${props =>
    props.noMarginleft &&
    `
      margin-left: 0;
    `};
`;

const Wrap = styled.div`
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

export default ({ onDrop, image, imagePreview, noMarginleft }) => (
  <DropzoneWrap noMarginleft={noMarginleft}>
    <Dropzone accept="image/jpeg, image/png" onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <Wrap {...getRootProps()}>
          {image ? (
            <Preview src={imagePreview || image} />
          ) : (
            <div>
              <Image src={URL_IMAGE_PROFILE_DEFAULT} alt="profile" />
              <Text>写真を選択</Text>
            </div>
          )}
          <input {...getInputProps()} />
        </Wrap>
      )}
    </Dropzone>
  </DropzoneWrap>
);
