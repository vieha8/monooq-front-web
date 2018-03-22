import React, { Component } from 'react';
import styled from 'styled-components';
import { FontSizes, Colors, Dimens } from 'variables';
import logoUri from 'images/monooq_logo_mark.svg';
import { media } from 'helpers/style/media-query';

const Logo = styled.img`
  width: 60px;
  height: 60px;
`;

const Title = styled.div`
  color: ${Colors.darkGray1};
  font-size: ${FontSizes.medium2}px;
  margin-top: ${Dimens.medium}px;
`;

const Container = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${Colors.yellow};
`;

const Container2 = styled.div`
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

const Message = styled.div`
  font-size: ${FontSizes.xsmall}px;
  line-height: 1.5;
  color: ${Colors.lightGray1};
  margin-top: ${Dimens.medium}px;
`;

export default class PasswordReset extends Component {
  componentDidMount() {
    document.body.style.background = Colors.yellow;
  }

  componentWillUnmount() {
    document.body.style.background = Colors.white;
  }

  render() {
    return (
      <Container>
        <Container2>
          <Logo src={logoUri} />
          <Title>再設定用メールを送信しました</Title>
          <Message>パスワード再設定用のメールをお送りしました。<br />メールの内容にしたがってお手続きください。</Message>
        </Container2>
      </Container>
    );
  }
}
