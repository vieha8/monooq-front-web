// @flow

import React from 'react';
import InlineText from 'components/LV1/InlineText';
import RegsiterProfileImage from 'components/LV1/DragAndDrop/RegisterProfileImage';
import InputForm from 'components/LV2/InputForm';
import SelectForm from 'components/LV2/SelectForm';
import { FontSizes } from 'variables';
import { selectOptionPrefectures } from 'helpers/prefectures';
import EntryButtons from 'components/LV2/EntryButtons';
import Form from './Form';

const inlineText = text => {
  return (
    <InlineText.Base fontSize={FontSizes.medium2} bold>
      {text}
    </InlineText.Base>
  );
};

const regsiterProfileImage = (imagePreview, image, onChangeImage) => {
  return (
    <RegsiterProfileImage onDrop={data => onChangeImage(data[0])} image={imagePreview || image} />
  );
};

const inputForm = (label, hint, placeholder, onChange, value, multiline, rows, type, extension) => {
  return (
    <InputForm
      label={label}
      hint={hint}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      multiline={multiline}
      rows={rows}
      type={type}
      extension={extension}
    />
  );
};

const selectForm = (onChangeArea, prefCode) => {
  return (
    <SelectForm
      label="お住いの地域"
      options={selectOptionPrefectures('選択してください')}
      onChange={e => onChangeArea(e.target.value)}
      value={prefCode}
    />
  );
};

const entryButtons = (buttonDisabled, buttonLoading, onClickSkip, onClickRegisterProfile) => {
  return (
    <EntryButtons
      enabled
      rerative
      backButton={{
        text: 'スキップ',
        disabled: buttonDisabled,
        loading: buttonLoading,
        onClick: onClickSkip,
      }}
      enabledButton={{
        text: '決定',
        disabled: buttonDisabled,
        loading: buttonLoading,
        onClick: onClickRegisterProfile,
      }}
    />
  );
};

type PropTypes = {
  errors: Array<Array<string>>,
  onChangeImage: Function,
  imagePreview: File | string,
  image: File | string,
  onChangeName: Function,
  name: string,
  onChangeArea: Function,
  prefCode: string,
  onChangeProfile: Function,
  profile: string,
  onChangePhoneNumber: Function,
  phoneNumber: string,
  buttonDisabled: boolean,
  buttonLoading: boolean,
  onClickSkip: Function,
  onClickRegisterProfile: Function,
  story?: boolean,
};

export default ({
  errors,
  onChangeImage,
  imagePreview,
  image,
  onChangeName,
  name,
  onChangeArea,
  prefCode,
  onChangeProfile,
  profile,
  onChangePhoneNumber,
  phoneNumber,
  buttonDisabled,
  buttonLoading,
  onClickSkip,
  onClickRegisterProfile,
  story,
}: PropTypes) => (
  <Form
    story={story}
    errors={errors}
    title={inlineText('プロフィールの入力')}
    image={inputForm(
      'プロフィール写真',
      '',
      '',
      '',
      '',
      false,
      0,
      '',
      regsiterProfileImage(imagePreview, image, onChangeImage),
    )}
    name={inputForm(
      'お名前',
      '',
      'ユーザ名を入力してください(ニックネーム可)',
      e => onChangeName(e.target.value),
      name,
      false,
      0,
      '',
      '',
    )}
    prefCode={selectForm(onChangeArea, prefCode)}
    profile={inputForm(
      '自己紹介',
      '',
      'はじめまして！ホストのYUKIです！部屋が一つ空いたので必要な方に使っていただければと思い登録してみました。ダンボール1箱～大きめの家具まで相談に乗ります。また、1階でのお預かりですので荷物の搬入出が簡単です。まずは気軽にご相談ください！',
      e => onChangeProfile(e.target.value),
      profile,
      true,
      10,
      '',
      '',
    )}
    phoneNumber={inputForm(
      '電話番号',
      '取引時の保険適用に必須となります。緊急時の連絡先として利用させていただく場合もございます。',
      '09012345678',
      e => onChangePhoneNumber(e.target.value),
      phoneNumber,
      false,
      0,
      'tel',
      '',
    )}
    button={entryButtons(buttonDisabled, buttonLoading, onClickSkip, onClickRegisterProfile)}
  />
);
