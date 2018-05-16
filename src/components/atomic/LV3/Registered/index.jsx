// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import Button from 'components/atomic/LV1/Button';
import AvatarImage from 'components/atomic/LV1/AvatarImage';
import InlineText from 'components/atomic/LV1/InlineText';
import { FontSizes, Dimens } from 'variables';
import GoogleTagManager from 'components/GTM';

const Container = styled.div`
  text-align: center;
`;

const Content = styled.div`
  margin-top: ${Dimens.large}px;
`;

const TextWrapper = styled.div`
  margin-bottom: ${Dimens.small}px;
`;

const ImageWrapper = styled.div`
  margin: 0 auto;
  margin-bottom: ${Dimens.medium}px;
`;

const ButtonWrapper = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

type PropTypes = {
  userId: number,
  image: string,
  name: string,
  onClickUser: Function,
  onClickHost: Function,
};

export default class UserRegistered extends Component<PropTypes> {
  componentDidMount() {
    console.log(this.props);
    const script = document.createElement('script');

    script.innerHTML = `var __atw = __atw || [];
    __atw.push({ "merchant" : "monooq", "param" : {
        "result_id" : "100",
        "verify" : "user_register_${this.props.userId}",
    }});
(function(a){var b=a.createElement("script");b.src="https://h.accesstrade.net/js/nct/cv.min.js";b.async=!0;
a=a.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)})(document);`;

    document.body.appendChild(script);
  }

  render() {
    const props = this.props;

    return (
      <Container>
        <div>
          <InlineText.Base fontSize={FontSizes.medium2}>
            プロフィールの登録が完了しました！
          </InlineText.Base>
        </div>
        <Content>
          <ImageWrapper>
            <AvatarImage src={props.image} size={120} />
          </ImageWrapper>
          <div>
            <InlineText.Base>モノオクへようこそ！</InlineText.Base>
          </div>
          <div>
            <InlineText.Base>{props.name}さん</InlineText.Base>
          </div>
          <ButtonWrapper>
            <TextWrapper>
              <InlineText.Base>荷物を預ける場所をお探しですか？</InlineText.Base>
            </TextWrapper>
            <Button center primary onClick={props.onClickUser}>
              スペースを探す
            </Button>
          </ButtonWrapper>
          <ButtonWrapper>
            <TextWrapper>
              <InlineText.Base>誰かのお役に立てるスペースを掲載しますか？</InlineText.Base>
            </TextWrapper>
            <Button center secondary onClick={props.onClickHost}>
              ホストになる
            </Button>
          </ButtonWrapper>
        </Content>
        <GoogleTagManager event="userRegistered" />
      </Container>
    );
  }
}
