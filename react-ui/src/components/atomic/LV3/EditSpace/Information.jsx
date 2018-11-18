// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import SpaceImagePicker from 'components/atomic/LV2/SpaceImagePicker';
import Button from 'components/atomic/LV1/Button';
import InlineText from 'components/atomic/LV1/InlineText';
import InputForm from 'components/atomic/LV2/InputForm';
import SelectForm from 'components/atomic/LV2/SelectForm';
import { Colors } from 'variables';
import { Section } from './Shared';

const ButtonWrap = styled.div`
  max-width: 240px;
  margin: auto;
  ${media.phone`
    max-width: 100%;
  `};
`;

type PropTypes = {
  images: Array<{ url: string }>,
  onChangeImage: Function,
  onClickDeleteImage: Function,
  title: string,
  titleErrors: Array<string>,
  onChangeTitle: Function,
  type: number,
  typeErrors: Array<string>,
  onChangeType: Function,
  introduction: string,
  introductionErrors: Array<string>,
  onChangeIntroduction: Function,
  AddressState: string,
  AddressCity: string,
  AddressStreet: string,
  addressErrors: Array<string>,
  onChangeAddressState: Function,
  onChangeAddressCity: Function,
  onChangeAddressStreet: Function,
  onClickNext: Function,
  changeOrientation: Function,
};

function displayErrors(key: string, errors: Array<string>) {
  return (
    Array.isArray(errors) &&
    errors.map((e, i) => (
      <div key={`${key}_${i}`}>
        <InlineText.Small color={Colors.error}>{e}</InlineText.Small>
      </div>
    ))
  );
}

export default (props: PropTypes) => (
  <div>
    <Section>
      <InputForm
        label="所在地"
        placeholder="都道府県"
        value={props.AddressState}
        onChange={e => props.onChangeAddressState(e.target.value)}
      />
      <InputForm
        placeholder="市区町村"
        value={props.AddressCity}
        onChange={e => props.onChangeAddressCity(e.target.value)}
        margintop={10}
      />
      <InputForm
        hintbottom="8文字以上の半角英数字で入力してください"
        placeholder="番地"
        value={props.AddressStreet}
        onChange={e => props.onChangeAddressStreet(e.target.value)}
        margintop={10}
      />
      {displayErrors('address_errors', props.addressErrors)}
    </Section>
    <Section>
      <SelectForm
        label="スペースの種類は？"
        options={[
          {
            value: 0,
            text: '選択してください',
          },
          {
            value: 1,
            text: 'クローゼット',
          },
          {
            value: 2,
            text: '押入れ',
          },
          {
            value: 3,
            text: '部屋',
          },
          {
            value: 4,
            text: '屋外倉庫',
          },
          {
            value: 5,
            text: 'その他',
          },
        ]}
        value={props.type}
        onChange={e => props.onChangeType(e.target.value)}
      />
      {displayErrors('type_errors', props.typeErrors)}
    </Section>
    <Section>
      <InputForm
        label="特徴がわかるタイトル"
        hintbottom="全角40文字まで"
        placeholder="家具も入れられるワンルームが余っています。数ヶ月の長期間でも可能です！"
        value={props.title}
        onChange={e => props.onChangeTitle(e.target.value)}
      />
      {displayErrors('title_errors', props.titleErrors)}
    </Section>
    <Section>
      <SpaceImagePicker
        images={props.images}
        onChangeImage={props.onChangeImage}
        onClickDeleteImage={props.onClickDeleteImage}
        changeOrientation={props.changeOrientation}
      />
    </Section>
    <Section>
      <InputForm
        label="スペースの紹介文"
        placeholder="家具も入れられるワンルームが余っています。数ヶ月の長期間でも可能です！"
        multiline
        rows={4}
        value={props.introduction}
        onChange={e => props.onChangeIntroduction(e.target.value)}
      />
      {displayErrors('introduction_errors', props.introductionErrors)}
    </Section>
    <Section>
      <ButtonWrap>
        <Button primary fontbold fill={1} height={40} onClick={props.onClickNext}>
          次へ
        </Button>
      </ButtonWrap>
    </Section>
  </div>
);
