import React from 'react';
import styled from 'styled-components';
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
  color: ${Colors.linkBlue};
  font-size: ${FontSizes.small}px;
  padding: 18px;
  cursor: pointer;
`;

export default props => (
  <Container>
    <ImageWrapper>
      <Image src={props.imageUri} alt={props.name} />
    </ImageWrapper>
    <Content>
      <Delete onClick={props.onClickDelete}>削除</Delete>
    </Content>
  </Container>
);
