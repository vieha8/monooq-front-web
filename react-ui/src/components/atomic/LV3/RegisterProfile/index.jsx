// @flow

import React from 'react';
import Button from 'components/atomic/LV1/Button';
import InlineText from 'components/atomic/LV1/InlineText';
import RegsiterProfileImage from 'components/atomic/LV1/DragAndDrop/RegisterProfileImage';
import InputForm from 'components/atomic/LV2/InputForm';
import SelectForm from 'components/atomic/LV2/SelectForm';
import RadioList from 'components/atomic/LV2/RadioList';
import { FontSizes } from 'variables';
import { selectOptionPrefectures } from 'helpers/prefectures';
import Form from './Form';

type PropTypes = {
  onChangeImage: Function,
  onChangeName: Function,
  onChangeArea: Function,
  onChangeProfile: Function,
  onChangePhoneNumber: Function,
  image: File | string,
  name: string,
  prefCode: string,
  profile: string,
  phoneNumber: string,
  buttonDisabled: boolean,
  buttonLoading: boolean,
  onClickRegisterProfile: Function,
};

export default (props: PropTypes) => (
  <Form
    title={
      <InlineText.Base fontSize={FontSizes.medium1}>あなたのプロフィールを登録</InlineText.Base>
    }
    image={
      <InputForm
        label="プロフィール写真"
        extension={
          <RegsiterProfileImage onDrop={data => props.onChangeImage(data[0])} image={props.image} />
        }
      />
    }
    name={
      <InputForm
        label="お名前"
        placeholder="ニックネームでも可"
        onChange={e => props.onChangeName(e.target.value)}
        value={props.name}
      />
    }
    area={
      <SelectForm
        label="お住いの地域"
        options={selectOptionPrefectures('選択してください')}
        onChange={e => props.onChangeArea(e.target.value)}
        value={props.prefCode}
      />
    }
    isHost={
      <RadioList
        label="利用目的"
        labels={['保管スペースを借りたい(ユーザー)', '保管スペースを貸したい(ホスト)']}
        onClick={props.onChangeIsHost}
        checkedIndex={props.isHost}
      />
    }
    profile={
      <InputForm
        label="あなたの紹介文"
        hint="スペースを借りたいユーザーや、貸してくれるホストが安心するようにあなたの紹介文を掲載しましょう！(1000文字以内)"
        placeholder="例）はじめまして！ホストのYUKIです。大きめの荷物でも柔軟に対応しております。お気軽にご相談ください。"
        multiline
        rows={4}
        onChange={e => props.onChangeProfile(e.target.value)}
        value={props.profile}
      />
    }
    phoneNumber={
      <InputForm
        label="電話番号"
        hint="緊急時の連絡先として利用させていただく場合がございます"
        placeholder="09012345678"
        onChange={e => props.onChangePhoneNumber(e.target.value)}
        value={props.phoneNumber}
        type="tel"
      />
    }
    button={
      <Button
        fill={1}
        primary
        disabled={props.buttonDisabled}
        loading={props.buttonLoading}
        onClick={props.onClickRegisterProfile}
      >
        プロフィールを登録する
      </Button>
    }
  />
);
