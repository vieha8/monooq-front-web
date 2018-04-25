// @flow

import React from 'react';
import Button from 'components/atomic/LV1/Button';
import InlineText from 'components/atomic/LV1/InlineText';
import RegsiterProfileImage from 'components/atomic/LV1/DragAndDrop/RegisterProfileImage';
import InputForm from 'components/atomic/LV2/InputForm';
import SelectForm from 'components/atomic/LV2/SelectForm';
import { FontSizes } from 'variables';
import { selectOptionPrefectures } from 'helpers/prefectures';
import Form from './Form';

type PropTypes = {
  onChangeImage: Function,
  onChangeName: Function,
  onChangeArea: Function,
  onChangeProfile: Function,
  image: File | string,
  name: string,
  prefCode: string,
  profile: string,
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
    profile={
      <InputForm
        label="あなたの紹介文"
        hint="ユーザー・ホストが安心するようにあなたの紹介文を掲載しましょう！(1000文字以内)"
        placeholder="例）はじめまして！ホストのYUKIです。大きめの荷物でも柔軟に対応しております。お気軽にご相談ください。"
        multiline
        rows={4}
        onChange={e => props.onChangeProfile(e.target.value)}
        value={props.profile}
      />
    }
    button={
      <Button
        center
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
