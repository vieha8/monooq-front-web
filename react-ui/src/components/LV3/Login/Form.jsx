import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, Colors, FontSizes } from 'variables';
import Path from 'config/path';
import InputField from 'components/LV1/Forms/InputField';
import TextLink from 'components/LV1/Texts/TextLink';

const Email = styled.div`
  margin-top: ${Dimens.medium2_35}px;
  ${media.phone`
    margin-top: ${Dimens.medium1}px;
  `};
`;

const Pass = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const Failed = styled.div`
  text-align: center;
  margin-top: ${Dimens.xsmall}px;
`;

const Remind = styled.div`
  text-align: center;
  margin-top: ${Dimens.medium1_26}px;
  ${media.phone`
    margin-top: ${Dimens.medium2}px;
  `};
`;

const Login = styled.div`
  margin-top: ${Dimens.medium1_26}px;
  ${media.phone`
    margin-top: ${Dimens.medium2}px;
  `};
`;

const Facebook = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const ToSignup = styled.div`
  text-align: center;
  margin-top: ${Dimens.medium}px;
  padding-top: ${Dimens.medium}px;
  border-top: 1px solid ${Colors.borderGray};
`;

export default ({ email, onChangeEmail, pass, failed, login, facebook, toSignup }) => (
  <Fragment>
    <Email>
      <InputField
        placeholder="メールアドレス"
        value={email}
        onChange={e => onChangeEmail(e.target.value)}
      />
    </Email>
    <Pass>{pass}</Pass>
    <Failed>{failed}</Failed>
    <Remind>
      <TextLink
        to={Path.resetPassword()}
        fontSize={FontSizes.small}
        color={Colors.brandPrimary}
        underline="true"
      >
        パスワードを忘れた方はこちら
      </TextLink>
    </Remind>
    <Login>{login}</Login>
    <Facebook>{facebook}</Facebook>
    <ToSignup>{toSignup}</ToSignup>
  </Fragment>
);
