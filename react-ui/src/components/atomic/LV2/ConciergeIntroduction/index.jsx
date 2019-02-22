// @flow
import React from 'react';
import styled from 'styled-components';
import { Colors, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import Logo from 'components/atomic/LV1/Logo';
import Button from 'components/atomic/LV1/Button';

const ConciergeContents = () => {
  const StyledContainer = styled.div`
    margin: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    ${media.phone`
      justify-content: center;
      margin: 50px 15px;
    `};
  `;

  return (
    <StyledContainer className="for-safe-section-list">
      <ConciergeSection />
    </StyledContainer>
  );
};

const ConciergeSection = () => {
  const StyledContainer = styled.div`
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
    display: block;
    justify-content: center;
    width: 100%;
    max-width: 240px;
    margin: 30px auto;
  `;

  return (
    <StyledContainer>
      <Title>
        <Logo.Base width={200} />
        <br />
        Concierge
      </Title>
      <Description>
        <DescriptionSub>お困り・お急ぎの方へ</DescriptionSub>
        <DescriptionMain>
          LINEでおすすめの
          <br />
          スペースをご紹介!
        </DescriptionMain>
      </Description>
      <ButtonContainer>
        <Button line reactGACategory="Requests" reactGAAction="Push LINE Register Button">
          友だち追加
        </Button>
      </ButtonContainer>
      <PriceContainer>
        <PriceSub>全国のスペース対象</PriceSub>
        <PriceMain>
          <Price>相談無料</Price>
        </PriceMain>
        <PriceSub>スタッフが親身に対応します</PriceSub>
      </PriceContainer>
    </StyledContainer>
  );
};

export default ConciergeContents;
