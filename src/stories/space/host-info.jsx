import React from 'react';
import styled from 'styled-components';
import { FontSizes, Colors, Dimens } from '../../variables';

const Container = styled.div`
  display: table;
  width: 100%;
  min-height: 80px;
  padding: ${Dimens.medium}px 0;
  background-color: ${Colors.lightGray};
  &::after {
    clear: both;
    content: "";
    display: block;
  }
`;

const ImageWrapper = styled.span`
  display: table-cell;
  width: 100px;
  vertical-align: top;
  font-size: ${FontSizes.medium}px;
  text-align: right;
`;

const Image = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

const ContentContainer = styled.div`
  display: table-cell;
  vertical-align: top;
  padding-left: ${Dimens.medium2}px;
`;

const HostName = styled.span`
  display: block;
  color: ${Colors.black};
  font-size: ${FontSizes.medium}px;
  line-height: 1.8;
  font-weight: bold;
`;

const IntroduceText = HostName.extend`
  font-weight: normal;
`;

export default props => (
  <Container>
    <ImageWrapper><Image {...props.img} /></ImageWrapper>
    <ContentContainer>
      <HostName>ホストは{props.hostName}さん</HostName>
      <IntroduceText>{props.text}</IntroduceText>
    </ContentContainer>
  </Container>
);
