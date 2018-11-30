// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import RegsiterProfileImage from 'components/atomic/LV1/DragAndDrop/RegisterProfileImage';
import InputForm from 'components/atomic/LV2/InputForm';
import SelectForm from 'components/atomic/LV2/SelectForm';
import Button from 'components/atomic/LV1/Button';
import { selectOptionPrefectures } from 'helpers/prefectures';
import { selectOptionPurpose } from 'helpers/purposes';

const Row = styled.div`
  &:not(:first-child) {
    margin: 34px 0;
  }
`;

type PropTypes = {
  onChangeImage: Function,
  image: File | string,
  imagePreview: File | string,
  onChangeName: Function,
  name: string,
  onChangeEmail: Function,
  email: string,
  onChangePrefCode: Function,
  prefCode: string,
  onChangePurpose: Function,
  purpose: string,
  onChangeProfile: Function,
  profile: string,
  onClickUpdate: Function,
  buttonDisabled: boolean,
  buttonLoading: boolean,
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
        placeholder="ニックネーム"
        onChange={e => props.onChangeName(e.target.value)}
        value={props.name}
      />
    </Row>
    <Row>
      <InputForm
        label="メールアドレス"
        placeholder="info@monooq.com"
        onChange={e => props.onChangeEmail(e.target.value)}
        value={props.email}
      />
    </Row>
    <Row>
      <InputForm
        label="電話番号"
        placeholder="09012345678"
        onChange={e => props.onChangePhoneNumber(e.target.value)}
        value={props.phoneNumber}
        type="tel"
        hint="緊急時の連絡先として利用させていただきます"
      />
    </Row>
    <Row>
      <SelectForm
        label="お住いの地域"
        options={selectOptionPrefectures('選択してください')}
        onChange={e => props.onChangePrefCode(e.target.value)}
        value={props.prefCode}
      />
    </Row>
    <Row>
      <InputForm
        label="自己紹介"
        placeholder="はじめまして！モノオクホストのYUKIです。大きめの荷物でも柔軟に対応しております、いつでもチャットでご連絡ください！"
        rows={4}
        multiline
        onChange={e => props.onChangeProfile(e.target.value)}
        value={props.profile}
      />
    </Row>
    <Row>
      <SelectForm
        label="モノオクの利用方法"
        options={selectOptionPurpose('選択してください')}
        onChange={e => props.onChangePurpose(e.target.value)}
        value={props.purpose}
      />
    </Row>
    <Button
      primary
      fill={1}
      disabled={props.buttonDisabled}
      onClick={props.buttonLoading ? null : props.onClickUpdate}
      loading={props.buttonLoading}
    >
      プロフィールを更新する
    </Button>
  </Fragment>
);
