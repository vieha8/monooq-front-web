// @flow

import React from 'react';
import styled from 'styled-components';
import Button from 'components/atomic/atoms/Button';
import InlineText from 'components/atomic/atoms/InlineText';
import { H1 } from 'components/atomic/atoms/Headline';
import TextLink from 'components/atomic/atoms/TextLink';
import IconInputField from 'components/atomic/molecules/IconInputField';
import { Colors, FontSizes, Dimens } from 'variables';
import logoUri from 'images/monooq_logo_mark.svg';
import Form from './Form';

const Logo = styled.img`
  width: 60px;
  height: 60px;
`;

type PropTypes = {

}

export default (props: PropTypes) => (
  <Form
    logo={<Logo src={logoUri} />}
    title={<H1>ログインする</H1>}
    email={
      <IconInputField
        iconClassName="fal fa-envelope"
        placeholder="example.com"
      />
    }
    pass={
      <IconInputField
        iconClassName="fal fa-unlock-alt"
        placeholder="パスワード"
      />
    }
    remind={<TextLink to="">パスワードを忘れた方はこちら</TextLink>}
    login={
      <Button.Primary
        center
      >
        ログインする
        </Button.Primary>
    }
    otherLogin={<InlineText.Base>お持ちのアカウントでログイン</InlineText.Base>}
    facebook={
      <Button.Facebook
        center
      >
        <i className="fab fa-facebook-square" />&nbsp;Facebookでログインする
        </Button.Facebook>
    }
    toSignup={<TextLink to="">初めてのご利用ですか?新規登録はこちら</TextLink>}
  />
);
