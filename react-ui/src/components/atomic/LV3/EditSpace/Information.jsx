// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import SpaceImagePicker from 'components/atomic/LV2/SpaceImagePicker';
import Button from 'components/atomic/LV1/Button';
import InlineText from 'components/atomic/LV1/InlineText';
import InputForm from 'components/atomic/LV2/InputForm';
import EntryButtons from 'components/atomic/LV2/EntryButtons';
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
  edit: boolean,
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
  address: string,
  addressErrors: Array<string>,
  onChangeAddress: Function,
  onClickNext: Function,
  OnClickRemove: Function,
  changeOrientation: Function,
  isImageUploading: boolean,
};

function displayErrors(key: string, errors: Array<string>) {
  return (
    Array.isArray(errors) &&
    errors.map((e, i) => (
      <div key={`${key}_${i}`.toString()}>
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
        hintbottom="取引が成立するまで番地以降の住所は表示されません。番地は半角数字で入力してください。"
        placeholder="例）東京都杉並区高円寺南2-48-12"
        value={props.address}
        onChange={e => props.onChangeAddress(e.target.value)}
      />
      {displayErrors('address_errors', props.addressErrors)}
    </Section>
    <Section>
      <SelectForm
        label="スペースの種類"
        options={[
          {
            value: 3,
            text: '部屋',
          },
          {
            value: 1,
            text: 'クローゼット・押入れ',
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
        placeholder="高円寺駅から徒歩５分！"
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
        isImageUploading={props.isImageUploading}
      />
      {displayErrors('image_errors', props.imageErrors)}
    </Section>
    <Section>
      <InputForm
        label="スペースの紹介文"
        placeholder="家具も入れられるワンルームが余っています。数ヶ月の長期間でも可能です！
朝〜夕方までなら荷物の出し入れにも対応できることもあります。"
        multiline
        rows={5}
        value={props.introduction}
        onChange={e => props.onChangeIntroduction(e.target.value)}
      />
      {displayErrors('introduction_errors', props.introductionErrors)}
    </Section>
    <Section>
      {props.edit ? (
        <EntryButtons
          enabled
          rerative
          remove
          backButton={{
            text: 'このスペースを削除する',
            modalTitle: 'スペース削除',
            modalText: '登録済みのスペースを削除します。よろしいですか？',
            onClick: props.OnClickRemove,
          }}
          enabledButton={{
            text: '次へ',
            onClick: props.onClickNext,
          }}
        />
      ) : (
        <ButtonWrap>
          <Button primary fontbold fill={1} onClick={props.onClickNext}>
            次へ
          </Button>
        </ButtonWrap>
      )}
    </Section>
  </div>
);
