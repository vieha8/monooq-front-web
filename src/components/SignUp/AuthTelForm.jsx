import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
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
  border-radius: 3px;
  text-align: center;
  ${media.phone`
    width: 90%;
    margin-top: ${Dimens.medium}px;
    padding: ${Dimens.large}px ${Dimens.medium}px;
  `}
`;

const Logo = styled.img`
`;

const Title = styled.div`
  color: ${Colors.black};
  font-size: ${FontSizes.medium2}px;
  margin-top: ${Dimens.medium}px;
`;

const InputContainer = styled.div`
  margin-top: ${Dimens.medium3}px;
`;

const InputWrapper = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const ButtonWrapper = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const CaptionText = styled.div`
  margin-top: ${Dimens.medium2}px;
  font-size: ${FontSizes.xsmall}px;
  color: ${Colors.black};
  text-align: center;
  line-height: 1.6;
`;

export default props => (
  <Container>
    <Logo src={logoUri} />
    <Title>電話番号認証</Title>
    <InputContainer>
      <InputWrapper>
        <Input
          type="tel"
          placeholder="携帯電話番号を入力"
          icon="phone"
          iconPosition="left"
          fluid
          value={props.phone}
          onChange={props.handleChangePhone}
        />
      </InputWrapper>
    </InputContainer>
    <ButtonWrapper>
      <Button
        bgColor={Colors.pink}
        fluid
        onClick={props.onClickAuthTel}
      >
        次へ
      </Button>
    </ButtonWrapper>
    <CaptionText>
      ※電話番号は本人確認や不正利用防止のために利用しますが、取引成立時以外は他のユーザーには公開されません。<br />
      モノオクを利用するためには、電話番号またはSMSでの認証が必要です。
    </CaptionText>
  </Container>
);
