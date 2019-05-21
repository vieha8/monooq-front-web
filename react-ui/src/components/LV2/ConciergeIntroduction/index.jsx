// @flow
import React from 'react';
import styled from 'styled-components';
import { Dimens, Colors, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import Button from 'components/LV1/Button';

const ConciergeContents = () => {
  const StyledContainer = styled.div`
    margin: ${Dimens.large_60}px auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    ${media.phone`
      justify-content: center;
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
    ${media.tablet`
      width: 100%;
    `};
  `;

  const Title = styled.div`
    font-size: ${FontSizes.medium2}px;
    font-weight: bold;
  `;

  const Description = styled.div`
    margin-top: ${Dimens.small_10}px;
  `;

  const DescriptionMain = styled.div`
    color: ${Colors.brandPrimary};
    font-size: ${FontSizes.medium2}px;
    font-weight: bold;
    line-height: ${Dimens.medium2_36}px;
  `;

  const Small = styled.span`
    font-size: ${FontSizes.small_15}px;
    line-height: ${Dimens.medium_22}px;
  `;

  const BrStyled = styled.br`
    display: block;
    ${media.phoneSmall`
      display: none;
    `};
  `;

  const DescriptionSub = styled.div`
    margin-top: ${Dimens.small2_15}px;
    font-size: ${FontSizes.small_13}px;
    line-height: ${Dimens.medium_19}px;
  `;

  const ButtonContainer = styled.div`
    display: block;
    justify-content: left;
    width: 100%;
    max-width: 184px;
    margin: ${Dimens.medium_20}px auto ${Dimens.medium_20}px 0px;
    ${media.phone`
      max-width: 100%;
      margin: ${Dimens.medium_20}px auto;
    `};
  `;

  return (
    <StyledContainer>
      <Title>お困り・お急ぎの方へ</Title>
      <Description>
        <DescriptionMain>
          <Small>モノオクサポートがお手伝い！</Small>
          <br />
          LINEで友だちになると無料で
          <BrStyled />
          おすすめのスペースをご紹介！
        </DescriptionMain>
        <DescriptionSub>
          なかなかご希望のスペースが見つからない方におすすめ。
          <br />
          LINEで問い合わせると、モノオクサポートがご要望にあったスペースを探してご提案いたします。
          <br />
          まずは気軽にご要望をお伝えください！
        </DescriptionSub>
      </Description>
      <ButtonContainer>
        <Button line reactGACategory="Requests" reactGAAction="Push LINE Register Button">
          友だち追加
        </Button>
      </ButtonContainer>
    </StyledContainer>
  );
};

export default ConciergeContents;
