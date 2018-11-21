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
  image: File | string,
  name: string,
  prefCode: string,
  profile: string,
  buttonDisabled: boolean,
  buttonLoading: boolean,
  onClickSkip: Function,
  onClickRegisterProfile: Function,
};

export default (props: PropTypes) => (
  <Form
    title={
      <InlineText.Base fontSize={FontSizes.medium2} bold>
        プロフィールの入力
      </InlineText.Base>
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
        placeholder="ユーザ名を入力してください"
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
        label="自己紹介"
        placeholder="モノオクのご登録ありがとうございます！モノオク公式サポートです。初回スペース登録されたホストさんへメッセージのやり取り・お見積もりの作成など、実際に利用希望者から問い合わせがあった時のためにテストを行うことができます。"
        multiline
        rows={10}
        onChange={e => props.onChangeProfile(e.target.value)}
        value={props.profile}
      />
    }
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
