// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';
import { selectOptionPrefectures } from 'helpers/prefectures';
import selectOptionPurpose from 'helpers/purposes';
import Button from 'components/LV1/Forms/Button';
import CheckBox from 'components/LV1/Forms/CheckBox';
import RegsiterProfileImage from 'components/LV1/Forms/DragAndDrop/RegisterProfileImage';
import InputForm from 'components/LV2/Forms/InputForm';
import Select from 'components/LV2/Forms/Select';
import ErrorList from 'components/LV2/Lists/ErrorList';

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

const extention = (onChangeImage, imagePreview, image) => {
  return (
    <RegsiterProfileImage onDrop={data => onChangeImage(data[0])} image={imagePreview || image} />
  );
};

type PropTypes = {
  errors: Array<Array<string>>,
  onChangeImage: Function,
  imagePreview: File | sting,
  image: File | string,
  onChangeName: Function,
  name: string,
  onChangeEmail: Function,
  email: string,
  isNoticeEmail: boolean,
  onChangeNoticeEmail: Function,
  onKeyDownNoticeEmail: Function,
  onChangePhoneNumber: Function,
  phoneNumber: string,
  onChangePrefCode: Function,
  prefCode: string,
  onChangeProfile: Function,
  profile: string,
  onChangePurpose: Function,
  purpose: string,
  buttonDisabled: boolean,
  buttonLoading: boolean,
  onClickUpdate: Function,
  onKeyDownButtonUpdate: Function,
};

export default ({
  errors,
  onChangeImage,
  imagePreview,
  image,
  onChangeName,
  name,
  onChangeEmail,
  email,
  isNoticeEmail,
  onChangeNoticeEmail,
  onKeyDownNoticeEmail,
  onChangePhoneNumber,
  phoneNumber,
  onChangePrefCode,
  prefCode,
  onChangeProfile,
  profile,
  onChangePurpose,
  purpose,
  buttonDisabled,
  buttonLoading,
  onClickUpdate,
  onKeyDownButtonUpdate,
}: PropTypes) => (
  <Fragment>
    <Row>
      <InputForm
        label="プロフィール写真"
        extension={extention(onChangeImage, imagePreview, image)}
      />
    </Row>
    <Row>
      <InputForm
        label="お名前"
        placeholder="ニックネーム可"
        onChange={e => onChangeName(e.target.value)}
        value={name}
      />
      <ErrorList keyName="name_errors" errors={errors.name} />
    </Row>
    <Row>
      <InputForm
        label="メールアドレス"
        placeholder="info@monooq.com"
        onChange={e => onChangeEmail(e.target.value)}
        value={email}
      />
      <ErrorList keyName="email_errors" errors={errors.email} />
    </Row>
    <Row>
      <CheckBox
        checked={isNoticeEmail}
        onClick={onChangeNoticeEmail}
        onKeyDown={onKeyDownNoticeEmail}
      >
        サービスに関するお知らせメールを受け取る
      </CheckBox>
    </Row>
    <Row>
      <InputForm
        label="電話番号"
        placeholder="09012345678"
        onChange={e => onChangePhoneNumber(e.target.value)}
        value={phoneNumber}
        type="tel"
        hint="取引時の保険適用に必須となります。緊急時の連絡先として利用させていただく場合もございます。"
      />
      <ErrorList keyName="phoneNumber_errors" errors={errors.phoneNumber} />
    </Row>
    <Row>
      <Select
        label="お住いの地域"
        options={selectOptionPrefectures('選択してください')}
        onChange={e => onChangePrefCode(e.target.value)}
        value={prefCode}
      />
      <ErrorList keyName="prefCode_errors" errors={errors.prefCode} />
    </Row>
    <Row>
      <InputForm
        label="自己紹介"
        placeholder="はじめまして！ホストのYUKIです！部屋が一つ空いたので必要な方に使っていただければと思い登録してみました。ダンボール1箱～大きめの家具まで相談に乗ります。また、1階でのお預かりですので荷物の搬入出が簡単です。まずは気軽にご相談ください！"
        rows={6}
        multiline
        onChange={e => onChangeProfile(e.target.value)}
        value={profile}
      />
      <ErrorList keyName="profile_errors" errors={errors.profile} />
    </Row>
    <Row>
      <Select
        label="モノオクの利用方法"
        options={selectOptionPurpose('選択してください')}
        onChange={e => onChangePurpose(e.target.value)}
        value={purpose}
      />
      <ErrorList keyName="purpose_errors" errors={errors.purpose} />
    </Row>
    <ButtonWrap>
      <Button
        primary
        fill={1}
        fontbold
        disabled={buttonDisabled}
        onClick={buttonLoading ? null : onClickUpdate}
        loading={buttonLoading}
        onKeyDown={onKeyDownButtonUpdate}
      >
        プロフィールを更新する
      </Button>
    </ButtonWrap>
  </Fragment>
);
