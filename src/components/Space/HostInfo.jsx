import React from 'react';
import styled from 'styled-components';
import { media, isMobileWindow } from 'helpers/style/media-query';
import { FontSizes, Colors, Dimens } from 'variables';

const Container = styled.div`
  display: table;
  width: 100%;
  min-height: 80px;
  padding: ${Dimens.medium}px 0;
  background-color: ${Colors.lightGray2Bg};
  &::after {
    clear: both;
    content: "";
    display: block;
  }

  ${media.phone`
    display: block;
    padding: ${Dimens.medium}px;
  `}
`;

const ImageWrapper = styled.span`
  display: table-cell;
  width: 100px;
  vertical-align: top;
  font-size: ${FontSizes.medium}px;
  text-align: right;

  ${media.phone`
    display: block;
    width: 100%;
    text-align: center;
  `}
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

  ${media.phone`
    display: block;
    width: 100%;
    padding-left: 0;
  `}
`;

const HostName = styled.span`
  display: block;
  color: ${Colors.darkGray1};
  font-size: ${FontSizes.medium}px;
  line-height: 1.8;
  font-weight: bold;

  ${media.phone`
    display: block;
    width: 100%;
    font-size: ${FontSizes.medium}px;
    text-align: center;
  `}
`;

const IntroduceText = HostName.extend`
  font-weight: normal;
  
  ${media.phone`
    margin-top: ${Dimens.medium}px;
  `}
`;

export default props => (
  <Container>
    <ImageWrapper><Image {...props.img} /></ImageWrapper>
    <ContentContainer>
      <HostName>ホストは{isMobileWindow() && <br />}{props.hostName}さん</HostName>
      <IntroduceText>{props.text}</IntroduceText>
    </ContentContainer>
  </Container>
);
