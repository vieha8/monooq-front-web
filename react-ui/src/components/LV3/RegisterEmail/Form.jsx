import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, Colors, FontSizes } from 'variables';
import Path from 'config/path';
import InputForm from 'components/LV2/Forms/InputForm';
import InlineText from 'components/LV1/Texts/InlineText';
import TextLink from 'components/LV1/Texts/TextLink';
import ErrorList from 'components/LV2/Lists/ErrorList';

const Email = styled.div``;

const ErrorWrapper = styled.div`
  margin-top: ${Dimens.small}px;
`;

const Pass = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const Terms = styled.div`
  text-align: center;
  margin-top: ${Dimens.medium1_26}px;
  ${media.phone`
    margin-top: ${Dimens.medium_20}px;
  `};
`;

const Next = styled.div`
  margin-top: ${Dimens.medium1_26}px;
  ${media.phone`
    margin-top: ${Dimens.medium_20}px;
  `};
`;

const OtherSignup = styled.div`
  text-align: center;
  margin-top: ${Dimens.medium}px;
`;

const Facebook = styled.div`
  margin-top: ${Dimens.small}px;
`;

const ToLogin = styled.div`
  text-align: center;
  margin-top: ${Dimens.medium}px;
  padding-top: ${Dimens.medium}px;
  border-top: 1px solid ${Colors.borderGray};
`;

export default ({ errors, email, onChangeEmail, pass, next, otherSignup, facebook, toLogin }) => (
  <Fragment>
    <Email>
      <InputForm
        label="メールアドレス"
        placeholder="例）info@monooq.com"
        value={email}
        onChange={e => onChangeEmail(e.target.value)}
      />
    </Email>
    <ErrorWrapper>
      <ErrorList keyName="error_email" errors={errors.email} />
    </ErrorWrapper>
    <Pass>{pass}</Pass>
    <ErrorWrapper>
      <ErrorList keyName="error_password" errors={errors.password} />
    </ErrorWrapper>
    <Terms>
      <InlineText.Base fontSize={12}>
        新規登録を行うと、
        <br />
        <TextLink
          to={Path.terms()}
          target="_blank"
          rel="noopener noreferrer"
          fontSize={FontSizes.small_12}
          color={Colors.brandPrimary}
        >
          利用規約
        </TextLink>
        と
        <TextLink
          to={Path.privacy()}
          target="_blank"
          rel="noopener noreferrer"
          fontSize={FontSizes.small_12}
          color={Colors.brandPrimary}
        >
          個人情報保護方針
        </TextLink>
        に同意したとみなします
      </InlineText.Base>
    </Terms>
    <Next>{next}</Next>
    <OtherSignup>{otherSignup}</OtherSignup>
    <Facebook>{facebook}</Facebook>
    <ToLogin>{toLogin}</ToLogin>
  </Fragment>
);
