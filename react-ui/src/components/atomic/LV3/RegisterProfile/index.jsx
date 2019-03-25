// @flow

import React from 'react';
import InlineText from 'components/atomic/LV1/InlineText';
import RegsiterProfileImage from 'components/atomic/LV1/DragAndDrop/RegisterProfileImage';
import InputForm from 'components/atomic/LV2/InputForm';
import SelectForm from 'components/atomic/LV2/SelectForm';
import { FontSizes } from 'variables';
import { selectOptionPrefectures } from 'helpers/prefectures';
import EntryButtons from 'components/atomic/LV2/EntryButtons';
import Form from './Form';

type PropTypes = {
  onChangeImage: Function,
  onChangeName: Function,
  onChangeArea: Function,
  onChangeProfile: Function,
  onChangePhoneNumber: Function,
  image: File | string,
  imagePreview: File | string,
  name: string,
  nameErrors: Array<string>,
  prefCode: string,
  prefCodeErrors: Array<string>,
  profile: string,
  profileErrors: Array<string>,
  phoneNumber: string,
  phoneNumberErrors: Array<string>,
  buttonDisabled: boolean,
  buttonLoading: boolean,
  onClickSkip: Function,
  onClickRegisterProfile: Function,
  story?: boolean,
};

export default (props: PropTypes) => (
  <Form
    story={props.story}
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
            onDrop={data => props.onChangeImage(data[0])}
            image={props.imagePreview || props.image}
          />
        }
      />
    }
    name={
      <InputForm
        label="お名前"
        placeholder="ユーザ名を入力してください(ニックネーム可)"
        onChange={e => props.onChangeName(e.target.value)}
        value={props.name}
      />
    }
    nameErrors={props.nameErrors}
    prefCode={
      <SelectForm
        label="お住いの地域"
        options={selectOptionPrefectures('選択してください')}
        onChange={e => props.onChangeArea(e.target.value)}
        value={props.prefCode}
      />
    }
    prefCodeErrors={props.prefCodeErrors}
    profile={
      <InputForm
        label="自己紹介"
        placeholder="モノオクのご登録ありがとうございます！モノオク公式サポートです。初回スペース登録されたホストさんへメッセージのやり取り・お見積もりの作成など、実際に利用希望者から問い合わせがあった時のためにテストを行うことができます。"
        multiline
        rows={10}
        onChange={e => props.onChangeProfile(e.target.value)}
        value={props.profile}
      />
    }
    profileErrors={props.profileErrors}
    phoneNumber={
      <InputForm
        label="電話番号"
        hint="取引時の保険適用に必須となります。緊急時の連絡先として利用させていただく場合もございます。"
        placeholder="09012345678"
        onChange={e => props.onChangePhoneNumber(e.target.value)}
        value={props.phoneNumber}
        type="tel"
      />
    }
    phoneNumberErrors={props.phoneNumberErrors}
    button={
      <EntryButtons
        enabled
        rerative
        backButton={{
          text: 'スキップ',
          disabled: props.buttonDisabled,
          loading: props.buttonLoading,
          onClick: props.onClickSkip,
        }}
        enabledButton={{
          text: '決定',
          disabled: props.buttonDisabled,
          loading: props.buttonLoading,
          onClick: props.onClickRegisterProfile,
        }}
      />
    }
  />
);
