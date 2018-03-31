// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import Button from 'components/atomic/atoms/Button';
import InlineText from 'components/atomic/atoms/InlineText';
import { H1 } from 'components/atomic/atoms/Headline';
import TextLink from 'components/atomic/atoms/TextLink';
import IconInputField from 'components/atomic/molecules/IconInputField';
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
    title={<H1>登録する</H1>}
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
    passConfirm={
      <IconInputField
        iconClassName="fal fa-lock-open-alt"
        placeholder="パスワードを再入力"  
      />
    }
    terms={
      <Fragment>
        <TextLink to="">利用規約</TextLink>
        <InlineText.Base>と</InlineText.Base>
        <TextLink to="">プライバシーポリシー</TextLink>
        <InlineText.Base>に同意の上、</InlineText.Base>
        <br />
        <InlineText.Base>次へボタンを押してください。</InlineText.Base>
      </Fragment>
    }
    next={
      <Button
        primary
        center
      >
        次へ
      </Button>
    }
    otherLogin={<InlineText.Base>お持ちのアカウントで登録</InlineText.Base>}
    facebook={
      <Button
        facebook
        center
      >
        <i className="fab fa-facebook-square" />&nbsp;Facebookで登録
      </Button>
    }
    toLogin={<TextLink to="">ログインはこちら</TextLink>}
  />
);
