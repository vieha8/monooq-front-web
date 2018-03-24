import React from 'react';
import styled from 'styled-components';
import Button from 'components/Shared/Button';
import { Colors, FontSizes, Dimens } from 'variables';
import logoUri from 'images/monooq_logo_mark.svg';
import { media } from 'helpers/style/media-query';

const Container = styled.div`
  background: ${Colors.white};
  margin: 0 auto;
  width: 420px;
  margin-top: ${Dimens.large}px;
  padding: ${Dimens.large}px;
  border-radius: 6px;
  text-align: center;
  ${media.phone`
    width: 90%;
    margin-top: ${Dimens.medium}px;
    padding: ${Dimens.large}px ${Dimens.medium}px;
  `}
`;

const Logo = styled.img`
  width: 60px;
  height: 60px;
`;

const Title = styled.div`
  color: ${Colors.darkGray1};
  font-size: ${FontSizes.medium2}px;
  margin-top: ${Dimens.medium}px;
`;

const ButtonWrapper = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const CaptionText = styled.div`
  margin-top: ${Dimens.large}px;
  font-size: ${FontSizes.small}px;
  color: ${Colors.darkGray1};
  text-align: center;
  line-height: 1.5;
`;

export default props => (
  <Container>
    <Logo src={logoUri} />
    <Title>本人確認が完了しました！</Title>
    <CaptionText>プロフィール登録画面へ進みます。</CaptionText>
    <ButtonWrapper>
      <Button
        bgColor={Colors.brandPrimary}
        fluid
        onClick={props.onClickToProfile}
      >
        次へ
      </Button>
    </ButtonWrapper>
  </Container>
);
