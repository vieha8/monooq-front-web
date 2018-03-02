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
  margin-bottom: ${Dimens.large}px;
  color: ${Colors.black};
  ${media.phone`
    font-size: ${FontSizes.medium2}px;
    line-height: inherit;
    padding: 0 ${Dimens.medium}px;
    margin-bottom: ${Dimens.medium}px;
  `}
`;

export default props => (
  <PageContainer>
    <Page>
      <Container>
        <Title>{props.title}</Title>
        {props.children}
      </Container>
    </Page>
    <Footer />
  </PageContainer>
);
