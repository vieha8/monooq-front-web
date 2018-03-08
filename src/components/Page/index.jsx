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
  ${media.phone`
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
  line-height: 51px;
  letter-spacing: -0.5px;
  color: ${Colors.black};
  ${media.phone`
    font-size: ${FontSizes.medium2}px;
    line-height: inherit;
    padding: 0 ${Dimens.medium}px;
  `}
`;

const SubTitle = styled.div`
  margin-top: ${Dimens.medium}px;
  line-height: 1.6;
  ${media.phone`
    margin-top: ${Dimens.small2}px;
    padding: 0 ${Dimens.medium}px;
  `}
`;

const Content = styled.div`
  margin-top: ${Dimens.large}px;
  ${media.phone`
    margin-top: ${Dimens.medium}px;
  `}
`;

export const ContentContainer = styled.div`
  width: 688px;
  float: right;
  &:after {
    clear: both;
    content: "";
    display: block;
  }
  ${media.phone`
    float: none;
    width: 100%;
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
