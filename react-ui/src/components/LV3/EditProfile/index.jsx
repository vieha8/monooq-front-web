// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Colors, Dimens } from 'variables';
import RegsiterProfileImage from 'components/LV1/DragAndDrop/RegisterProfileImage';
import InputForm from 'components/LV2/InputForm';
import SelectForm from 'components/LV2/SelectForm';
import InlineText from 'components/LV1/InlineText';
import Check from 'components/LV1/Check';
import Button from 'components/LV1/Button';
import { selectOptionPrefectures } from 'helpers/prefectures';
import { selectOptionPurpose } from 'helpers/purposes';

const Row = styled.div`
  &:not(:first-child) {
    margin: ${Dimens.medium2}px 0;
  }
`;

const ButtonWrap = styled.div`
  max-width: 240px;
  margin: auto;
  ${media.phone`
    max-width: 100%;
  `};
`;

function displayErrors(key: string, errors: Array<string>) {
  return (
    Array.isArray(errors) &&
    errors.map((e, i) => (
      <div key={`${key}_${i}`.toString()}>
        <InlineText.Small color={Colors.error}>{e}</InlineText.Small>
      </div>
    ))
  );
}

type PropTypes = {
  onChangeImage: Function,
  image: File | string,
  imagePreview: File | string,
  onChangeName: Function,
  name: string,
  nameErrors: Array<string>,
  onChangeEmail: Function,
  email: string,
  emailErrors: Array<string>,
  onChangePrefCode: Function,
  prefCode: string,
  prefCodeErrors: Array<string>,
  onChangePurpose: Function,
  profile: string,
  profileErrors: Array<string>,
  onChangeProfile: Function,
  purpose: string,
  purposeErrors: Array<string>,
  isNoticeEmail: boolean,
  onKeyDownNoticeEmail: Function,
  onChangeNoticeEmail: Function,
  onClickUpdate: Function,
  buttonDisabled: boolean,
  buttonLoading: boolean,
  onKeyDownButtonUpdate: Function,
};

export default (props: PropTypes) => (
  <Fragment>
    <Row>
      <InputForm
        label="プロフィール写真"
        extension={
          <RegsiterProfileImage
            onDrop={data => props.onChangeImage(data[0])}
            image={props.imagePreview || props.image}
          />
        }
      />
    </Row>
    <Row>
      <InputForm
        label="お名前"
        placeholder="ニックネーム可"
        onChange={e => props.onChangeName(e.target.value)}
        value={props.name}
      />
      {displayErrors('name_errors', props.nameErrors)}
    </Row>
    <Row>
      <InputForm
        label="メールアドレス"
        placeholder="info@monooq.com"
        onChange={e => props.onChangeEmail(e.target.value)}
        value={props.email}
      />
      {displayErrors('email_errors', props.emailErrors)}
    </Row>
    <Row>
      <Check
        checked={props.isNoticeEmail}
        onClick={props.onChangeNoticeEmail}
        onKeyDown={props.onKeyDownNoticeEmail}
      >
        サービスに関するお知らせメールを受け取る
      </Check>
    </Row>
    <Row>
      <InputForm
        label="電話番号"
        placeholder="09012345678"
        onChange={e => props.onChangePhoneNumber(e.target.value)}
        value={props.phoneNumber}
        type="tel"
        hint="取引時の保険適用に必須となります。緊急時の連絡先として利用させていただく場合もございます。"
      />
      {displayErrors('phoneNumber_errors', props.phoneNumberErrors)}
    </Row>
    <Row>
      <SelectForm
        label="お住いの地域"
        options={selectOptionPrefectures('選択してください')}
        onChange={e => props.onChangePrefCode(e.target.value)}
        value={props.prefCode}
      />
      {displayErrors('prefCode_errors', props.prefCodeErrors)}
    </Row>
    <Row>
      <InputForm
        label="自己紹介"
        placeholder="はじめまして！ホストのYUKIです！部屋が一つ空いたので必要な方に使っていただければと思い登録してみました。ダンボール1箱～大きめの家具まで相談に乗ります。また、1階でのお預かりですので荷物の搬入出が簡単です。まずは気軽にご相談ください！"
        rows={6}
        multiline
        onChange={e => props.onChangeProfile(e.target.value)}
        value={props.profile}
      />
      {displayErrors('profile_errors', props.profileErrors)}
    </Row>
    <Row>
      <SelectForm
        label="モノオクの利用方法"
        options={selectOptionPurpose('選択してください')}
        onChange={e => props.onChangePurpose(e.target.value)}
        value={props.purpose}
      />
      {displayErrors('purpose_errors', props.purposeErrors)}
    </Row>
    <ButtonWrap>
      <Button
        primary
        fill={1}
        fontbold
        disabled={props.buttonDisabled}
        onClick={props.buttonLoading ? null : props.onClickUpdate}
        loading={props.buttonLoading}
        onKeyDown={props.onKeyDownButtonUpdate}
      >
        プロフィールを更新する
      </Button>
    </ButtonWrap>
  </Fragment>
);
