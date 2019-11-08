import React from 'react';
import InlineText from 'components/LV1/Texts/InlineText';
import RegsiterProfileImage from 'components/LV1/Forms/DragAndDrop/RegisterProfileImage';
import ButtonEntry from 'components/LV2/Forms/ButtonEntry';
import InputForm from 'components/LV2/Forms/InputForm';
import Select from 'components/LV2/Forms/Select';
import { FontSizes } from 'variables';
import { selectOptionPrefectures } from 'helpers/prefectures';
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

const inputForm = (
  label,
  hint,
  placeholder,
  onChange,
  value,
  multiline,
  rows,
  type,
  extension,
  className,
) => {
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
      className={className}
    />
  );
};

const selectForm = (onChangeArea, prefCode, className) => {
  return (
    <Select
      label="お住いの地域"
      options={selectOptionPrefectures('選択してください')}
      onChange={e => onChangeArea(e.target.value)}
      value={prefCode}
      className={className}
    />
  );
};

const buttonEntry = (buttonDisabled, buttonLoading, onClickSkip, onClickRegisterProfile) => {
  return (
    <ButtonEntry
      enabled
      relative
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
}) => (
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
      'gaSignupImage',
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
      'gaSignupName',
    )}
    prefCode={selectForm(onChangeArea, prefCode, 'gaSignupPref')}
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
      'gaSignupProfile',
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
      'gaSignupPhoneNumber',
    )}
    button={buttonEntry(buttonDisabled, buttonLoading, onClickSkip, onClickRegisterProfile)}
  />
);
