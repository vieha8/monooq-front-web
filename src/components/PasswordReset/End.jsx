import React, { Component } from 'react';
import styled from 'styled-components';
import { Colors, Dimens } from 'variables';
import logoUri from 'images/monooq_logo_mark.svg';
import { media } from 'helpers/style/media-query';
import {FontSizes} from "../../variables";

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
  top: 64px;
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
        <br/>
        <div>パスワード再設定用のメールをお送りしました。メールの内容にしたがってお手続きください。</div>
        </Container2>
      </Container>
    );
  }
}
