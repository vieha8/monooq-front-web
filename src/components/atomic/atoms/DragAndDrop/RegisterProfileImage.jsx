// @flow

import React from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { Colors, FontSizes } from 'variables';

const StyledDropzone = styled(Dropzone)`
  display: table;
  width: 100%;
`;

const Container = styled.div`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
`;

const Image = styled.i`
  display: block;
  font-size: 64px;
  margin: 0 auto;
  color: ${Colors.lightGray1};
`;

const Text = styled.div`
  display: block;
  font-size: ${FontSizes.xsmall}px;
  color: ${Colors.lightGray1};
  line-height: 2;
`;

type PropTypes = {
  onDrop: Function,
}

export default (props: PropTypes) => (
  <StyledDropzone
    accept="image/jpeg, image/png"
    onDrop={props.onDrop}
  >
    <Container>
      <Image className="fal fa-image" />
      <Text>写真を登録する</Text>
    </Container>
  </StyledDropzone>
);
