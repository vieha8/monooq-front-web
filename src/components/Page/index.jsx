import React from 'react';
import styled from 'styled-components';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import Footer from 'components/Shared/Footer';

const PageContainer = styled.div`
  width: 100%;
`;

const Page = styled.div`
  max-width: 1048px;
  ${media.tablet`
    width: 100%;
  `}
  margin: 0 auto;
  padding: 60px 0 120px;
`;

const Container = styled.div`
  width: 100%;
  &:after {
    clear: both;
    content: "";
    display: block;
  }
  margin-bottom: ${Dimens.large}px;
`;

const Title = styled.div`
  font-size: ${FontSizes.xlarge}px;
  line-height: 1.5;
  letter-spacing: -0.5px;
  color: ${Colors.black};
  ${media.tablet`
    font-size: ${FontSizes.medium2}px;
    padding: 0 ${Dimens.medium}px;
  `}
`;

const SubTitle = styled.div`
  margin-top: ${Dimens.medium}px;
  line-height: 1.5;
  ${media.tablet`
    margin-top: ${Dimens.small2}px;
    padding: 0 ${Dimens.medium}px;
  `}
`;

const Content = styled.div`
  margin-top: ${Dimens.large}px;
  ${media.tablet`
    margin-top: ${Dimens.medium}px;
  `}
`;

export const ContentContainer = styled.div`
  max-width: 688px;
  width: 60%;
  float: left;
  margin-left: ${Dimens.large}px;
  &:after {
    clear: both;
    content: "";
    display: block;
  }
  ${media.tablet`
    float: none;
    width: 100%;
    margin-left: 0;
  `}
`;

export default props => (
  <PageContainer>
    <Page>
      <Container>
        <Title>{props.title}</Title>
        {props.subTitle && <SubTitle>{props.subTitle}</SubTitle>}
        <Content>
          {props.children}
        </Content>
      </Container>
    </Page>
    <Footer />
  </PageContainer>
);
