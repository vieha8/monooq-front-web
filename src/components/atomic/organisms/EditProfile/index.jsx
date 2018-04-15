// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import RegsiterProfileImage from 'components/atomic/atoms/DragAndDrop/RegisterProfileImage';
import InputForm from 'components/atomic/molecules/InputForm';
import SelectForm from 'components/atomic/molecules/SelectForm';
import Button from 'components/atomic/atoms/Button';
import { selectOptionPrefectures } from 'helpers/prefectures';
import { Dimens } from 'variables';

const Row = styled.div`
  &:not(:first-child) {
    margin: ${Dimens.large}px 0;
  }
`;

type PropTypes = {
  onChangeImage: Function,
  image: string,
  onChangeName: Function,
  name: string,
  onChangeEmail: Function,
  email: string,
  onChangePrefCode: Function,
  prefCode: string,
  onChangeProfile: Function,
  profile: string,
  loading: boolean,
  onClickUpdate: Function,
};

export default (props: PropTypes) => (
  <Fragment>
    <Row>
      <InputForm
        label="プロフィール写真"
        extension={
          <RegsiterProfileImage onDrop={data => props.onChangeImage(data[0])} image={props.image} />
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
      <SelectForm
        label="お住いの地域"
        options={selectOptionPrefectures('選択してください')}
        onChange={e => props.onChangePrefCode(e.value)}
        value={props.prefCode}
      />
    </Row>
    <Row>
      <InputForm
        label="あなたの紹介文"
        hint="ユーザー・ホストが安心するようにあなたの紹介文を掲載しましょう！"
        placeholder="はじめまして！モノオクホストのYUKIです。大きめの荷物でも柔軟に対応しております、いつでもチャットでご連絡ください！"
        rows={4}
        multiline
        onChange={e => props.onChangeProfile(e.target.value)}
        value={props.profile}
      />
    </Row>
    <Button
      primary
      fill
      onClick={props.loading ? null : props.onClickUpdate}
      loading={props.loading}
    >
      プロフィールを更新する
    </Button>
  </Fragment>
);
