// @flow
import React from 'react';
import styled from 'styled-components';
import { Colors, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import Path from 'config/path';
import Logo from 'components/atomic/LV1/Logo';
import Button from 'components/atomic/LV1/Button';

const ConciergeContents = props => {
  const StyledContainer = styled.div`
    margin: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    ${media.phone`
      justify-content: center;
      margin: 50px;
    `};
  `;

  return (
    <StyledContainer className="for-safe-section-list">
      <ConciergeSection onClick={() => props.history.push(Path.conciergeRequest())} />
    </StyledContainer>
  );
};

const ConciergeSection = ({ onClick }) => {
  const StyledContainer = styled.div`
    width: 40%;
    text-align: center;
    font-weight: bold;
    text-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
    color: ${Colors.brandPrimary};
    ${media.phone`
      width: 100%;
      margin-bottom: 30px;
    `};
  `;

  const Title = styled.div`
    font-size: ${FontSizes.medium3}px;
  `;

  const Description = styled.div`
    margin-top: 40px;
    margin-bottom: 30px;
  `;

  const DescriptionMain = styled.div`
    margin-top: 10px;
    font-size: ${FontSizes.medium2}px;
  `;

  const DescriptionSub = styled.div`
    font-size: ${FontSizes.small}px;
  `;

  const PriceContainer = styled.div`
    margin: auto;
    padding: 20px;
    width: 60%;
    ${media.phone`
      width: 70%;
    `};
    border: 1px solid ${Colors.brandPrimary};
    border-radius: 5px;
  `;

  const PriceSub = styled.div`
    font-size: ${FontSizes.small}px;
  `;

  const Price = styled.span`
    font-size: ${FontSizes.large}px;
  `;

  const PriceMain = styled.div`
    margin-top: 30px;
    margin-bottom: 30px;
  `;

  const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
  `;

  return (
    <StyledContainer>
      <Title>
        <Logo.Base width={200} />
        <br />
        Concierge
      </Title>
      <Description>
        <DescriptionSub>なかなかスペースが見つからない方へ</DescriptionSub>
        <DescriptionMain>あなたにぴったりなホストをご紹介!</DescriptionMain>
      </Description>
      <PriceContainer>
        <PriceSub>全国のスペース対象</PriceSub>
        <PriceMain>
          <Price>相談無料</Price>
        </PriceMain>
        <PriceSub>お気軽にご相談ください</PriceSub>
      </PriceContainer>
      <ButtonContainer>
        <Button onClick={onClick}>相談する</Button>
      </ButtonContainer>
    </StyledContainer>
  );
};

export default ConciergeContents;
