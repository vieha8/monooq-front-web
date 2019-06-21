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
    title={
      <InlineText.Base fontSize={FontSizes.medium2} bold>
        プロフィールの入力
      </InlineText.Base>
    }
    image={
      <InputForm
        label="プロフィール写真"
        margintop={1}
        extension={
          <RegsiterProfileImage
            onDrop={data => onChangeImage(data[0])}
            image={imagePreview || image}
          />
        }
      />
    }
    name={
      <InputForm
        label="お名前"
        placeholder="ユーザ名を入力してください(ニックネーム可)"
        onChange={e => onChangeName(e.target.value)}
        value={name}
      />
    }
    prefCode={
      <SelectForm
        label="お住いの地域"
        options={selectOptionPrefectures('選択してください')}
        onChange={e => onChangeArea(e.target.value)}
        value={prefCode}
      />
    }
    profile={
      <InputForm
        label="自己紹介"
        placeholder="はじめまして！ホストのYUKIです！部屋が一つ空いたので必要な方に使っていただければと思い登録してみました。ダンボール1箱～大きめの家具まで相談に乗ります。また、1階でのお預かりですので荷物の搬入出が簡単です。まずは気軽にご相談ください！"
        multiline
        rows={10}
        onChange={e => onChangeProfile(e.target.value)}
        value={profile}
      />
    }
    phoneNumber={
      <InputForm
        label="電話番号"
        hint="取引時の保険適用に必須となります。緊急時の連絡先として利用させていただく場合もございます。"
        placeholder="09012345678"
        onChange={e => onChangePhoneNumber(e.target.value)}
        value={phoneNumber}
        type="tel"
      />
    }
    button={
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
    }
  />
);
