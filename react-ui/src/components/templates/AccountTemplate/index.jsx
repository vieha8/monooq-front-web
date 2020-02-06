import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Colors, Dimens, FontSizes } from 'variables';
import { H1 } from 'components/LV1/Texts/Headline';

const Page = styled.div`
  padding: 85px 0;
  ${media.phone`
    padding: 54px 0;
  `};
`;

const Spacer = styled.div`
  margin-top: 54px;
  ${media.tablet`
    margin-top: 24px;
  `};
  ${media.phone`
    margin-top: 54px;
  `};
`;

const Title = styled(H1)`
  padding: ${Dimens.medium_20}px 0px;
  text-align: center;
  ${media.phone`
    font-size: ${FontSizes.medium_18}px;
    border-bottom: 1px solid ${Colors.borderGray};
  `};
`;

const Container = styled.div`
  width: 480px;
  margin: 0 auto;

  background: ${Colors.white};
  padding: ${Dimens.medium2}px;
  border-radius: 3px;
  border: 1px solid ${Colors.lightGray1};
  ${media.phone`
    width: 100%;
    padding: ${Dimens.medium}px;
    border: none;
  `};
`;

const AccountTemplate = ({ errorHeader, title, form }) => (
  <Page>
    {errorHeader && <Spacer />}
    <Title bold>{title}</Title>
    <Container>{form}</Container>
  </Page>
);

export default AccountTemplate;
