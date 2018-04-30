// @flow

import React from 'react';
import styled from 'styled-components';
import TextLink from 'components/atomic/LV1/TextLink';
import { Colors, FontSizes } from 'variables';

const Container = styled.div`
  vertical-align: top;
  width: 100%;
  height: 200px;
  border: 1px solid ${Colors.borderGray};
  border-radius: 6px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 50%;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  overflow: hidden;
  object-fit: cover;
`;

const Content = styled.div`
  position: relative;
  height: 50%;
`;

const Delete = styled.span`
  position: absolute;
  dipslay: block;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  padding: 18px;
`;

type PropTypes = {
  imageUri: string,
  onClickDelete: Function,
};

export default (props: PropTypes) => (
  <Container>
    <ImageWrapper>
      <Image src={props.imageUri} alt="" />
    </ImageWrapper>
    <Content>
      <Delete>
        <TextLink
          onClick={e => {
            e.preventDefault();
            props.onClickDelete();
          }}
          fontSize={FontSizes.small}
        >
          削除
        </TextLink>
      </Delete>
    </Content>
  </Container>
);
