import React from 'react';
import styled from 'styled-components';
import { Colors, FontSizes, Dimens } from 'variables';

const Container = styled.div`
  display: table;
`;

const ImageWrapper = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

const Image = styled.img`
  display: block;
  border-radius: 6px;
  margin-right: ${Dimens.medium}px;
  object-fit: cover;
`;

const Content = styled.div`
  display: table-cell;
  vertical-align: top;
`;

const PlaceText = styled.span`
  dipslay: block;
  color: ${Colors.brandPrimary};
  font-size: ${FontSizes.xsmall}px;
`;

const Title = styled.span`
  display: block;
  max-height: calc(1.4em * 3);
  color: ${Colors.darkGray1};
  font-size: ${FontSizes.xsmall}px;
  margin-top: ${Dimens.small}px;
  line-height: 1.4em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default props => (
  <Container>
    <ImageWrapper>
      <Image src="http://placehold.jp/100x60.png" alt={props.name} />
    </ImageWrapper>
    <Content>
      <PlaceText>{props.place}</PlaceText>
      <Title>{props.title}</Title>
    </Content>
  </Container>
);
